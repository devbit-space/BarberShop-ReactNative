import React from "react";
import moment from "moment";
import styled from "styled-components/native";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Pressable, Dimensions } from "react-native";
import Video, { VideoRef } from 'react-native-video';
import { useI18n } from "react-simple-i18n";
import Sound from 'react-native-sound';

import { h, w } from "../../theme/services";
import { TextH6 } from "../../components/typography";
import { MainScreenHeader } from "./layout/header";
import { MainScreenFooter } from "./layout/footer";
import { apiNotification } from "../../services";
import { restApi } from "../../provider/restApi";
import { useGlobalContext } from "../../provider";

import assistVideoUrl from "../../assets/image/video/1722960641769.mp4";
import avatarVideoUrl from "../../assets/image/video/avatar.mp4";
import { assistAvatarImg, botAvatarImg, muteVolumeIcon, playVolumeIcon } from "../../assets/image";
import { Loading } from "../../components/loading";

interface MainScreenProps {
	navigation: any
}

interface ChatHistoryObject {
	role: string
	content: string
	image: string
	audioUrl?: string
	time?: Date
}

let globalChatHistory: ChatHistoryObject[] = [];

const MainScreen = ({ navigation }: MainScreenProps) => {
	const { t } = useI18n();
	const [state]: GlobalContextType = useGlobalContext();
	const [chatHistories, setChatHistories] = useState<ChatHistoryObject[]>([]);
	const { width, height } = Dimensions.get('window');
	const scrollViewRef = useRef<any>(null);
	const videoRef = useRef<VideoRef>(null);
	const [audioUrl, setAudioUrl] = useState("");
	const [sound, setSound] = useState<Sound | null>(null);

	const [audioPlaying, setAudioPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [ismutted, setIsMutted] = useState(false);

	useEffect(() => {
		globalChatHistory = chatHistories;
	}, [chatHistories])

	useEffect(() => {
		if (state.authToken) {
			setTimeout(() => {
				getInitHistorys();
			}, 100);
		}
	}, [])

	const getInitHistorys = async () => {
		try {
			let histories = await restApi.getChatHistories(state.authToken);
			setChatHistories(histories);
			scrollToEnd();
		} catch (err: any) {
			console.log(err.message)
		}
	}

	useEffect(() => {
		if (ismutted) return;

		console.log(audioUrl)
		const audio = new Sound(audioUrl, Sound.MAIN_BUNDLE, (error) => {
			if (error) return;

			setSound(audio);
			setAudioPlaying(true);
			videoRef.current?.seek(0);

			audio.play((success) => {
				setAudioPlaying(false);
				videoRef.current?.seek(0);

				if (success) {
					console.log('Successfully finished playing')
				} else {
					console.log('Playback failed due to audio decoding errors')
				}
			})
		})

		return () => { if (sound) sound.release() }
	}, [audioUrl])

	const onSendContent = async (content: string, image: any) => {
		try {
			if (!content) return;
			const newUserHistory = { role: "user", content: content, image: image, };
			setChatHistories([...globalChatHistory, newUserHistory]);
			scrollToEnd();

			const fileType = "image/png";
			const formData = new FormData();
			formData.append('lang', state.lang);
			formData.append('content', content);

			if (!!image) {
				formData.append('image', { uri: image, name: "image.png", type: fileType })
			}

			stopAudio();
			setIsLoading(true);
			const result: ChatHistoryObject = await restApi.sendContent(formData);
			const newServiceHistory = { role: result.role, content: result.content, image: result.image, time: result.time };

			if (result.audioUrl) {
				setAudioUrl(result.audioUrl);
				console.log("videoUrl::", result.audioUrl);
			}
			setIsLoading(false);

			setChatHistories([...globalChatHistory, newServiceHistory]);
			scrollToEnd();

		} catch (err: any) {
			setIsLoading(false);
			apiNotification(err, "Send content failed!");
		}
	}

	// const playAudioSpeech = async (audioUrl: string) => {
	// 	try {
	// 		const whoosh = new Sound(audioUrl, Sound.MAIN_BUNDLE, (err: any) => {
	// 			if (!err) whoosh.play()
	// 		})
	// 	} catch (err: any) {
	// 		console.log("playAudioSpeech_error::", err.message)
	// 	}
	// }

	const scrollToEnd = () => {
		if (scrollViewRef.current) {
			setTimeout(() => {
				scrollViewRef.current.scrollToEnd({ animated: true });
			}, 100);
		}
	}

	const videoEnd = () => {
		try {
			videoRef.current?.seek(0);
			console.log("audioPlaying::", audioPlaying);
		} catch (err: any) {
			console.log("videoEnd::", err.message);
		}
	}

	const onDisableMute = () => {
		setIsMutted(true);
		if (audioPlaying) stopAudio();
	}

	const onEnableMute = () => {
		setIsMutted(false)
		setAudioPlaying(false);
	}

	const stopAudio = () => {
		setAudioPlaying(false);
		if (sound) sound.pause();
	}

	return (
		<MainScreenWrapper>
			<MainScreenHeader navigation={navigation} />
			<MainScreenBody>

				<MainScreenBodyBackground>
					<View style={styles.BackgroundContainer}>
						{!ismutted && (
							<Pressable style={styles.volumeImageContainer} onPress={onDisableMute}>
								<Image style={styles.volumeImage} source={playVolumeIcon} />
							</Pressable>
						)}

						{!!ismutted && (
							<Pressable style={styles.volumeImageContainer} onPress={onEnableMute}>
								<Image style={styles.volumeImage} source={muteVolumeIcon} />
							</Pressable>
						)}

						{(!ismutted && !!audioPlaying) &&
							<Video ref={videoRef}
								source={assistVideoUrl}
								style={styles.video}
								paused={!audioPlaying}
								onEnd={videoEnd}
								controls={false}
								repeat={true}
								muted={true}
							/>}

						<Video
							source={avatarVideoUrl}
							style={styles.video}
							resizeMode="cover"
							controls={false}
							repeat={true}
							paused={audioPlaying}
						/>
					</View>
				</MainScreenBodyBackground>

				<View style={{ flex: 1 }} />

				<View style={styles.chatHistoryWrapper}>
					<ScrollView style={styles.scrollView} ref={scrollViewRef}>
						<View style={styles.chatHistoryContainer}>
							<View style={state.lang !== "he" ? styles.answerItemWrapper : styles.requestItemWrapper}>
								<TextItemWrapper isUser={state.lang === "he"}>
									<TextItemContainer isUser={state.lang === "he"}>
										<CustomTextH6>{t("mainScreen.assistMessage", state.userData.firstName)}</CustomTextH6>
									</TextItemContainer>
									<Image source={botAvatarImg} style={styles.avataStyle} />

								</TextItemWrapper>
							</View>

							{chatHistories.map((chatHistory: ChatHistoryObject, key: number) => {
								const history = (chatHistory.role === "user" && state.lang === "en") || (chatHistory.role !== "user" && state.lang === "he");
								return (
									<View key={key} style={history ? styles.requestItemWrapper : styles.answerItemWrapper}>
										{chatHistory.image &&
											<View>
												<Image style={styles.image} source={{ uri: chatHistory.image }} />
											</View>
										}

										<TextItemWrapper isUser={history}>
											{!!chatHistory.content && (
												<TextItemContainer isUser={history}>
													<CustomTextH6>{chatHistory.content}</CustomTextH6>
													<CustomTextH6 style={styles.time} >{moment(chatHistory.time).format('HH.mm')}</CustomTextH6>
												</TextItemContainer>
											)}

											<Image source={(chatHistory.role === "user" && !state.userData.image) ? assistAvatarImg : (chatHistory.role === "user" && !!state.userData.image) ? { uri: state.userData.image } : botAvatarImg} style={styles.avataStyle} />
										</TextItemWrapper>
									</View>
								)
							})}
						</View>
						{isLoading && <TextItemWrapper style={{ marginTop: h(1) }} isUser={state.lang !== "he"}>
							<Image source={botAvatarImg} style={styles.avataStyle} />
							<TextItemContainer isUser={state.lang === "he"}>
								<CustomTextH6>{t('mainScreen.typing')}</CustomTextH6>
							</TextItemContainer>
						</TextItemWrapper>}
					</ScrollView>
				</View>
			</MainScreenBody>

			<MainScreenFooter onSendContent={onSendContent} />
		</MainScreenWrapper>
	)
}

const MainScreenWrapper = styled(View)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	zIndex: 99,
	backgroundColor: theme.mainBackground,
	height: "100%",
}))

