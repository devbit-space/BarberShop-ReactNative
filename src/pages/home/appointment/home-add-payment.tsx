import React from "react";
import styled from "styled-components/native";
import { View, Image, StyleSheet, Text, Pressable, TouchableOpacity, SafeAreaView } from "react-native";
import { useI18n } from "react-simple-i18n";

import { routerConfig } from "../../../routerConfig";

import { h, w } from "../../../theme/services";
import { useGlobalContext } from "../../../provider";
import { restApi, } from "../../../provider/restApi";
import { UserHeader } from "../common/header";
import Input from "../../../components/input";
import { apiNotification } from "../../../services";
import { TextH2, TextH6 } from "../../../components/typography";
import { isIOS } from '../../../services';
import { IMAGE } from "../../../assets/image";


interface HomeAddPaymentProps {
	name: string
	cardNumber: string
	expDate: string
	cvv: string
}
const NativeButton = !isIOS ? Pressable : TouchableOpacity;

const HomeAddPayment = ({ navigation }: { navigation: any }) => {
	const { t } = useI18n();
	const [state] = useGlobalContext()

	const [status, setStatus] = React.useState({
		name: "",
		cardNumber: "",
		expDate: "",
		cvv: "",
	} as HomeAddPaymentProps)

	React.useEffect(() => {
		const getProfile = async () => {
			try {
				const res = await restApi.postRequest("getProfile", state.authToken);
				setStatus(res.data)
			} catch (error) {
				apiNotification(error, "getProfile Failed")
			}
		}
		getProfile()
	}, [])

	const goToUserMenu = () => {
		navigation.navigate(routerConfig.userMenuPage.name);
	}

	const onChangeText = (key: string, value: string | boolean) => {
		setStatus(prev => ({ ...prev, [key]: value }));
	}

	const onChangeCardNumber = (value: string) => {
		const cleaned = value.replace(/\D/g, '');
		let i = 0;
		while (i <= 16) {
			const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
			setStatus(prev => ({ ...prev, cardNumber: formatted.trim() }));
			i++;
		}
		return
	}

	const onAddCard = async () => {
		try {
			navigation.navigate(routerConfig.orderDetailPage.name);
		} catch (error) {
			apiNotification(error, "updateProfile Failed")
		}
	}

	return (
		<HomeAddPaymentWrapper>
			<UserHeader title={t('addPayment.addACard')} onPress={goToUserMenu} />
			<Form>
				<Input
					title={t('addPayment.nameOnCard')}
					placeholder={t('addPayment.nameOnCardPlaceholder')}
					value={status.name}
					onChangeText={(e: any) => onChangeText('phoneNumber', e)}
				/>
				<Input
					prevIcon={IMAGE.credit}
					title={t('addPayment.cardNumber')}
					placeholder={t('addPayment.cardNumberPlaceholder')}
					value={status.cardNumber}
					onChangeText={(e: any) => onChangeCardNumber(e)}
				/>
				<StyledView>
					<View style={{ width: "47%" }}>
						<Input
							title={t('addPayment.expData')}
							placeholder={t('addPayment.expDataPlaceholder')}
							value={status.expDate}
							onChangeText={(e: any) => onChangeText('email', e)}
						/>
					</View>
					<View style={{ width: "47%" }}>
						<Input
							title={t('addPayment.cvv')}
							placeholder={t('addPayment.cvvPlaceholder')}
							value={status.cvv}
							onChangeText={(e: any) => onChangeText('email', e)}
						/>
					</View>
				</StyledView>
				<AddButton
					// loading={status.isLoading}
					onPress={onAddCard}
				>
					<TextH2>{t('addPayment.addCard')}</TextH2>
				</AddButton>
			</Form>
		</HomeAddPaymentWrapper>
	)
}

const HomeAddPaymentWrapper = styled(View)(({ theme }) => ({
	gap: 8,
	paddingLeft: w(5),
	paddingRight: w(5),
	display: "flex",
	flexDirection: "column",
	height: "100%",
	backgroundColor: '#EEECEA'
}));

const StyledView = styled(View)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between"
}));

const AddButton = styled(NativeButton)(({ theme }) => ({
	color: "#8F90A6",
	borderRadius: w(100),
	padding: h(1),
	marginTop: h(40),
	backgroundColor: "#F2F2F5",
	borderWidth: 1.1,
	borderColor: "#F2F2F5",
	alignItems: 'center',
}));

const Form = styled(View)(({ theme }) => ({
	display: "flex",
	gap: h(1.2),
	marginBottom: h(2)
}));

export { HomeAddPayment };