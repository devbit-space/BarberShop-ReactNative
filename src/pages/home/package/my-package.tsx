import styled from "styled-components/native";
import { View, ScrollView } from "react-native";
import { useI18n } from "react-simple-i18n";

import { UserHeader } from "../../userpages/common/header";
import { routerConfig } from "../../../routerConfig";
import { w } from "../../../theme/services";
import { BuyingItem } from "../../userpages/common/buying-item";

import { packageImg1, packageImg2, packageImg3 } from "../../../assets/image";

const MyPackage = ({ navigation }: {navigation: any}) => {
	const goToUserMenu = () => {
		navigation.navigate(routerConfig.userMenuPage.name);
	}

    const {t} = useI18n();

    const datas = [
        {
            title: "Haircut & Shave",
            price: "$40",
            time: "40 Mins",
            amount: 0,
            image: packageImg1
        },
        {
            title: "Haircut & Shave",
            price: "$40",
            time: "40 Mins",
            amount: 0,
            image: packageImg2
        },
        {
            title: "Haircut & Shave",
            price: "$40",
            time: "40 Mins",
            amount: 0,
            image: packageImg3
        },
    ]

	return (
		<MyPackageWrapper>
			<UserHeader title={t('package.myPackage')} onPress={goToUserMenu} />

            <View>
                {
                    datas.map((i, k) => (
                        <BuyingItem onBuying={() => {}} i={i} key={k} />
                    ))
                }
            </View>
		</MyPackageWrapper>
	)
}

const MyPackageWrapper = styled(View)(({ theme }) => ({
	gap: 10,
	paddingLeft: w(5),
	paddingRight: w(5),
	display: "flex",
	flexDirection: "column",
	backgroundColor: "#EEECEA",
	height: "100%",
}))

const MyPackageContainer = styled(ScrollView)(({ theme }) => ({
	gap: 20,
	display: "flex",
	flexDirection: "column",
	padding: `10px ${theme.globalSpacingX}px`
}))

export { MyPackage };