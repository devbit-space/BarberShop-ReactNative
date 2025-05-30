import styled from "styled-components/native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useI18n } from "react-simple-i18n";

import { closeIcon } from "../../../assets/image";
import { BaseModal } from "../../../components/modal";
import { TextH4, TextH6 } from "../../../components/typography";
import { BaseButton } from "../../../components/button/index";
import { routerConfig } from "../../../routerConfig";
import { useGlobalContext } from "../../../provider";
import { h, w } from "../../../theme/services";

interface LogoutModalProps {
	navigation: any
	isVisible: boolean
	onClose: () => void
}

const LogoutModal = ({ isVisible, navigation, onClose }: LogoutModalProps) => {
	const [_, { dispatch, setStore }]: GlobalContextType = useGlobalContext();
	const [state] = useGlobalContext()
	const { t } = useI18n()
	const onCancel = () => {
		onClose();
	}

	const onLogout = () => {
		setStore("")
		dispatch({ type: "authToken", payload: "" });
		// navigation.navigate("login");
	}

	return (
		<BaseModal visible={isVisible} onClose={onClose}>
			<LogoutModalWrapper>
				<View style={logoutStyles.headerWrapper}>
					<LogOutContainer lang={state.lang}>
						<TextH4 style={logoutStyles.headerTitle}>{t('login.logout')}?</TextH4>

						<Pressable onPress={onClose}>
							<Image style={logoutStyles.closeIcon} source={closeIcon} />
						</Pressable>
					</LogOutContainer>

					<LogoutDescription>{t('account.wantToLogout')}</LogoutDescription>
				</View>

				<ButtonGroup lang={state.lang}>
					<CanCelButton onPress={onCancel}>
						<TextH6 style={logoutStyles.buttonTitle}>{t('appointments.cancel')}</TextH6>
					</CanCelButton>

					<LogoutButton onPress={onLogout}>
						<LogoutTitle style={logoutStyles.buttonTitle}>{t('login.logout')}</LogoutTitle>
					</LogoutButton>
				</ButtonGroup>
			</LogoutModalWrapper>
		</BaseModal>
	)
}

const LogoutModalWrapper = styled(View)(({ theme }) => ({
	gap: h(3.5),
	display: "flex",
	flexDirection: "column",
	padding: `20px ${theme.globalSpacingX}px`,
}))

const LogOutContainer = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	justifyContent: "space-between",
}))

const LogoutDescription = styled(TextH6)(({ theme }) => ({
	color: theme.typographyFourthColor,
}))

const ButtonGroup = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	gap: 15,
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexDirection: lang === "en" ? "row" : "row-reverse",
}))

const CanCelButton = styled(BaseButton)(({ theme }) => ({
	flex: 1,
	background: theme.white,
}))

const LogoutButton = styled(BaseButton)(({ theme }) => ({
	flex: 1,
	background: theme.secondButtonBackground,
}))

const LogoutTitle = styled(TextH6)(({ theme }) => ({
	color: theme.white,
}))

const logoutStyles = StyleSheet.create({
	headerTitle: {
		fontWeight: 700,
	},
	headerWrapper: {
		gap: 5,
		display: "flex",
		flexDirection: "column",
	},
	closeIcon: {
		height: 18,
		width: 18,
	},
	buttonTitle: {
		fontWeight: 600
	}
})

export { LogoutModal };