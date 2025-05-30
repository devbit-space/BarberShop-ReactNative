import React, { useState } from "react";
import styled from "styled-components/native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useI18n } from "react-simple-i18n";

import { UserHeader } from "./common/header";
import { routerConfig } from "../../routerConfig";
import { Divider } from "../../components/divider";
import { LogoutModal } from "./common/logoutModal";
import { LogoutButton } from "./common/logoutButton";
import { TextH2, TextH6 } from "../../components/typography";
import { appointmentsIcon, nextWhiteIcon, prevWhiteIcon } from "../../assets/image";
import { orderHistoryIcon, packagesIcon, userAvatarImg } from "../../assets/image";
import { h, w } from "../../theme/services";
import { useGlobalContext } from "../../provider";
import { emailEllipse } from "../../services/utils";

const UserMenu = ({ navigation }: { navigation: any }) => {
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
	const [state] = useGlobalContext();
	const { t } = useI18n();

	const goToMainScreenPage = () => {
		navigation.navigate(routerConfig.mainScreenPage.name);
	}

	const goToAccountEditPage = () => {
		navigation.navigate(routerConfig.accountSettingPage.name);
	}

	const goToAppointmentsPage = () => {
		navigation.navigate(routerConfig.appointMentsPage.name);
	}

	const goToPackagesPage = () => {
		navigation.navigate(routerConfig.myPackagePage.name);
	}

	const gotoOrderHistoryPage = () => {
		navigation.navigate(routerConfig.orderHistoryPage.name);
	}

	const openLogoutModal = () => {
		setShowLogoutModal(true);
	}

	const closeLogoutModal = () => {
		setShowLogoutModal(false);
	}

	console.log("state.userData.image", state.userData.image)
	return (
		<UserMenuWrapper>
			<UserHeader title={t('account.profile')} onPress={goToMainScreenPage} />

			<UserDetailsSection lang={state.lang}>
				<Image style={userDetailsStyles.userAvatar} source={state.userData.image ? { uri: state.userData.image } : userAvatarImg} />

				<View style={userDetailsStyles.userDetailsContainer}>
					<UserDetailsItemContainer lang={state.lang}>
						<TextH2 style={userDetailsStyles.userNameTitle}>{state.userData.firstName} {state.userData.lastName}</TextH2>

						<EditButton lang={state.lang} onPress={goToAccountEditPage}>
							<UserDetailsEditTitle>{t('account.edit')}</UserDetailsEditTitle>
							<Image style={{ height: h(1.5) }} source={state.lang === "en" ? nextWhiteIcon : prevWhiteIcon} />
						</EditButton>
					</UserDetailsItemContainer>

					<UserDetailsItem lang={state.lang}>
						<UserDetailsTitle>{state.userData.phoneNumber}</UserDetailsTitle>
						<UserDetailsTitle>{state.userData.email}</UserDetailsTitle>
					</UserDetailsItem>
				</View>
			</UserDetailsSection>

			<MenuContainer>
				<PressableItems lang={state.lang} onPress={goToAppointmentsPage}>
					<StyledItem lang={state.lang}>
						<Image style={userMenuItemsStyles.menuItemIcon} source={appointmentsIcon} />
						<MenuItemTitle>{t('appointments.appointment')}</MenuItemTitle>
					</StyledItem>

					<Image style={userMenuItemsStyles.menuItemNextIcon} source={state.lang === "en" ? nextWhiteIcon : prevWhiteIcon} />
				</PressableItems>

				<PressableItems lang={state.lang} onPress={goToPackagesPage}>
					<StyledItem lang={state.lang}>
						<Image style={userMenuItemsStyles.menuItemIcon} source={packagesIcon} />
						<MenuItemTitle>{t('packages.packages')}</MenuItemTitle>
					</StyledItem>

					<Image style={userMenuItemsStyles.menuItemNextIcon} source={state.lang === "en" ? nextWhiteIcon : prevWhiteIcon} />
				</PressableItems>

				<PressableItems lang={state.lang} onPress={gotoOrderHistoryPage}>
					<StyledItem lang={state.lang}>
						<Image style={userMenuItemsStyles.menuItemIcon} source={orderHistoryIcon} />
						<MenuItemTitle>{t('orderHistory.orderHistory')}</MenuItemTitle>
					</StyledItem>

					<Image style={userMenuItemsStyles.menuItemNextIcon} source={state.lang === "en" ? nextWhiteIcon : prevWhiteIcon} />
				</PressableItems>
			</MenuContainer>

			<LogoutButton onPress={openLogoutModal} />

			<LogoutModal navigation={navigation}
				isVisible={showLogoutModal}
				onClose={closeLogoutModal}
			/>
		</UserMenuWrapper>
	)
}

const UserMenuWrapper = styled(View)(({ theme }) => ({
	gap: h(1),
	display: "flex",
	flexDirection: "column",
	backgroundColor: "#EEECEA",
	height: "100%",
	paddingLeft: w(4),
	paddingRight: w(4)
}))

const UserDetailsSection = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	justifyContent: 'space-between',
	gap: w(2),
	alignItems: "center",
}))

const UserDetailsItemContainer = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	gap: w(2),
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	justifyContent: "space-between",
}))

const UserDetailsItem = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	gap: w(2),
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
}))

const EditButton = styled(Pressable)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "center",
	justifyContent: "center",
}))

const UserDetailsEditTitle = styled(TextH6)(({ theme }) => ({
	fontWeight: 500,
	color: theme.typographyFourthColor,
}))

const UserDetailsTitle = styled(TextH6)(({ theme }) => ({
	color: theme.typographyFourthColor,
	fontSize: w(3.2)
}))

const MenuContainer = styled(View)(({ theme }) => ({
	gap: h(4),
	display: "flex",
	flexDirection: "column",
	paddingTop: h(4)
}))

const MenuItemTitle = styled(TextH6)(({ theme }) => ({
	fontWeight: 500,
	color: theme.typographyFifthColor,
}))

const PressableItems = styled(Pressable)<{ lang: string }>(({ theme, lang }) => ({
	display: "flex",
	// gap: h(2),
	flexDirection: lang === "en" ? "row" : "row-reverse",
	alignItems: "baseline",
	justifyContent: "space-between",
}))

const StyledItem = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	gap: w(2),
	display: "flex",
	flexDirection: lang === "en" ? "row" : "row-reverse",

	alignItems: "center",
	justifyContent: "center",
}))

const userDetailsStyles = StyleSheet.create({
	userAvatar: {
		width: w(15),
		height: w(15),
		borderRadius: 100,
	},
	userDetailsContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	userNameTitle: {
		fontWeight: 700,
		fontSize: w(4.5)
	},
})

const userMenuItemsStyles = StyleSheet.create({
	menuItemIcon: {
		height: w(6.5),
		width: w(6.5),
	},
	menuItemNextIcon: {
		height: h(1.3),
	},
})

export { UserMenu };