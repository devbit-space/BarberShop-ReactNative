import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { useI18n } from "react-simple-i18n";

import { useGlobalContext } from "../../../provider";
import { routerConfig } from "../../../routerConfig";
import { UserHeader } from "../common/header";
import { h, w } from "../../../theme/services";
import { TextH2, TextH5, TextH6, TextSM } from "../../../components/typography";
import { IMAGE, nextWhiteIcon, prevWhiteIcon } from "../../../assets/image";
import { Divider } from "../../../components/divider";
import Button from "../../../components/button";
import { SelectPaymentModal } from "../common/select-payment-modal";

const OrderDetail = ({ navigation }: { navigation: any }) => {
    const goToAppointment = () => {
        navigation.navigate(routerConfig.appointMentsPage.name);
    }
    const { t } = useI18n();
    const [state] = useGlobalContext();
    const [status, setStatus] = React.useState({
        data: [] as OrderDetailObject[],
        isLoding: false,
        isVisible: false
    })

    const data = {
        name: "Avichay Elkayam",
        dateTime: "23 July 2024  11:00 AM",
        prices: {
            haircut: "$160",
            cleanShave: "$80",
            grandTotal: "$240",
        },
        orderNumber: "32414121512",
        payment: ["4153 xxxx xxxxx 0981"]
    }

    const onReorder = () => {
        navigation.navigate(routerConfig.confirmAppointmentPage.name)
    }

    const onModalClose = () => setStatus({ ...status, isVisible: false })
    const onModalShow = () => setStatus({ ...status, isVisible: true })

    return (
        <OrderDetailWrapper>
            <UserHeader title={t('orderDetail.orderDetail')} onPress={goToAppointment} />

            <View>
                <Name lang={state.lang}>{data.name}</Name>
                <Pressable onPress={() => navigation.navigate(routerConfig.checkoutPage.name)}>
                    <ImageContainer lang={state.lang} >
                        <CardContainer lang={state.lang}>
                            <StyledImage source={IMAGE.calender} />
                            <StyledDateTime>{data.dateTime}</StyledDateTime>
                        </CardContainer>
                        <ArrowImage source={state.lang === "en" ? nextWhiteIcon : prevWhiteIcon} />
                    </ImageContainer>
                </Pressable>
                <BookingWrapper lang={state.lang}>
                    <BookingTitle>{t('orderDetail.haircut')}</BookingTitle>
                    <Price>{data.prices.haircut}</Price>
                </BookingWrapper>
                <PriceWrapper lang={state.lang}>
                    <PriceCard>1</PriceCard>
                    <TextH6>x</TextH6>
                    <TextH6>{data.prices.haircut}</TextH6>
                </PriceWrapper>

                <BookingWrapper lang={state.lang}>
                    <BookingTitle>{t('orderDetail.cleanShave')}</BookingTitle>
                    <Price>{data.prices.cleanShave}</Price>
                </BookingWrapper>

                <PriceWrapper lang={state.lang}>
                    <PriceCard>1</PriceCard>
                    <TextH6>x</TextH6>
                    <TextH6>{data.prices.cleanShave}</TextH6>
                </PriceWrapper>
            </View>
            <Divider/>
            <GrandTotalWrapper lang={state.lang}>
                <BookingTitle>{t('orderDetail.grandTotal')}</BookingTitle>
                <TotalPrice lang={state.lang}>{data.prices.grandTotal}</TotalPrice>
            </GrandTotalWrapper>

            <OrderNumberText lang={state.lang}>{t('orderDetail.orderNumber')}</OrderNumberText>
            <TextH5>{data.orderNumber}</TextH5>
            <OrderNumberText lang={state.lang}>{t('orderDetail.payment')}</OrderNumberText>
            <Pressable onPress={onModalShow}>
                <ImageContainer style={{marginTop: 0}}  lang={state.lang}>
                    <CardContainer lang={state.lang}>
                        <StyledImage style={{width: w(8), height: w(6)}} source={IMAGE.bit} />
                        <PaymentText>{data.payment}</PaymentText>
                    </CardContainer>
                    <ArrowImage source={state.lang === "en" ? nextWhiteIcon : prevWhiteIcon} />
                </ImageContainer>
            </Pressable>

            <Button
                btnProps={{ style: { marginTop: h(16.5) } }}
                // loading={status.isLoading}
                onPress={onReorder}
            >
                <BookingTitle style={{color: 'black', fontSize: w(4.5)}}>{t('orderDetail.reorderBooking')}</BookingTitle>
            </Button>

            <SelectPaymentModal navigation={navigation} data={data} isVisible={status.isVisible} onClose={onModalClose}></SelectPaymentModal>
        </OrderDetailWrapper >
    )
}

const OrderDetailWrapper = styled(View)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: h(1.5),
    height: "100%",
    paddingRight: w(4),
    paddingLeft: w(4),
    backgroundColor: '#EEECEA'
}));

const StyledImage = styled(Image)(({ theme }) => ({
    width: w(6.2),
    height: w(6.2),
    borderRadius: 3

}));

const ArrowImage = styled(Image)(({ theme }) => ({
    width: w(4),
    height: w(4),
}));

const StyledDateTime = styled(TextH2)(({ theme }) => ({fontWeight: 700, fontSize: w(4.2)}));

const Name = styled(TextH2)<{ lang: string }>(({ theme, lang }) => ({
    display: "flex",
    textAlign: lang === "en" ? "left" : "right",
    alignItems: 'center',
    fontSize: w(5.2),
    fontWeight: 700
}));

const ImageContainer = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    marginTop: h(2),
    marginBottom: h(2.5),
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const CardContainer = styled(View)<{lang: string}>(({ theme, lang }) => ({
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    alignItems: 'center',
    gap: w(5)
}));

const BookingWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    marginTop: h(2.5),
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const BookingTitle = styled(TextH2)(({ theme }) => ({
    fontWeight: '700',
    fontSize: w(4)
}));

const PaymentText = styled(TextH2)(({ theme }) => ({
    fontWeight: '700',
    fontSize: w(4)
}));

const Price = styled(TextH2)(({ theme }) => ({
    fontWeight: '400',
    fontSize: w(4)
}));

const PriceWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    display: 'flex',
    flexDirection: lang === "en" ? "row" : "row-reverse",
    gap: w(3),
    paddingTop: h(1.5),
}));

const PriceCard = styled(TextH6)(({ theme }) => ({
    borderWidth: 1,
    borderColor: '#05A660',
    color: '#05A660',
    backgroundColor: '#e3fcf0',
    width: w(6),
    height: w(6),
    fontSize: w(3.5),
    borderRadius: 3,
    fontWeight: '600',
    textAlign: 'center',
    verticalAlign: 'center'
}));

const GrandTotalWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    display: 'flex',
    flexDirection: lang === "en" ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
}));

const TotalPrice = styled(Price)<{ lang: string }>(({ theme, lang }) => ({
    fontWeight: '800',
    fontSize: w(5)
}))

const OrderNumberText = styled(TextSM)<{lang: string}>(({ theme, lang }) => ({
    fontWeight: '500',
    fontSize: w(3),
    textAlign: lang === "en" ? "left" : "right",
}))



export { OrderDetail };