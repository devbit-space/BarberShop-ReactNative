import React from "react";
import styled from "styled-components/native";
import { Dimensions, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useI18n } from "react-simple-i18n";

import { routerConfig } from "../../../routerConfig";
import { UserHeader } from "../common/header";
import { h, w } from "../../../theme/services";
import { useGlobalContext } from "../../../provider";
import { packageImg1, packageImg2, packageImg3 } from "../../../assets/image";
import { BuyingItem } from "../common/buying-item";

const { width: viewportWidth } = Dimensions.get('window');

const HomeCheckout = ({ navigation }: { navigation: any }) => {
    const goToAppointment = () => {
        navigation.navigate(routerConfig.appointmentPage.name);
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
    const serviceList = ["Avichay Elkayam", "Kmila Elkayam", "Avichay Elkayam", "Kmila Elkayam"]

    const onBuying = () => {
        navigation.navigate(routerConfig.homeCheckOutPage)
    }

    return (
        <HomeCheckoutWrapper>
            <UserHeader title={t('homeCheckout.checkout')} onPress={goToAppointment} />

            <ScrollView horizontal>
                {/* <ServiceWrapper lang={state.lang}>
                    {serviceList.map((i, k) => (
                        <Pressable onPress={() => setStatus({ ...state, serviceIdx: k })} key={k}><Service idx={k} serviceIdx={status.serviceIdx}>{i}</Service></Pressable>
                    ))}
                </ServiceWrapper> */}

            </ScrollView>
            <ServiceWrapper lang={state.lang}>
                <ServiceItem lang={state.lang}>
                    <Service lang={state.lang}>
                        <ServiceTitle lang={state.lang}>Haircut</ServiceTitle>
                        <ServicePrice lang={state.lang}>$160</ServicePrice>
                        <ServiceTitle lang={state.lang}>Clean Shave</ServiceTitle>
                        <ServicePrice lang={state.lang}>$80</ServicePrice>
                    </Service>
                    {/* <SelectWrapper>
                        <StyledSelect>
                            <Pressable></Pressable>
                            <SelectedNumber></SelectedNumber>
                            <Pressable></Pressable>
                        </StyledSelect>
                        <ServicePrice>$80</ServicePrice>
                    </SelectWrapper> */}

                </ServiceItem>
            </ServiceWrapper>

        </HomeCheckoutWrapper>
    )
}

const HomeCheckoutWrapper = styled(View)(({ theme }) => ({
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

const ServiceItem = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",

    alignItems: "center",
    gap: w(4),
    height: h(5)
}));

const Service = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    
}));

const ServiceTitle = styled(Text)<{ lang: string }>(({ theme, lang }) => ({
    fontSize: w(5),
    fontWeight: 700,
    color: theme.black,
    marginTop: h(1.5),
    marginBottom: h(2.5),
    textAlign: lang === "en" ? 'left' : 'right'
}));

const ServicePrice = styled(Text)<{ lang: string }>(({ theme, lang }) => ({
    
}));

export { HomeCheckout };