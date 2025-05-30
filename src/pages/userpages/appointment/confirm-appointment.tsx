import React from "react";
import { StyleSheet, Image, View } from 'react-native';
import { useI18n } from "react-simple-i18n";
import styled, { useTheme } from 'styled-components/native';

import { routerConfig } from "../../../routerConfig";
import { restApi } from "../../../provider/restApi";
import { TextH2, TextH3 } from "../../../components/typography";
import { IMAGE } from "../../../assets/image";
import { h, w } from "../../../theme/services";
import { useGlobalContext } from "../../../provider";
import { UserHeader } from "../common/header";


interface ConfirmAppointmentStatus {
    isLoading: boolean;
    code: string,
    isRightCode: boolean
}

const CELL_COUNT = 6;

const ConfirmAppointment = ({ navigation }: { navigation: any }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [state, { dispatch, setStore }]: GlobalContextType = useGlobalContext()

    

    const goToBack = async () => navigation.navigate(routerConfig.orderDetailPage.name);

    return (
        <ConfirmAppointmentWrapper>
            <UserHeader onPress={goToBack} />
            
            <Container>
                <View style={{display: 'flex', flexDirection: state.lang === "en" ? 'row' : 'row-reverse'}}><Image style={{ width: w(11), height: w(11) }} source={IMAGE.tick} /></View>
                <TextH2 style={{ fontSize: w(6), fontWeight: '700', paddingTop: h(2) }}>{t("confirmAppointment.title")}</TextH2>
                <StyledDesc>
                    {t("confirmAppointment.desc1")}
                    <StyledBorderDesc> 23 July 2024 </StyledBorderDesc>
                    {t("confirmAppointment.at")}
                    <StyledBorderDesc> 11:00 AM </StyledBorderDesc>
                    {t("confirmAppointment.desc2")}
                </StyledDesc>
            </Container>
        </ConfirmAppointmentWrapper>
    )
}

const ConfirmAppointmentWrapper = styled(View)(({ theme }) => ({
    flex: 1,
    paddingLeft: w(4),
    paddingRight: w(4),
    backgroundColor: '#EEECEA'
}));

const Container = styled(View)(({ theme }) => ({
    paddingTop: h(17),
}));

const StyledDesc = styled(TextH2)(({ theme }) => ({
    paddingTop: h(1),
    fontSize: w(4.5),
    fontWeight: '400',
}));

const StyledBorderDesc = styled(StyledDesc)(({ theme }) => ({
    fontWeight: '800',
}));

export { ConfirmAppointment }