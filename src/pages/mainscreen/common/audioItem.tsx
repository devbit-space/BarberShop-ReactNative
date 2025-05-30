import styled from "styled-components/native";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { TextH6 } from "../../../components/typography";
import { playVolumeIcon, playWhiteIcon, waveFormIcon } from "../../../assets/image";

interface AudioItemProps {
	duration: string
}

const AudioItem = ({ duration }: AudioItemProps) => {
	return (
		<AudioItemWrapper>
			<AudioControllButton>
				<Image style={styles.iconStyle} source={playWhiteIcon} />
			</AudioControllButton>

			<Image style={styles.waveFormIconStyle} source={waveFormIcon} />
			<AudioDurationText>{duration}</AudioDurationText>
			<Image style={styles.volumeIconStyle} source={playVolumeIcon} />
		</AudioItemWrapper>
	)
}

const AudioItemWrapper = styled(View)(({ theme }) => ({
	gap: 10,
	display: "flex",
	flexDirection: "row",
	alignItems: "center",

	borderRadius: 50,
	padding: "10px 15px",
	backgroundColor: theme.textItemBackground
}))

const AudioControllButton = styled(Pressable)(({ theme }) => ({
	width: 30,
	height: 30,
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.thirdButtonBackground,
	borderRadius: 100,
}))

const AudioDurationText = styled(TextH6)(({ theme }) => ({
	fontWeight: 400,
	color: theme.typographySecondColor,
}))

const styles = StyleSheet.create({
	iconStyle: {
		height: 16,
	},
	waveFormIconStyle: {
		height: 30,
	},
	volumeIconStyle: {
		height: 24,
	}
})

export { AudioItem };