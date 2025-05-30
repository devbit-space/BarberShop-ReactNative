import styled from "styled-components/native";
import { Image, View, StyleSheet, Pressable } from "react-native";

import { TextH6 } from "../../../components/typography";
import { cardIcon, homeIcon, notificationIcon, userAvatarImg } from "../../../assets/image";
import { routerConfig } from "../../../routerConfig";
import { h, w } from "../../../theme/services";
import { useGlobalContext } from "../../../provider";


interface MainScreenHeaderProps {
	navigation: any
}

const MainScreenHeader = ({ navigation }: MainScreenHeaderProps) => {
	const goToUserMenuPage = () => {
		navigation.navigate(routerConfig.userMenuPage.name);
	}

	const [state] = useGlobalContext() as GlobalContextType
	return (
		<MainScreenHeaderWrapper lang={state.lang}>
			<HeaderSectionContainer lang={state.lang}>
				<Pressable onPress={goToUserMenuPage}>
					<Image style={styles.userAvatar} source={state.userData.image ? {uri: state.userData.image} : userAvatarImg} />
				</Pressable>

				<View style={styles.balanceWrapper}>
					<TextH6 style={styles.balanceText}>500</TextH6>
					<Image style={styles.headerIcon} source={cardIcon} />
				</View>
			</HeaderSectionContainer>

			<HeaderSectionContainer style={{gap: w(4.5)}} lang={state.lang}>
				<Image style={styles.headerIcon} source={notificationIcon} />
				<Pressable onPress={() => navigation.navigate(routerConfig.homePage.name)}><Image style={styles.headerIcon} source={homeIcon} /></Pressable>
			</HeaderSectionContainer>
		</MainScreenHeaderWrapper>
	)
}

const MainScreenHeaderWrapper = styled(View)<{lang: string}>(({ theme, lang }) => ({
	height: h(9),
	paddingLeft: w(4),
	paddingRight: w(4),
	backgroundColor: theme.mainBackground,
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	justifyContent: "space-between",
}))

const HeaderSectionContainer = styled(View)<{lang: string}>(({theme, lang}) => ({
	gap: w(2),
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	justifyContent: "center",
}))

const styles = StyleSheet.create({
	userAvatar: {
		width: w(11),
		height: w(11),
		borderRadius: 100,
	},
	headerIcon: {
		width: w(5),
		height: w(5),
	},
	balanceWrapper: {
		gap: w(2),
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	balanceText: {
		fontWeight: 700,
	}
})

export { MainScreenHeader };