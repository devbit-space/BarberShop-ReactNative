import styled from "styled-components/native";
import { View } from "react-native";

import { routerConfig } from "../../routerConfig";
import { UserHeader } from "./common/header";

interface PackagesProps {
	navigation: any
}

const Packages = ({ navigation }: PackagesProps) => {
	const goToUserMenu = () => {
		navigation.navigate(routerConfig.userMenuPage.name);
	}

	return (
		<PackagesWrapper>
			<UserHeader title="Packages" onPress={goToUserMenu} />
		</PackagesWrapper>
	)
}

const PackagesWrapper = styled(View)(({ theme }) => ({
	gap: 8,
	display: "flex",
	flexDirection: "column",
	backgroundColor: theme.white,
	height: "100%",
}))

export { Packages };