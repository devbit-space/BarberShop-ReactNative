import React from "react";
import { Keyboard, View } from "react-native";
import { useI18n } from "react-simple-i18n";
import styled, { useTheme } from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { h, w } from "../../theme/services";
import { IMAGE } from "../../assets/image";

import { TextH2 } from "../../components/typography";
import FormPressable from "../../components/checkbox";
import LinkButton from "../../components/link-button";
import Input from "../../components/input";
import Button from "../../components/button";
import { useGlobalContext } from "../../provider";
import { restApi } from "../../provider/restApi";
import { toastMessage } from "../../services/utils";
import { apiNotification } from "../../services";
import { routerConfig } from "../../routerConfig";
import { ValidateError } from "../../services/customError";

interface SendEmailStatus {
    isLoading: boolean;
    email: string,
}

const SendEmail = ({ navigation }: { navigation: any }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [state, { dispatch, setStore }]: GlobalContextType = useGlobalContext()
    const [status, setStatus] = React.useState({
        email: "",
        isLoading: false
    } as SendEmailStatus)

    const onChangeText = (key: string, value: string | boolean) => {
        setStatus(prev => ({ ...prev, [key]: value }));
    }

    const onChangeLang = (lang: string) => {
        dispatch({ type: "lang", payload: lang })
    }

    const SendEmail = async () => {
        try {
            if (!status.email) {
                return toastMessage("error", 'Please enter your email');
            }
            dispatch({
                type: "verifyEmail",
                payload: status.email
            })
            await restApi.sendEmail({ email: status.email, lang: state.lang });
            Keyboard.dismiss();
            navigation.navigate(routerConfig.verifyCodePage.name);
        } catch (error: any) {
            apiNotification(error, "receiveCodePage Failed!");
        }
    }

    return (
        <SendEmailWrapper>
            <KeyboardAwareScrollView>
                <TextH2 style={{textAlign: "center", fontSize: w(4.5), fontWeight: '700', color: "black"}}>{t("resetPassword.title")}</TextH2>
                <Form>
                    <Input
                        title={t('login.email')}
                        placeholder={t('login.emailPlaceholder')}
                        value={status.email}
                        onChangeText={(e: any) => onChangeText('email', e)}
                    />

                    <Button
                        btnProps={{
                            style: { marginTop: h(1) }
                        }}
                        loading={status.isLoading}
                        onPress={SendEmail}
                    >
                        <TextH2 style={{textAlign: "center", fontSize: w(4), fontWeight: '600', color: "black"}}>{t('resetPassword.button')}</TextH2>
                    </Button>
                </Form>
        </KeyboardAwareScrollView>
        </SendEmailWrapper>
    )
}

const SendEmailWrapper = styled(View)(({ theme }) => ({
    flex: 1,
    paddingTop: h(21),
    paddingLeft: w(4),
    paddingRight: w(4),
    backgroundColor: "#EEECEA"
}));

const Form = styled(View)(({ theme }) => ({
    paddingTop: h(9),
    display: "flex",
    gap: h(2)
}));

export { SendEmail }