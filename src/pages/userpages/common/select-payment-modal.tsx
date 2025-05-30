import styled from "styled-components/native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useI18n } from "react-simple-i18n";

import { IMAGE, closeIcon, nextWhiteIcon } from "../../../assets/image";
import { BaseModal } from "../../../components/modal";
import { TextH2, TextH6 } from "../../../components/typography";
import { BaseButton } from "../../../components/button/index";
import { useGlobalContext } from "../../../provider";
import { h, w } from "../../../theme/services";
import { routerConfig } from "../../../routerConfig";

interface SelectPaymentModalProps {
	isVisible: boolean
	onClose: () => void
	data: OrderDetailObject
	navigation: any
}

const SelectPaymentModal = ({ isVisible, onClose, data, navigation }: SelectPaymentModalProps) => {
	const [state, { dispatch }]: GlobalContextType = useGlobalContext();
	const { t } = useI18n();

	const onAddPayment = () => {
		navigation.navigate(routerConfig.addPaymentPage.name);
	}

	return (
		<BaseModal visible={isVisible} onClose={onClose}>
			<SelectPaymentModalWrapper>
				<View style={SelectPaymentStyles.headerWrapper}>
					<ModalHeader lang={state.lang}>
						<Pressable onPress={onClose}>
							<Image style={SelectPaymentStyles.closeIcon} source={closeIcon} />
						</Pressable>
						<Header style={SelectPaymentStyles.headerTitle}>{t('orderDetail.selectPaymentMethod')}</Header>
					</ModalHeader>

					{data.payment.map((i, k) => (
						<Pressable key={k} onPress={onClose}>
							<CardContainer lang={state.lang}>
								<StyledImage source={IMAGE.bit} />
								<StyledText>{i}</StyledText>
							</CardContainer>
						</Pressable>
					))}

					<Pressable onPress={onAddPayment}>
						<CardContainer lang={state.lang}>
							<StyledImage style={{ width: w(5), height: w(5) }} source={IMAGE.purePlus} />
							<StyledText>{t('orderDetail.addPaymentMethod')}</StyledText>
						</CardContainer>
					</Pressable>
				</View>
			</SelectPaymentModalWrapper>
		</BaseModal>
	)
}

const SelectPaymentModalWrapper = styled(View)(({ theme }) => ({
	gap: h(3.5),
	display: "flex",
	flexDirection: "column",
	padding: h(2),
	paddingBottom: h(3)
}))


const ModalHeader = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	gap: w(3)
}))

const Header = styled(TextH6)(({ theme }) => ({
	fontSize: w(5)
}))

const StyledText = styled(TextH6)(({ theme }) => ({
	fontSize: w(4.5),
	fontWeight: 700
}))

const StyledImage = styled(Image)(({ theme }) => ({
	width: w(7),
	height: w(6),
	borderRadius: 3

}));

const CardContainer = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: 'center',
	gap: w(5)
}));

const SelectPaymentStyles = StyleSheet.create({
	headerTitle: {
		fontWeight: 700,
	},
	headerWrapper: {
		gap: h(4),
		display: "flex",
		flexDirection: "column",
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
		fontWeight: 600
	}
})

export { SelectPaymentModal };