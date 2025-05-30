import React from "react";
import styled from "styled-components/native";
import { Dimensions, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useI18n } from "react-simple-i18n";

import { routerConfig } from "../../../routerConfig";
import { UserHeader } from "../common/header";
import { Tab } from "../../../components/tab";
import { h, w } from "../../../theme/services";
import { BookingItem } from "../common/booking-item";
import { CancelBookingModal } from "../common/cancel-booking-modal";
import { useGlobalContext } from "../../../provider";
import { packageImg1, packageImg2, packageImg3 } from "../../../assets/image";
import { BuyingItem } from "../common/buying-item";

const { width: viewportWidth } = Dimensions.get('window');

const Appointment = ({ navigation }: { navigation: any }) => {
	const goToHome = () => {
		navigation.navigate(routerConfig.homePage.name);
	}
	const { t } = useI18n();
	const [state] = useGlobalContext();
	const [status, setStatus] = React.useState({
		serviceIdx: 0,
		isCancelBooking: false
	})
	const datas = [
        {
            title: "Haircut & Shave",
            price: "$40",
            time: "40 Mins",
            amount: 0,
            image: packageImg1
        },
        {
            title: "Haircut & Beard Grooming",
            price: "$40",
            time: "40 Mins",
            amount: 0,
            image: packageImg2
        },
        {
            title: "Haircut & Anti-Pollution Cleanup",
            price: "$40",
            time: "40 Mins",
            amount: 0,
            image: packageImg3
        },
    ]
	const serviceList = ["Recommended", "Packages", "Woman Cut", "Man Cut"]

	const onBuying = () => {
		navigation.navigate(routerConfig.homeCheckOutPage)
	}

	// const onCancelBooking = () => {
	// 	setStatus({ ...status, isCancelBooking: false })
	// }

	return (
		<AppointmentWrapper>
			<UserHeader title={t('home.appointment')} onPress={goToHome} />

			<ScrollView horizontal>
				<ServiceWrapper lang={state.lang}>
					{serviceList.map((i, k) => (
						<Pressable onPress={() => setStatus({...state, serviceIdx: k})} key={k}><Service idx={k} serviceIdx={status.serviceIdx}>{i}</Service></Pressable>
					))}
				</ServiceWrapper>

			</ScrollView>
		<ServiceTitle lang={state.lang}>Recommended (5)</ServiceTitle>
			<View style={{height: h(85)}}>
                {
                    datas.map((i, k) => (
                        <BuyingItem onBuying={onBuying} i={i} key={k} />
                    ))
                }
            </View>
			{/* <CancelBookingModal onClose={onCancelBooking} isVisible={status.isCancelBooking} navigation={navigation}></CancelBookingModal> */}
		</AppointmentWrapper>
	)
}

const AppointmentWrapper = styled(View)(({ theme }) => ({
	gap: 8,
	display: "flex",
	flexDirection: "column",
	paddingRight: w(4),
	paddingLeft: w(4),
	backgroundColor: '#EEECEA',
}));

const ServiceWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",

	alignItems: "center",
	gap: w(4),
	height: h(5)
}));

const Service = styled(Text)<{serviceIdx: number, idx: number}>(({ theme, idx, serviceIdx }) => ({
	borderWidth: 1,
	borderRadius: w(50),
	borderColor: '#D7D3CE',
	backgroundColor: idx === serviceIdx ? "#D7D3CE" : '',
	fontSize: w(3.3),
	padding: w(2),
	fontWeight: idx === serviceIdx ? 600 : 500,
	color: idx === serviceIdx ? theme.black : '',
}));

const ServiceTitle = styled(Text)<{lang: string}>(({ theme, lang }) => ({
	fontSize: w(5),
	fontWeight: 700,
	color: theme.black,
	marginTop: h(1.5),
	marginBottom: h(2.5),
	textAlign: lang === "en" ? 'left' : 'right'
}));

export { Appointment };