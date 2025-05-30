import React from "react";
import { Keyboard, Text, View } from "react-native";
import { useI18n } from "react-simple-i18n";
import styled, { useTheme } from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { h, w } from "../../theme/services";
import { IMAGE } from "../../assets/image";

import { TextH2, TextH3 } from "../../components/typography";
import Input from "../../components/input";
import Button from "../../components/button";
import { useGlobalContext } from "../../provider";
import { restApi } from "../../provider/restApi";
import { toastMessage } from "../../services/utils";
import { apiNotification } from "../../services";
import { routerConfig } from "../../routerConfig";
import { ValidateError } from "../../services/customError";

interface ResetPasswordStatus {
    isLoading: boolean;
    password: string,
    isPasswordVisible: boolean
}

const ResetPassword = ({ navigation }: { navigation: any }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [state, { dispatch, setStore }]: GlobalContextType = useGlobalContext()
    const [status, setStatus] = React.useState({
        password: "",
        isLoading: false,
        isPasswordVisible: false
    } as ResetPasswordStatus)

    const onChangeText = (key: string, value: string | boolean) => {
        console.log(value)
        setStatus(prev => ({ ...prev, [key]: value }));
    }

    const onResetPassword = async () => {
        try {
            if (!status.password) {
                return toastMessage("error", 'Please enter your password');
            }
            const data = { email: state.verifyEmail, password: status.password };
            const res = await restApi.resetPassword(data);
            if (res.message === 'success') {
                toastMessage("success", 'Password was changed successfully');
                Keyboard.dismiss();
                navigation.navigate(routerConfig.loginPage.name);
            }
        } catch (error: any) {
            apiNotification(error, "receiveCodePage Failed!");
        }
    }

    return (
        <ResetPasswordWrapper>
            <KeyboardAwareScrollView>
                <TextH2 style={{ fontSize: w(6), fontWeight: '700' }}>{t("resetPassword.heading")}</TextH2>
                <View>
                    <Text style={{ fontSize: w(4), fontWeight: 400, paddingTop: h(1), color: 'black' }}>{t("resetPassword.subHeading")}</Text>
                </View>
                <Form>
                    <Input
                        icon={IMAGE.eye}
                        value={status.password}
                        placeholder={t('login.passwordPlaceholder')}
                        inputProps={{
                            secureTextEntry: status.isPasswordVisible
                        }}
                        onPressIcon={() => onChangeText("isPasswordVisible", !status.isPasswordVisible)}
                        onChangeText={(e: any) => onChangeText('password', e)}
                    />
                    <Button
                        btnProps={{
                            style: { marginTop: h(1) }
                        }}
                        loading={status.isLoading}
                        onPress={onResetPassword}
                    >
                        <TextH2 style={{ fontSize: w(4.5), fontWeight: '700' }}>{t('resetPassword.resetPassword')}</TextH2>
                    </Button>
                </Form>
            </KeyboardAwareScrollView>
        </ResetPasswordWrapper>
    )
}

const ResetPasswordWrapper = styled(View)(({ theme }) => ({
    flex: 1,
    paddingTop: h(21),
    paddingLeft: w(4),
    paddingRight: w(4),
    backgroundColor: "#EEECEA"
}));

const Form = styled(View)(({ theme }) => ({
    paddingTop: h(4),
    display: "flex",
    gap: h(2)
}));

export { ResetPassword }