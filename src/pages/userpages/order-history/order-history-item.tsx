import styled from "styled-components/native";
import { Image, StyleSheet, View } from "react-native";
import { TextBody, TextH5, TextH6 } from "../../../components/typography";
import { useGlobalContext } from "../../../provider";
import { h, w } from "../../../theme/services";

interface OrderHistoryItem {
	orderItem: OrderHistoryObject
}

const OrderHistoryItem = ({ orderItem }: OrderHistoryItem) => {
	const [state] = useGlobalContext();

	return (
		<ItemWrapper lang={state.lang} style={styles.itemWrapper}>
			<Image source={orderItem.image} style={styles.productImage} />

			<View style={styles.contentContainer}>
				<TextH5 style={styles.textHeader}>
					{orderItem.title}
				</TextH5>

				<ContentText style={styles.textContent}>
					{orderItem.content}
				</ContentText>

				<TextBody style={styles.textFooter}>
					{orderItem.size}
				</TextBody>
			</View>
		</ItemWrapper>
	)
}

const ContentText = styled(TextH6)(({ theme }) => ({
	color: theme.typographyFifthColor
}))

const ItemWrapper = styled(View)<{lang: string}>(({ theme, lang }) => ({
	flexDirection: lang === "en" ? "row" : "row-reverse",
	justifyContent: "center",
	marginTop: h(5)
}))


const styles = StyleSheet.create({
	itemWrapper: {
		gap: 15,
		display: "flex",
		alignItems: "center",
	},
	productImage: {
		maxWidth: "30%",
		objectFit: "fill",
		height: h(10),
	},
	contentContainer: {
		flex: 1,
		gap: 5,
		display: "flex",
		flexDirection: "column",
	},
	textHeader: {
		fontWeight: 600,
		fontSize: w(4)
	},
	textContent: {
		fontWeight: 400,
		fontSize: w(3.5)

	},
	textFooter: {
		fontWeight: 600,
		fontSize: w(3)
	}
})

export { OrderHistoryItem }