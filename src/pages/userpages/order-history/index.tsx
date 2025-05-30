import styled from "styled-components/native";
import { View, ScrollView } from "react-native";

import { UserHeader } from "../common/header";
import { routerConfig } from "../../../routerConfig";
import { OrderHistoryItem } from "./order-history-item";
import { productImg1, productImg2, productImg3, productImg4 } from "../../../assets/image";
import { h, w } from "../../../theme/services";
import { useI18n } from "react-simple-i18n";

interface OrderHistoryProps {
	navigation: any
}

const initOrderHistory: OrderHistoryObject[] = [
	{
		image: productImg1,
		title: "Fusion Luxury Mask",
		content: "Super hydrating mask ideal for stressed, treated or dry hair requiring deep nourishment and hydration...",
		size: "200ml"
	}, {
		image: productImg2,
		title: "Babassu Wash",
		content: "Volumizing shampoo ideal for fine hair. Rich in revitalizing active ingredients, it promotes hydration of the scalp and...",
		size: "320ml"
	}, {
		image: productImg3,
		title: "Everyday Wash",
		content: "Product formulated to delicately cleanse and soothe the scalp while maintaining the hair structure and its...",
		size: "75ml"
	}, {
		image: productImg1,
		title: "Fusion Luxury Mask",
		content: "Super hydrating mask ideal for stressed, treated or dry hair requiring deep nourishment and hydration...",
		size: "200ml"
	}, {
		image: productImg2,
		title: "Babassu Wash",
		content: "Volumizing shampoo ideal for fine hair. Rich in revitalizing active ingredients, it promotes hydration of the scalp and...",
		size: "320ml"
	}, {
		image: productImg3,
		title: "Everyday Wash",
		content: "Product formulated to delicately cleanse and soothe the scalp while maintaining the hair structure and its...",
		size: "75ml"
	},{
		image: productImg1,
		title: "Fusion Luxury Mask",
		content: "Super hydrating mask ideal for stressed, treated or dry hair requiring deep nourishment and hydration...",
		size: "200ml"
	}, {
		image: productImg2,
		title: "Babassu Wash",
		content: "Volumizing shampoo ideal for fine hair. Rich in revitalizing active ingredients, it promotes hydration of the scalp and...",
		size: "320ml"
	}, {
		image: productImg3,
		title: "Everyday Wash",
		content: "Product formulated to delicately cleanse and soothe the scalp while maintaining the hair structure and its...",
		size: "75ml"
	},
]

const OrderHistory = ({ navigation }: OrderHistoryProps) => {
	const goToUserMenu = () => {
		navigation.navigate(routerConfig.userMenuPage.name);
	}
	const {t} = useI18n();

	return (
		<OrderHistoryWrapper>
			<UserHeader title={t('orderHistory.orderHistory')} onPress={goToUserMenu} />

			<OrderHistoryContainer>
				{initOrderHistory.map((orderitem: OrderHistoryObject, key: number) => (
					<OrderHistoryItem orderItem={orderitem} key={key} />
				))}
			</OrderHistoryContainer>
		</OrderHistoryWrapper>
	)
}

const OrderHistoryWrapper = styled(View)(({ theme }) => ({
	paddingLeft: w(4),
	paddingRight: w(4),
	display: "flex",
	flexDirection: "column",
	backgroundColor: "#EEECEA",
	height: "100%",
}))

const OrderHistoryContainer = styled(ScrollView)(({ theme }) => ({
	gap: h(10),
	display: "flex",
	flexDirection: "column",
}))

export { OrderHistory };