const MainScreenBody = styled(View)(({ theme }) => ({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	padding: `0px ${theme.globalSpacingX}px`
}))

const MainScreenBodyBackground = styled(View)(({ theme }) => ({
	aspectRatio: "1/1",
	width: w(50),
	height: w(50),
	zIndex: 5,
	overflow: "hidden",
	position: 'absolute',
	top: h(5),
	left: w(25),
	borderRadius: 150,
	backgroundColor: theme.white,
}))

const TextItemWrapper = styled(View)<{ isUser: boolean }>(({ isUser }) => ({
	gap: 5,
	display: "flex",
	flexDirection: isUser ? "row" : "row-reverse",
	alignItems: "flex-end",
}))

const TextItemContainer = styled(View)<{ isUser?: boolean }>(({ theme, isUser }) => ({
	maxWidth: "70%",
	padding: "7px 12px",
	backgroundColor: theme.white,
	borderRadius: isUser ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
}))

const CustomTextH6 = styled(TextH6)(({ theme }) => ({
	color: theme.typographySecondColor,
	fontWeight: 400,
}))

const styles = StyleSheet.create({
	scrollView: {
		flexGrow: 1,
	},
	requestItemWrapper: {
		gap: 3,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	answerItemWrapper: {
		gap: 3,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",
	},
	chatHistoryWrapper: {
		maxHeight: "100%",
		marginBottom: h(1)
	},
	chatHistoryContainer: {
		gap: 8,
		display: "flex",
		flexDirection: "column",
	},
	BackgroundContainer: {
		width: "100%",
		height: "100%",
		position: "relative",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	image: {
		width: w(25),
		height: w(25),
		resizeMode: 'contain',
		borderRadius: (10)
	},
	time: {
		textAlign: 'right',
		fontSize: w(3)
	},
	video: {
		width: "100%",
		height: "100%",
		zIndex: 101,
	},
	volumeImageContainer: {
		position: "absolute",
		bottom: 10,
		zIndex: 102,
		backgroundColor: "white",
		padding: w(1.5),
		borderRadius: 20,
	},
	volumeImage: {
		width: w(5),
		height: w(4),
		objectFit: "fill",
	},
	avataStyle: {
		width: w(10),
		height: w(10),
		borderRadius: 100,
	}
})

export { MainScreen }