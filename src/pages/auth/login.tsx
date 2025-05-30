import React from "react";
import { ImageBackground, View, Keyboard } from "react-native";
import { useI18n } from "react-simple-i18n";
import styled, { useTheme } from 'styled-components/native';

import { h, w } from "../../theme/services";
import { IMAGE } from "../../assets/image";
import { TextH1, TextH2, TextH3 } from "../../components/typography";
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

interface LoginStatus {
    email: string;
    password: string;
    isLoading: boolean;
    isRemember: boolean;
    isPasswordVisible: boolean;
}

const Login = ({ navigation }: { navigation: any }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [state, { dispatch, setStore }]: GlobalContextType = useGlobalContext();

    const [status, setStatus] = React.useState<LoginStatus>({
        email: "",
        password: "",
        isLoading: false,
        isRemember: false,
        isPasswordVisible: true,
    });

    const onChangeText = (key: keyof LoginStatus, value: string | boolean) => {
        setStatus(prev => ({ ...prev, [key]: value }));
    };

    const onLogin = async () => {
        try {
            if (!status.email) {
                return toastMessage("error", 'Please enter your email');
            } else if (!status.password) {
                return toastMessage("error", 'Please enter your password');
            }

            const data = { email: status.email, password: status.password };
            const res = await restApi.login(data);

            dispatch({ type: "showLoadingPage", payload: true });

            if (typeof res?.token !== "string") {
                throw new ValidateError("Login Failed!");
            }
            setStore(status.isRemember ? res.token : "");
            dispatch({ type: "authToken", payload: res.token });
            dispatch({ type: "userData", payload: res.data });
            
            setTimeout(() => {
                dispatch({ type: "showLoadingPage", payload: false });
                navigation.navigate(routerConfig.mainScreenPage.name);
            }, 200);
            Keyboard.dismiss();
        } catch (error: any) {
            apiNotification(error, "Login Failed!");
        }
    };

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <LoginWrapper>
                <StyledImageBackground source={IMAGE.login_bg} />

                <Form>
                    <TextH1>{t("login.title")}</TextH1>
                    <SubTitleContent lang={state.lang}>
                        <TextH2>{t("login.subTitle")}</TextH2>
                        <LinkButton onPress={() => navigation.navigate(routerConfig.signUpPage.name)}>
                            {t("login.signUpLink")}
                        </LinkButton>
                    </SubTitleContent>

                    <Container>
                        <Input
                            title={t('login.email')}
                            placeholder={t('login.emailPlaceholder')}
                            value={status.email}
                            onChangeText={(e: string) => onChangeText('email', e)}
                        />
                        <Input
                            icon={IMAGE.eye}
                            title={t('login.password')}
                            value={status.password}
                            placeholder={t('login.passwordPlaceholder')}
                            inputProps={{ secureTextEntry: status.isPasswordVisible }}
                            onPressIcon={() => onChangeText("isPasswordVisible", !status.isPasswordVisible)}
                            onChangeText={(e: string) => onChangeText('password', e)}
                        />
                        <FormPressable hitSlop={20} onPress={() => onChangeText('isRemember', !status.isRemember)}>
                            <CheckBoxDotView>
                                <CheckBoxDot style={{ backgroundColor: status.isRemember ? theme.black : 'transparent' }} />
                            </CheckBoxDotView>
                            <TextH3 style={{ fontSize: w(3.5) }}>{t('login.RememberMe')}</TextH3>
                        </FormPressable>
                    </Container>

                    <Button btnProps={{ style: { marginTop: h(5) } }} loading={status.isLoading} onPress={onLogin}>
                        <TextH2 style={{ fontSize: w(4.5), fontWeight: '900' }}>{t('login.login')}</TextH2>
                    </Button>
                    <TextH2
                        style={{ textAlign: "center", color: "#BAB3A7", fontSize: w(3.7), fontWeight: 700, paddingTop: h(.7) }}
                        onPress={() => navigation.navigate(routerConfig.sendEmailPage.name)}
                    >
                        {t("login.forgot")}?
                    </TextH2>
                </Form>
            </LoginWrapper>
        </View>
    );
};

const LoginWrapper = styled(View)({
    flex: 1,
    backgroundColor: "#EEECEA"
});

const StyledImageBackground = styled(ImageBackground)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: h(41),
});

const SubTitleContent = styled(View)<{ lang: string }>(({ lang }) => ({
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    gap: w(2.5),
}));

const Form = styled(View)({
    marginTop: h(-10),
    paddingLeft: w(4.5),
    paddingRight: w(4.5),
    paddingTop: h(5.4),
    display: "flex",
    gap: h(.5),
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#EEECEA",
    width: "100%",
    height: h(59),
    borderRadius: 5,
    borderCollapse: 'collapse',
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: 'hidden',
});

const Container = styled(View)({
    paddingTop: h(4.5),
    gap: h(1.3),
});

const CheckBoxDotView = styled(View)({
    height: w(5),
    width: w(5),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
});

const CheckBoxDot = styled(View)({
    height: w(3),
    width: w(3),
    borderRadius: 10,
});

export { Login };
