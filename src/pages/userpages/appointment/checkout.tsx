import React from "react";
import styled from "styled-components/native";
import { View, Image, StyleSheet, Text, Pressable, TouchableOpacity, Keyboard } from "react-native";
import { useI18n } from "react-simple-i18n";
import moment from "moment";

import { routerConfig } from "../../../routerConfig";

import { h, w } from "../../../theme/services";
import { useGlobalContext } from "../../../provider";
import { restApi, } from "../../../provider/restApi";
import { UserHeader } from "../common/header";
import Input from "../../../components/input";
import { apiNotification } from "../../../services";
import { TextH1, TextH2, TextH3, TextH4, TextH6 } from "../../../components/typography";
import { isIOS } from '../../../services';

const data = [
    { date: "Mon", day: "22" },
    { date: "Tue", day: "23" },
    { date: "Wed", day: "24" },
    { date: "Thu", day: "25" },
    { date: "Fr", day: "26" },
]

const times = ["10.00 AM", "10.30 AM", "11.00 AM", "11.30 AM", "12.00 AM", "12.30 AM", "01.00 PM", "01.30 PM",]

interface CheckoutProps {

}
const NativeButton = !isIOS ? Pressable : TouchableOpacity;

const Checkout = ({ navigation }: { navigation: any }) => {
    const { t } = useI18n();
    const [state]: GlobalContextType = useGlobalContext()

    const goToOrderDetail = () => {
        navigation.navigate(routerConfig.orderDetailPage.name);
    }

    const onAddCard = async () => {
        try {
            Keyboard.dismiss();
            navigation.navigate(routerConfig.orderDetailPage.name);
        } catch (error) {
            apiNotification(error, "updateProfile Failed")
        }
    }

    return (
        <CheckoutWrapper>
            <UserHeader title={t('checkout.checkout')} onPress={goToOrderDetail} />
            <StyledContainer>
                <Title>{t('checkout.selectDateTime')}</Title>

                <OrderContainer>
                    <StyledText>{t('checkout.timeOfOrder')}</StyledText>
                    <VipContainer lang={state.lang}>
                        {data.map((i, k) => (
                            <Vip key={k}>
                                <StyledDate i={i.date}>{i.date}</StyledDate>
                                <StyledDay i={i.day}>{i.day}</StyledDay>
                            </Vip>
                        ))}
                    </VipContainer>
                </OrderContainer>

                <OrderContainer>
                    <StyledText>{t('checkout.timeOfOrder')}</StyledText>
                    <StyledTimeContainer>
                        {times.map((i, k) => (
                            <StyledTime i={i} key={k}>{i}</StyledTime>
                        ))}
                    </StyledTimeContainer>
                </OrderContainer>

            </StyledContainer>
            <AddButton
                // loading={status.isLoading}
                onPress={onAddCard}
            >
                <TextH2 style={{fontSize: w(4.5), fontWeight: 700, color: 'black'}}>{t('checkout.confirmSchedule')}</TextH2>
            </AddButton>
        </CheckoutWrapper>
    )
}

const CheckoutWrapper = styled(View)(({ theme }) => ({
    gap: 8,
    paddingLeft: w(4),
    paddingRight: w(4),
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: '#EEECEA'
}));

const StyledContainer = styled(View)(({ theme }) => ({
    gap: h(2.5),
    display: "flex",
    flexDirection: "column",
}));

const OrderContainer = styled(View)(({ theme }) => ({
    gap: h(1),
    display: "flex",
    flexDirection: "column",
}));

const Title = styled(TextH6)(({ theme }) => ({
    fontSize: w(5.3),
    fontWeight: 700
}));

const StyledText = styled(TextH2)(({ theme }) => ({
    fontSize: w(4.6),
    fontWeight: 700
}));

const VipContainer = styled(View)<{ lang: string }>(({ lang }) => ({
    gap: w(2),
    display: 'flex',
    flexDirection: lang == "he" ? "row-reverse" : "row",
}));

const Vip = styled(View)(({ theme }) => ({
    borderWidth: 1.3,
    borderRadius: 6,
    width: w(13),
    borderColor: "#C7C9D9"
}));

const StyledDate = styled(TextH2)<{ i: string }>(({ theme, i }) => ({
    fontSize: w(3.5),
    fontWeight: '400',
    textAlign: 'center',
    color: i === "Wed" ? "#8C867B" : ""
}));

const StyledDay = styled(TextH2)<{ i: string }>(({ theme, i }) => ({
    fontSize: w(5),
    fontWeight: '700',
    textAlign: 'center',
    color: i === "24" ? "#8C867B" : ""
}));

const StyledTimeContainer = styled(View)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: w(3),
}));

const StyledTime = styled(TextH2)<{ i: string }>(({ theme, i }) => ({
    borderWidth: 1.1,
    borderRadius: 100,
    width: w(43),
    borderColor: "#C7C9D9",
    textAlign: 'center',
    fontWeight: '400',
    fontSize: w(4),
    paddingTop: h(.9),
    paddingBottom: h(.9),
    color: i === "11.00 AM" ? "#8C867B" : ""
}));

const AddButton = styled(NativeButton)(({ theme }) => ({
    borderRadius: w(100),
    padding: h(1),
    marginTop: h(22),
    backgroundColor: "#D7D3CE",
    borderWidth: 1.1,
    borderColor: "#D7D3CE",
    alignItems: 'center',
}));

export { Checkout };