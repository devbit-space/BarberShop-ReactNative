import styled from "styled-components/native";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { leftIcon, rightIcon } from "../../../assets/image";
import { TextH2 } from "../../../components/typography";
import { h, w } from "../../../theme/services";
import { useGlobalContext } from "../../../provider";

interface UserHeader {
	title?: string
	onPress: () => void
	btn?: string
	onSave?: () => void
}

const UserHeader = ({ title, onPress, btn, onSave }: UserHeader) => {
	const [state] = useGlobalContext()

	return (
		<UserHeaderWrapper>
			<BackButton lang={state.lang} onPress={onPress}>
				<Image style={headerStyles.headerIcon} source={state.lang === "en" ? rightIcon : leftIcon} />
			</BackButton>

			<View style={headerStyles.headerContent}>
				<TextH2 style={headerStyles.headerTitle}>{title}</TextH2>
			</View>
			<SaveButton lang={state.lang} onPress={onSave}>
				<TextH2 style={headerStyles.btn}>{btn}</TextH2>
			</SaveButton>
		</UserHeaderWrapper>
	)
}

const UserHeaderWrapper = styled(View)(({ theme }) => ({
	position: "relative",
	display: 'flex',
	alignItems: "center",
	paddingBottom: h(2.5),
}))

const BackButton = styled(Pressable)<{ lang: string }>(({ theme, lang }) => ({
	position: "absolute",
	top: h(2.5),
	left: lang === 'en' ? w(0) : undefined, // Set left for English
    right: lang === 'he' ? w(0) : undefined // Set right for Hebrew
}))

const SaveButton = styled(Pressable)<{ lang: string }>(({ theme, lang }) => ({
	position: "absolute",
	top: h(2.5),
	left: lang !== 'en' ? w(0) : undefined, // Set left for English
    right: lang !== 'he' ? w(0) : undefined // Set right for Hebrew
}))

const headerStyles = StyleSheet.create({
	headerIcon: {
		height: w(6),
		width: w(6),
	},
	headerTitle: {
		fontWeight: 700,
		fontSize: w(4),
		textAlign: "center",
	},
	headerContent: {
		paddingTop: h(2.5),
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		color: '#8F90A6',
		fontWeight: '700',
		fontSize: w(4)
	}
})

export { UserHeader };