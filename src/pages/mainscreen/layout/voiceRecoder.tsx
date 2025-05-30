import { useState, useEffect } from 'react';
import { Alert, Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import styled from "styled-components/native";
import { TextH6 } from "../../../components/typography";
import { cancelWhiteIcon, leftWhiteIcon, pauseWhiteIcon, playIcon } from "../../../assets/image";
import { restApi } from '../../../provider/restApi';
import { AnimatedWave } from '../common/animate-wave';

interface VoiceRecoderProps {
	closeModal: () => void
	sendMessage: (text: string) => void
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecoder = ({ sendMessage, closeModal }: VoiceRecoderProps) => {
	const [isRecording, setIsRecording] = useState(false);
	const [recordTime, setRecordTime] = useState("00:00:00");
	const [voiceText, setVoiceText] = useState("");

	useEffect(() => {
		audioRecorderPlayer.addRecordBackListener(({ currentPosition }: any) => {
			const time = audioRecorderPlayer.mmssss(Math.floor(currentPosition));
			setRecordTime(time);
			return;
		})

		return () => { audioRecorderPlayer.removeRecordBackListener() }
	}, [isRecording])

	const requestPermission = async () => {
		if (Platform.OS === 'android') {
			const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
			return result === RESULTS.GRANTED;
		} else {
			const result = await request(PERMISSIONS.IOS.MICROPHONE);
			return result === RESULTS.GRANTED;
		}
	}

	const onStartRecord = async () => {
		const hasPermission = await requestPermission();

		if (!hasPermission) {
			Alert.alert('Permission required', 'Please grant microphone permission to record audio');
		} else {
			setIsRecording(true);
			const result = await audioRecorderPlayer.startRecorder();
			console.log("start_result::", result);
		}
	}

	const onStopRecord = async () => {
		const result = await audioRecorderPlayer.stopRecorder();
		audioRecorderPlayer.removeRecordBackListener();
		console.log("stop_result::", result);

		setIsRecording(false);
		transcribeAudio(result);
		setRecordTime('00:00:00');
	}

	const transcribeAudio = async (filePath: string) => {
		try {
			const fileName = filePath.split('/').pop();
			const fileType = 'application/octet-stream';
			const formData = new FormData();

			formData.append('audioFile', {
				uri: filePath,
				name: fileName,
				type: fileType,
			})

			const result = await restApi.speechToText(formData);
			console.log("voiceText::", result.text);
			setVoiceText(result.text);
		} catch (err: any) {
			console.log("transcribeAudio::", err.message);
		}
	}

	const onCancelVoiceText = () => {
		setRecordTime("00:00:00");
		setIsRecording(false);
		setVoiceText("");
		closeModal();
	}

	const onSendMessage = () => {
		if (!!voiceText) {
			sendMessage(voiceText);
		}

		onCancelVoiceText();
	}

	return (
		<VoiceRecorderWrapper>
			<View style={styles.voiceRecorderBody}>
				<MainScreenBodyBackground />
			</View>

			<AnimatedWave isPlaying={isRecording} />

			<View style={styles.voiceRecorderStatus}>
				<TextH6>{recordTime}</TextH6>
				<TextH6>{!isRecording ? "You can start talking" : "Wait for AI Response"}</TextH6>
			</View>

			<View style={styles.voiceTextResults}>
				{!!voiceText && (
					<TextH6>{voiceText}</TextH6>
				)}
			</View>

			<VoiceRecordController>
				{!isRecording && (
					<TouchableOpacity onPress={onStartRecord}>
						<Image style={{ height: 45, width: 45 }} source={playIcon} />
					</TouchableOpacity>
				)}

				{!!isRecording && (
					<FirstButton onPress={onStopRecord}>
						<Image style={{ height: 18 }} source={pauseWhiteIcon} />
					</FirstButton>
				)}

				<SecondButton onPress={onCancelVoiceText} >
					<Image style={{ height: 30 }} source={cancelWhiteIcon} />
				</SecondButton>

				<FirstButton onPress={onSendMessage}>
					<Image style={{ width: 20 }} source={leftWhiteIcon} />
				</FirstButton>
			</VoiceRecordController>
		</VoiceRecorderWrapper>
	)
}

const VoiceRecorderWrapper = styled(View)(({ theme }) => ({
	bottom: 0,
	width: "100%",
	height: "100%",
	position: "absolute",
	backgroundColor: theme.white,
	padding: `15px ${theme.globalSpacingX}px`,

	gap: 20,
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "space-between",
}))

const MainScreenBodyBackground = styled(View)(({ theme }) => ({
	width: "55%",
	aspectRatio: "1/1",
	borderRadius: 150,
	backgroundColor: theme.textItemBackground,
}))

const VoiceRecordController = styled(View)(({ theme }) => ({
	gap: 15,
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-evenly",

	width: "100%",
	minHeight: "30%",
}))

const FirstButton = styled(TouchableOpacity)(({ theme }) => ({
	width: 45,
	height: 45,
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.firstButtonBackground,
	borderRadius: 100,
}))

const SecondButton = styled(TouchableOpacity)(({ theme }) => ({
	width: 80,
	height: 80,
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.secondButtonBackground,
	borderRadius: 100,
}))

const styles = StyleSheet.create({
	voiceRecorderBody: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 80,
		paddingTop: 80,
	},
	voiceRecorderStatus: {
		gap: 5,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	voiceTextResults: {
		flex: 1,
	}
})

export { VoiceRecoder };