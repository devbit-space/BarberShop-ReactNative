import React from "react";
import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components/native";
import { Image, View, StyleSheet, Pressable, Alert } from "react-native";
import { launchCamera, launchImageLibrary, ImageLibraryOptions, MediaType, CameraOptions } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PermissionsAndroid, Platform, Keyboard } from 'react-native';
import { useI18n } from "react-simple-i18n";

import { h, w } from "../../../theme/services";
import { IMAGE, pauseIcon } from "../../../assets/image";
import { CustomTextInput } from "../../../components/input/index";
import { audioIcon, plusCircleIcon, } from "../../../assets/image";
import ChooseImageModal from "../../../components/modal/choose-image-modal";
import { restApi } from "../../../provider/restApi";
import { TextH6 } from "../../../components/typography";
import { useGlobalContext } from "../../../provider";

interface MainScreenFooterProps {
	onSendContent: (text: string, image: string) => void
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const MainScreenFooter = ({ onSendContent }: MainScreenFooterProps) => {
	const { t } = useI18n();
	const styledTheme = useTheme();
	const [state]: GlobalContextType = useGlobalContext();

	const [isModal, setIsModal] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordTime, setRecordTime] = useState("00:00:00");

	const [text, setText] = useState<string>("");
	const [image, setImage] = useState<string>("");

	useEffect(() => {
		audioRecorderPlayer.addRecordBackListener(({ currentPosition }: any) => {
			const time = audioRecorderPlayer.mmssss(Math.floor(currentPosition));
			setRecordTime(time);
			return;
		})

		return () => { audioRecorderPlayer.removeRecordBackListener() }
	}, [isRecording])

	const requestVoicePermission = async () => {
		if (Platform.OS === 'android') {
			const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
			return result === RESULTS.GRANTED;
		} else {
			const result = await request(PERMISSIONS.IOS.MICROPHONE);
			return result === RESULTS.GRANTED;
		}
	}

