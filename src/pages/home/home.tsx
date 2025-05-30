import React from "react";
import { Image, Pressable, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { useI18n } from "react-simple-i18n";

import { useGlobalContext } from "../../provider";
import { MainScreenHeader } from "../mainscreen/layout/header";
import { nextWhiteIcon, prevWhiteIcon } from "../../assets/image";
import { h, w } from "../../theme/services";
import { TextH6 } from "../../components/typography";
import { routerConfig } from "../../routerConfig";


const Home = ({ navigation }: { navigation: any }) => {
	const [state] = useGlobalContext();
	const { t } = useI18n();

	const menus = [
		{ name: t('home.appointment'), slug: 'appointment' },
		{ name: t('home.vipClub'), slug: 'myPackage' },
		{ name: t('home.store'), slug: 'myPackage' },
		{ name: t('home.giftCard'), slug: 'myPackage' },
		{ name: t('home.referAFriend'), slug: 'myPackage' },
		{ name: t('home.giftShop'), slug: 'myPackage' },
		{ name: t('home.guidance'), slug: 'myPackage' },
		{ name: t('home.aboutUs'), slug: 'myPackage' },
	]

	return (
		<HomeWrapper>
			<MainScreenHeader navigation={navigation} />

			<MenuContainer>
				{menus.map((i, k) => (
					<PressableItems key={k} lang={state.lang} onPress={() => {navigation.navigate(i.slug)}}>
						<StyledItem lang={state.lang}>
							<MenuItemTitle>{i.name}</MenuItemTitle>
						</StyledItem>

						<Image style={homeItemsStyles.menuItemNextIcon} source={state.lang === "en" ? nextWhiteIcon : prevWhiteIcon} />
					</PressableItems>
				))}
			</MenuContainer>
		</HomeWrapper>
	)
}
const HomeWrapper = styled(View)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	backgroundColor: theme.mainBackground,
	height: "100%",
}))

const MenuContainer = styled(View)(({ theme }) => ({
	gap: h(4.5),
	display: "flex",
	flexDirection: "column",
	paddingTop: h(2),
	paddingLeft: w(4),
	paddingRight: w(4),
}))

const PressableItems = styled(Pressable)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	// gap: h(2),
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "baseline",
	justifyContent: "space-between",
}))

const StyledItem = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	gap: w(3),
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",

	alignItems: "center",
	justifyContent: "center",
}))

const MenuItemTitle = styled(TextH6)(({ theme }) => ({
	fontWeight: 500,
	color: theme.typographyFifthColor,
}))

const homeItemsStyles = StyleSheet.create({
	menuItemIcon: {
		height: w(6.5),
		width: w(6.5),
	},
	menuItemNextIcon: {
		height: h(1.3),
	},
})

export { Home }