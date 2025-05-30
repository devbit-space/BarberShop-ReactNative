import styled from "styled-components/native";
import { Image, Pressable, StyleSheet } from "react-native";
import { useI18n } from "react-simple-i18n";

import { logoutIcon } from "../../../assets/image";
import { TextH6 } from "../../../components/typography";
import { h, w } from "../../../theme/services";
import { useGlobalContext } from "../../../provider";

interface LogoutButtonProps {
	onPress: () => void
}

const LogoutButton = ({ onPress }: LogoutButtonProps) => {
	const [state] = useGlobalContext()
	const {t} = useI18n()

	return (
		<LogoutButtonWrapper lang={state.lang} onPress={onPress}>
			<Image style={logoutStyles.logoutIcon} source={logoutIcon} />
			<LogoutTitle>{t('login.logout')}</LogoutTitle>
		</LogoutButtonWrapper>
	)
}

const LogoutButtonWrapper = styled(Pressable)<{lang: string}>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	gap: w(2),
	paddingTop: h(4),
}))

const LogoutTitle = styled(TextH6)(({ theme }) => ({
	fontWeight: 500,
	color: theme.typographySixthColor,
}))

const logoutStyles = StyleSheet.create({
	logoutIcon: {
		height: w(6),
		width: w(6),
	},
})

export { LogoutButton };