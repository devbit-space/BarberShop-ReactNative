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

interface CancelBookingModalProps {
	navigation: any
	isVisible: boolean
	onClose: () => void
}

const CancelBookingModal = ({ isVisible, navigation, onClose }: CancelBookingModalProps) => {
	const [state, { dispatch }]: GlobalContextType = useGlobalContext();

	const { t } = useI18n()

	const onCancelBooking = () => {
		// navigation.navigate("login");
	}

	return (
		<BaseModal visible={isVisible} onClose={onClose}>
			<CancelBookingModalWrapper>
				<View style={CancelBookingStyles.headerWrapper}>
					<ModalHeader lang={state.lang}>
						<TextH4 style={CancelBookingStyles.headerTitle}>{t('appointments.cancelModalTitle')}</TextH4>

						<Pressable onPress={onClose}>
							<Image style={CancelBookingStyles.closeIcon} source={closeIcon} />
						</Pressable>
					</ModalHeader>

					<CancelBookingDescription>{t('appointments.cancelModalDesc')}</CancelBookingDescription>
				</View>

				<ButtonGroup lang={state.lang}>
				<CanCelButton onPress={onClose}>
					<TextH6 style={CancelBookingStyles.buttonTitle}>{t('appointments.close')}</TextH6>
				</CanCelButton>

				<CancelBookingButton onPress={onClose}>
					<CancelBookingTitle style={CancelBookingStyles.buttonTitle}>{t('appointments.cancel')}</CancelBookingTitle>
				</CancelBookingButton>
			</ButtonGroup>
		</CancelBookingModalWrapper>
		</BaseModal >
	)
}

const CancelBookingModalWrapper = styled(View)(({ theme }) => ({
	gap: h(3.5),
	display: "flex",
	flexDirection: "column",
	padding: `20px ${theme.globalSpacingX}px`,
}))

const CancelBookingDescription = styled(TextH6)(({ theme }) => ({
	color: theme.typographyFourthColor,
	fontSize: w(4.5)
}))

const ModalHeader = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	justifyContent: "space-between",
}))

const CanCelButton = styled(BaseButton)(({ theme }) => ({
	flex: 1,
	background: theme.white,
}))

const ButtonGroup = styled(View)<{lang: string}>(({ theme, lang }) => ({
	gap: 15,
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexDirection: lang === "en" ? "row" : "row-reverse",
}))
const CancelBookingButton = styled(BaseButton)(({ theme }) => ({
	flex: 1,
	background: theme.secondButtonBackground,
}))

const CancelBookingTitle = styled(TextH6)(({ theme }) => ({
	color: theme.white,
	fontSize: w(4.5)
}))

const CancelBookingStyles = StyleSheet.create({
	headerTitle: {
		fontWeight: 700,
	},
	headerWrapper: {
		gap: 5,
		display: "flex",
		flexDirection: "column",
	},
	headerTop: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	closeIcon: {
		height: 18,
		width: 18,
	},
	footerContainer: {
		gap: 15,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	buttonTitle: {
		fontWeight: 700,
		fontSize: w(4.5)
	}
})

export { CancelBookingModal };