	const requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: 'Camera Permission',
					message: 'This app needs camera permission to take photos.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				}
			)

			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
			return false;
		}
	}

	const onGallery = async () => {
		const options: ImageLibraryOptions = {
			mediaType: 'photo' as MediaType,
			selectionLimit: 1,
			includeBase64: true
		}

		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.errorCode) {
				console.log('ImagePicker Error: ', response.errorCode);
			} else if (response.errorMessage) {
				console.log('ImagePicker Error: ', response.errorMessage);
			} else if (response.assets && response.assets.length > 0) {
				const asset = response.assets[0];
				const base64String = asset.base64 ?? '';
				setImage(`data:image/png;base64,${base64String}`);
			} else {
				console.log('No assets found');
			}
			setIsModal(false)
		})
	}

	const onCamera = async () => {
		if (Platform.OS === 'android') {
			const hasPermission = await requestCameraPermission();
			if (!hasPermission) {
				console.log('Camera permission denied');
				return;
			}
		}

		const options: CameraOptions = {
			mediaType: 'photo' as MediaType,
			includeBase64: true, // Add this to include base64 string in the response
		}

		launchCamera(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled camera picker');
			} else if (response.errorCode) {
				console.log('CameraPicker Error: ', response.errorCode);
			} else if (response.errorMessage) {
				console.log('CameraPicker Error: ', response.errorMessage);
			} else if (response.assets && response.assets.length > 0) {
				const asset = response.assets[0];
				const sourceUri = asset.uri ?? '';
				const base64String = asset.base64 ?? '';
				console.log('Captured image URI: ', sourceUri);
				console.log('Captured image base64: ', base64String);

				setImage(`data:image/jpeg;base64,${base64String}`);
			} else {
				console.log('No assets found');
			}

			setIsModal(false)
		})
	}

	// const openModal = () => {
	// 	setIsVisible(true);
	// }

	// const closeModal = () => {
	// 	setIsVisible(false);
	// }

	const onStartVoiceRecord = async () => {
		try {
			const hasPermission = await requestVoicePermission();

			if (!hasPermission) {
				Alert.alert('Permission required', 'Please grant microphone permission to record audio');
			} else {
				setIsRecording(true);
				const result = await audioRecorderPlayer.startRecorder();
				console.log("start_result::", result);
			}
		} catch (err: any) {
			console.log("onStartVoiceRecord_error::", err.message);
		}
	}

	const onStopVoiceRecord = async () => {
		const result = await audioRecorderPlayer.stopRecorder();
		audioRecorderPlayer.removeRecordBackListener();
		console.log("stop_result::", result);

		setIsRecording(false);
		transcribeAudio(result);
		setRecordTime('00:00:00');
	}

	const transcribeAudio = async (filePath: string) => {
		try {
			// dispatch({ type: "loading", payload: true });
			const startTime = +new Date();
			const fileName = filePath.split('/').pop();
			const fileType = 'application/octet-stream';
			const formData = new FormData();
			formData.append('lang', state.lang);

			formData.append('audioFile', {
				uri: filePath,
				name: fileName,
				type: fileType,
			})
			console.log("getChatStartTime", `${((+new Date() - startTime) / 1000).toString()}s` )
			const result = await restApi.speechToText(formData);
			// dispatch({ type: "loading", payload: false });
			console.log("voiceText::", result.text);
			setText(result.text);
		} catch (err: any) {
			console.log("transcribeAudio::", err.message);
			// dispatch({ type: "loading", payload: false });
		}
	}

	const sendMessage = () => {
		Keyboard.dismiss();
		onSendContent(text, image);
		setImage("");
		setText("");
	}

	return (
		<View style={[styles.wrapper, { height: !!image ? h(20) : h(6), paddingTop: !!image ? h(2) : h(0) }]}>
			{!!image && (
				<View style={styles.imageWrapper}>
					{!!image && (
						<View style={{ width: w(20), height: w(20), position: 'relative' }}>
							<Image source={{ uri: image }} style={{ width: w(20), height: w(20), resizeMode: 'contain' }} />

							<Pressable onPress={() => setImage("")}
								style={{ position: 'absolute', right: w(-1.5), top: w(-1.5), backgroundColor: styledTheme.borderColor, padding: w(2), borderRadius: w(100), }}
							>
								<Image style={{ width: w(2), height: w(2) }} source={IMAGE.cancel} />
							</Pressable>
						</View>
					)}
					<View style={[styles.border, { backgroundColor: styledTheme.borderColor }]}></View>
				</View>
			)}

			<MainScreenFooterContainer lang={state.lang}>
				{!isRecording && (
					<CustomTextInput value={text} placeholder={t("mainScreen.inputPlaceHolder")}
						placeholderTextColor={styledTheme.textInputPlaceholderColor}
						onChangeText={setText}
						lang={state.lang}
					/>
				)}

				{(!!isRecording && !text) && (
					<VoiceRecorderText>{recordTime}</VoiceRecorderText>
				)}

				{!!text && (
					<Pressable onPress={sendMessage}>
						<Image style={[styles.iconStyle, { width: w(4.5) }]} source={IMAGE.send} />
					</Pressable>
				)}

				{(!isRecording && !text) && (
					<Pressable onPress={onStartVoiceRecord}>
						<Image style={[styles.iconStyle, { width: w(4.5) }]} source={audioIcon} />
					</Pressable>
				)}

				{(!!isRecording && !text) && (
					<Pressable onPress={onStopVoiceRecord}>
						<Image style={[styles.iconStyle, { width: w(5) }]} source={pauseIcon} />
					</Pressable>
				)}

				<Pressable onPress={() => setIsModal(true)}>
					<Image style={[styles.iconStyle, { width: w(5) }]} source={plusCircleIcon} />
				</Pressable>
			</MainScreenFooterContainer>

			{/* <TransparentModal visible={isVisible}>
				<VoiceRecoder closeModal={closeModal} sendMessage={setText} />
			</TransparentModal> */}

			<ChooseImageModal isModal={isModal} setIsModal={setIsModal} onCamera={onCamera} onGallery={onGallery} />
		</View>
	)
}

const MainScreenFooterContainer = styled(View)<{ lang: string }>(({ lang }) => ({
	gap: w(2.5),
	width: "100%",
	display: "flex",
	flexDirection: lang !== "he" ? "row" : "row-reverse",
	alignItems: "center",
}))

const VoiceRecorderText = styled(TextH6)(({ theme }) => ({
	flex: 1,
	fontSize: w(4),
	textAlign: "center",
	color: theme.typographyFirstColor,
}))

const styles = StyleSheet.create({
	iconStyle: {
		height: w(5),
		objectFit: "fill",
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",

		margin: w(4),
		marginBottom: h(5),
		backgroundColor: 'white',
		borderRadius: 20,
		paddingHorizontal: w(5),
		// shadowColor: '#000',
		// shadowOffset: {
		// 	width: 0,
		// 	height: h(4),
		// },
		// shadowRadius: 4,
		// elevation: 9,
		borderColor: "gray",
	},
	imageWrapper: {
		flex: 1,
		position: 'relative'
	},
	border: {
		position: 'absolute',
		bottom: -1, // Adjust according to your layout
		// transform: [{ translateX: -10 }], // Adjust according to your layout
		width: "100%", // Adjust according to your layout
		height: 1, // Adjust according to your layout
		borderRadius: 10, // Adjust according to your layout
	},
})

export { MainScreenFooter };