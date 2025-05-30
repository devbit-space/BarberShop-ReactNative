import { useState, useEffect } from 'react';
import { Alert, Button, Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';


import styled from "styled-components/native";
import { TextH6 } from "../../../components/typography";
import { cancelWhiteIcon, leftWhiteIcon, pauseWhiteIcon, playIcon } from "../../../assets/image";
import { restApi } from '../../../provider/restApi';
import { AnimatedWave } from '../common/animate-wave';

interface VoiceRecoderProps {
	closeModal: () => void
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecoder = ({ closeModal }: VoiceRecoderProps) => {
	const [recording, setRecording] = useState<boolean>(false);
	const [recordTime, setRecordTime] = useState<string>('00:00:00');
	const [recordedFilePath, setRecordedFilePath] = useState<string>('');
	const [transcription, setTranscription] = useState('');

	// const [isPlaying, setIsPlaying] = useState<boolean>(false);
	// const [playTime, setPlayTime] = useState<string>('00:00:00');
	// const [duration, setDuration] = useState<string>('00:00:00');

	useEffect(() => {
		audioRecorderPlayer.addRecordBackListener(({ currentPosition }: any) => {
			const time = audioRecorderPlayer.mmssss(Math.floor(currentPosition));
			setRecordTime(time);
			return;
		})

		// audioRecorderPlayer.addPlayBackListener((e) => {
		// 	setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
		// 	setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
		// 	return;
		// })

		return () => {
			audioRecorderPlayer.removeRecordBackListener();
			// audioRecorderPlayer.removePlayBackListener();
		}
	}, [])

	const requestPermission = async () => {
		if (Platform.OS === 'android') {
			const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
			return result === RESULTS.GRANTED;
		} else {
			const result = await request(PERMISSIONS.IOS.MICROPHONE);
			return result === RESULTS.GRANTED;
		}
	};

	const onStartRecord = async () => {
		const hasPermission = await requestPermission();
		if (!hasPermission) {
			Alert.alert('Permission required', 'Please grant microphone permission to record audio');
			return;
		}
		setRecording(true);
		const result = await audioRecorderPlayer.startRecorder();
		setRecordedFilePath(result);
		console.log("start_result::", result);
	};

	const onStopRecord = async () => {
		const result = await audioRecorderPlayer.stopRecorder();
		audioRecorderPlayer.removeRecordBackListener();
		setRecording(false);
		setRecordTime('00:00:00');
		console.log("stop_result::", result);
		transcribeAudio(result);
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
			setTranscription(result.text);

			console.log("************", result.text);
		} catch (err: any) {
			console.log("transcribeAudio::", err.message);
		}
	}

	// const onStartPlay = async () => {
	// 	console.log('onStartPlay');
	// 	setIsPlaying(true);
	// 	const msg = await audioRecorderPlayer.startPlayer(recordedFilePath);
	// 	console.log(msg);
	// 	audioRecorderPlayer.setVolume(1.0);
	// };

	// const onPausePlay = async () => {
	// 	await audioRecorderPlayer.pausePlayer();
	// };

	// const onStopPlay = async () => {
	// 	console.log('onStopPlay');
	// 	setIsPlaying(false);
	// 	await audioRecorderPlayer.stopPlayer();
	// 	audioRecorderPlayer.removePlayBackListener();
	// };

	return (
		<VoiceRecorderWrapper>
			<View style={styles.voiceRecorderBody}>
				<MainScreenBodyBackground />
			</View>

			<AnimatedWave isPlaying={true} />

			{/* <View style={styles.voiceRecorderStatus}>
				<TextH6>You can start talking</TextH6>
			</View> */}

			<View>
				<TextH6>{recordTime}</TextH6>

				<Button title={recording ? "Stop Recording" : "Start Recording"}
					onPress={recording ? onStopRecord : onStartRecord}
				/>

				<TextH6>{transcription}</TextH6>

				{/* {recordedFilePath && (
					<View>
						<TextH6>{`${playTime} / ${duration}`}</TextH6>

						<Button title={isPlaying ? "Pause Playback" : "Start Playback"}
							onPress={isPlaying ? onPausePlay : onStartPlay}
						/>

						<Button title="Stop Playback" onPress={onStopPlay} />
					</View>
				)} */}
			</View>

			<VoiceRecordController>
				<FirstButton onPress={closeModal}>
					<Image style={{ height: 18 }} source={pauseWhiteIcon} />
				</FirstButton>

				{/* <TouchableOpacity onPress={closeModal}>
						<Image style={{ height: 45, width: 45 }} source={playIcon} />
					</TouchableOpacity> */}

				<SecondButton onPress={closeModal} >
					<Image style={{ height: 30 }} source={cancelWhiteIcon} />
				</SecondButton>

				<FirstButton onPress={closeModal}>
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

	},

	voiceRecorderStatus: {
		minHeight: "5%",
	},
})

export { VoiceRecoder };