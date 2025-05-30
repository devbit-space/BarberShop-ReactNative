import React from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useI18n } from "react-simple-i18n";

import { routerConfig } from "../../../routerConfig";
import { UserHeader } from "../common/header";
import { Tab } from "../../../components/tab";
import { h, w } from "../../../theme/services";
import { BookingItem } from "../common/booking-item";
import { CancelBookingModal } from "../common/cancel-booking-modal";
import { useGlobalContext } from "../../../provider";

const { width: viewportWidth } = Dimensions.get('window');

const Appointments = ({ navigation }: { navigation: any }) => {
	const goToUserMenu = () => {
		navigation.navigate(routerConfig.userMenuPage.name);
	}
	const { t } = useI18n();
	const [state] = useGlobalContext();
	const [status, setStatus] = React.useState({
		orderStatus: "past" as "past" | "upcoming" | "cancelled",
		isCancelBooking: false
	})

	const data = [
		{
			title: "Avichay Elkayam",
			desc: "Haircut x 1 + Shave x 1",
			dateTime: "24 Jul 2024 11:00 AM",
			price: "$240",
			status: true,
		},
		{
			title: "Avichay Elkayam",
			desc: "Haircut x 1 + Shave x 1",
			dateTime: "24 Jul 2024 11:00 AM",
			price: "$240",
			status: true,
		},
		{
			title: "Avichay Elkayam",
			desc: "Haircut x 1 + Shave x 1",
			dateTime: "24 Jul 2024 11:00 AM",
			price: "$240",
			status: true,
		},
	]

	const serviceList = ["Recommended", "Packages", "Woman Cut", "Man Cut"]
	const [activeIdx, setActiveIdx] = React.useState(0);

	const onBooking = () => {
		navigation.navigate(routerConfig.orderDetailPage.name)
	}

	const onCancelBooking = () => {
		setStatus({ ...status, isCancelBooking: false })
	}

	return (
		<AppointmentsWrapper>
			<UserHeader title={t('appointments.appointment')} onPress={goToUserMenu} />
			<Tab status={status} setStatus={setStatus} />

			<BookingContainer>
				{data.map((i: AppointmentsObject, k) => (
					<BookingItem key={k} status={status} setStatus={setStatus} i={i} onBooking={onBooking}/>
				))}
			</BookingContainer>

			{/* <ScrollView horizontal>
				<ServiceWrapper lang={state.lang}>
					{serviceList.map((i, k) => (
						<Service key={k}>{i}</Service>
					))}
				</ServiceWrapper>
			</ScrollView> */}
			<CancelBookingModal onClose={onCancelBooking} isVisible={status.isCancelBooking} navigation={navigation}></CancelBookingModal>
		</AppointmentsWrapper>
	)
}

const AppointmentsWrapper = styled(View)(({ theme }) => ({
	gap: 8,
	display: "flex",
	flexDirection: "column",
	flex: 1,
	paddingRight: w(4),
	paddingLeft: w(4),
	backgroundColor: '#EEECEA',
}));

const BookingContainer = styled(View)(({ theme }) => ({
	paddingTop: h(2),
}));

const ServiceWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	gap: w(4),
}));

const Service = styled(Text)(({ theme }) => ({
	borderWidth: 1,
	borderRadius: w(50),
	borderColor: '#D7D3CE',
	fontSize: w(3.5),
	padding: w(2),
	fontWeight: 700
}));


export { Appointments };