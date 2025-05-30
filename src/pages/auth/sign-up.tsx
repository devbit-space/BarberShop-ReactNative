import React, { useState } from 'react';
import { View, ImageBackground, StatusBar, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled, { useTheme } from 'styled-components/native';
import { useI18n } from 'react-simple-i18n';
import moment from 'moment';

import { useGlobalContext } from '../../provider';
import { h, w } from '../../theme/services';
import { TextH1, TextH2, TextH6 } from '../../components/typography';
import { IMAGE } from '../../assets/image';
import Input from '../../components/input';
import Button from '../../components/button';
import DatePicker from '../../components/date-picker';
import Select from '../../components/select';
import { restApi } from '../../provider/restApi';
import { apiNotification } from '../../services';
import { formatPhoneNumber, toastMessage } from '../../services/utils';
import { routerConfig } from '../../routerConfig';
import LinkButton from '../../components/link-button';
import StyledNumber from '../../components/input/number';

export interface SignUpStatus {
    firstName: string
    lastName: string
    email: string
    birthday: string
    gender: string
    referBy: string
    password: string
    phoneNumber: string
    isLoading: boolean
    confirmPassword: string
    anniversaryDate: string
    isPasswordVisible: boolean
    isConfPasswordVisible: boolean
    tabIdx: number
}

const initStatus: SignUpStatus = {
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    gender: "",
    referBy: "",
    password: "",
    phoneNumber: "+972",
    isLoading: false,
    confirmPassword: "",
    anniversaryDate: "",
    isPasswordVisible: true,
    isConfPasswordVisible: true,
    tabIdx: 0
}

const SignUp = ({ navigation }: { navigation: any }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [state, { dispatch, setStore }]: GlobalContextType = useGlobalContext();

    const [status, setStatus] = useState<SignUpStatus>(initStatus)
    const onChangeText = (key: string, value: string | boolean) => {
        setStatus(prev => ({ ...prev, [key]: value }));
    }

    const onChangeDate = (date: Date, key: string) => {
        setStatus({ ...status, [key]: moment(date).format('DD.MM.YYYY') })
    }

    const onChangePhoneNumber = (input: any) => {
        const phoneNumber = formatPhoneNumber(input);

        if (phoneNumber) {
            setStatus({ ...status, phoneNumber: phoneNumber })
        }
    }

    const onSelect = (value: string) => {
        setStatus({ ...status, gender: value })
    }

    const onSignUp = async () => {
        try {
            if (status.tabIdx === 0) {
                if (!status.firstName) {
                    return toastMessage("error", 'Please enter your First Name');
                } else if (!status.lastName) {
                    return toastMessage("error", 'Please enter your Last Name');
                } else if (!status.email) {
                    return toastMessage("error", 'Please enter your email');
                } else if (!status.email.match(
                    // eslint-disable-next-line
                    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
                )) {
                    return toastMessage("error", 'Invalid email type!');
                } else if (!status.password) {
                    return toastMessage("error", 'Please enter your password');
                } else if (!status.confirmPassword) {
                    return toastMessage("error", 'Please enter your Confirm Password');
                } else if (status.password && status.password !== status.confirmPassword) {
                    return toastMessage("error", 'Password does not match');
                }
                Keyboard.dismiss();
                return setStatus({ ...status, tabIdx: 1 })
            } else {
                if (!status.phoneNumber) {
                    return toastMessage("error", 'Please enter a phone number');
                } else if (!status.birthday) {
                    return toastMessage("error", 'Please enter birthday');
                } else if (!status.anniversaryDate) {
                    return toastMessage("error", 'Please enter anniversary date');
                } else if (!status.gender) {
                    return toastMessage("error", 'Please enter gender');
                }
            }

            // dispatch({ type: "showLoadingPage", payload: true });

            const res = await restApi.register({
                firstName: status.firstName,
                lastName: status.lastName,
                email: status.email,
                password: status.password,
                confirmPassword: status.confirmPassword,
                phoneNumber: status.phoneNumber,
                birthday: status.birthday,
                anniversaryDay: status.anniversaryDate,
                gender: status.gender,
                referBy: status.referBy,
            })

            if (res.message === "success") {
                setStatus(initStatus);
                toastMessage("success", "User created successfully!");
                Keyboard.dismiss();

                setStore(res.token);
                dispatch({ type: "authToken", payload: res.token });
                dispatch({ type: "userData", payload: res.data });

                // setTimeout(() => {
                //     // dispatch({ type: "showLoadingPage", payload: false });
                //     navigation.navigate(routerConfig.mainScreenPage.name)
                // }, 200);
            }
        } catch (err: any) {
            apiNotification(err, "Signup Failed!");
        }
    }
    return (
        <SignUpWrapper>
            <KeyboardAwareScrollView>

                <StatusBar backgroundColor={theme.primary} barStyle={'dark-content'} />
                <StyledImageBackground
                    source={IMAGE.signUp_Bg}
                >
                    <TextH1 style={{ paddingBottom: h(.5), color: "white", fontSize: w(9) }}>{t("signUp.title")}</TextH1>
                    <SubTitleContent lang={state.lang}>
                        <TextH6 style={{ color: "white", fontSize: w(4) }}>{t("signUp.subTitle")}</TextH6>
                        <LinkButton style={{ color: "white" }} onPress={() => navigation.navigate(routerConfig.loginPage.name)}>{t("signUp.subTitleLink")}</LinkButton>
                    </SubTitleContent>

                </StyledImageBackground>

                <StyledView>
                    <Tab lang={state.lang}>
                        {["", ""].map((i, k) => (
                            <TabItem key={k} tabIdx={status.tabIdx} idx={k} lang={state.lang}></TabItem>
                        ))}
                    </Tab>

                    {
                        status.tabIdx === 0 ? (
                            <Form>
                                <Input
                                    title={t('signUp.fName')}
                                    placeholder={t('signUp.fNamePlaceholder')}
                                    value={status.firstName}
                                    onChangeText={(e: any) => onChangeText('firstName', e)}
                                />
                                <Input
                                    title={t('signUp.lName')}
                                    placeholder={t('signUp.lNamePlaceholder')}
                                    value={status.lastName}
                                    onChangeText={(e: any) => onChangeText('lastName', e)}
                                />
                                <Input
                                    title={t('login.email')}
                                    placeholder={t('login.emailPlaceholder')}
                                    value={status.email}
                                    onChangeText={(e: any) => onChangeText('email', e)}
                                />
                                <Input
                                    icon={IMAGE.eye}
                                    title={t('login.password')}
                                    value={status.password}
                                    onChangeText={(e: any) => onChangeText('password', e)}
                                    placeholder={t('signUp.passwordConfirmPlaceholder')}
                                    inputProps={{
                                        secureTextEntry: status.isPasswordVisible
                                    }}
                                    onPressIcon={() => onChangeText("isPasswordVisible", !status.isPasswordVisible)}
                                />
                                <Input
                                    icon={IMAGE.eye}
                                    title={t('signUp.passwordConfirm')}
                                    value={status.confirmPassword}
                                    placeholder={t('signUp.passwordConfirmPlaceholder')}
                                    onChangeText={(e: any) => onChangeText('confirmPassword', e)}
                                    inputProps={{
                                        secureTextEntry: status.isConfPasswordVisible
                                    }}
                                    onPressIcon={() => onChangeText("isConfPasswordVisible", !status.isConfPasswordVisible)}
                                />
                                <Button
                                    btnProps={{
                                        style: { marginTop: h(5.5) }
                                    }}
                                    loading={status.isLoading}
                                    onPress={onSignUp}
                                >
                                    <TextH2 style={{ fontSize: w(4.5), fontWeight: '900' }}>{status.tabIdx === 0 ? t('signUp.continue') : t('signUp.title')}</TextH2>
                                </Button>
                            </Form>
                        ) : (
                            <Form>
                                <StyledNumber
                                    title={t('signUp.phoneNumber')}
                                    placeholder={t('signUp.phoneNumberPlaceholder')}
                                    value={status.phoneNumber}
                                    onChangeText={(e: any) => onChangePhoneNumber(e)}
                                />
                                <DatePicker
                                    icon={IMAGE.calender}
                                    title={t('signUp.dateOfBirth')}
                                    placeholder={t('signUp.dateOfBirthPlaceholder')}
                                    k="birthday"
                                    value={status.birthday}
                                    onChangeDate={onChangeDate}
                                />
                                <DatePicker
                                    icon={IMAGE.calender}
                                    title={t('signUp.anniversaryDay')}
                                    placeholder={t('signUp.anniversaryDayPlaceholder')}
                                    value={status.anniversaryDate}
                                    k="anniversaryDate"
                                    onChangeDate={onChangeDate}
                                />
                                <Select
                                    title={t('signUp.gender')}
                                    value={status.gender}
                                    values={[
                                        { label: t("signUp.male"), value: t("signUp.male") },
                                        { label: t("signUp.female"), value: t("signUp.female") },
                                        { label: t("signUp.other"), value: t("signUp.other") }
                                    ]}
                                    onSelect={onSelect}
                                />

                                <Input
                                    title={t('signUp.referBy')}
                                    value={status.referBy}
                                    placeholder={t('signUp.referByPlaceholder')}
                                    onChangeText={(e: any) => onChangeText('referBy', e)}
                                />
                                <Button
                                    loading={status.isLoading}
                                    btnProps={{
                                        style: { marginTop: h(5.5) }
                                    }}
                                    onPress={onSignUp}
                                >
                                    <TextH2 style={{ fontSize: w(4.5), fontWeight: '900' }}>{status.tabIdx === 0 ? t('signUp.continue') : t('signUp.title')}</TextH2>
                                </Button>
                            </Form>
                        )
                    }
                </StyledView>
            </KeyboardAwareScrollView>

        </SignUpWrapper>
    )
}

const SignUpWrapper = styled(View)(({ theme }) => ({
    flex: 1,
    backgroundColor: "#EEECEA"
}));

const SubTitleContent = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    marginTop: h(.5),
    gap: w(3),
}));

const StyledImageBackground = styled(ImageBackground)(({ theme }) => ({
    paddingTop: h(10),
    paddingBottom: h(5),
    paddingLeft: w(4),
    paddingRight: w(4),
}));

const StyledView = styled(View)(({ theme }) => ({
    paddingTop: h(3),
    paddingLeft: w(4),
    paddingRight: w(4),
}));

const Tab = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    gap: w(1)
}));


const TabItem = styled(View)<{ lang: string, idx: number, tabIdx: number }>(({ theme, lang, idx, tabIdx }) => ({
    backgroundColor: idx === tabIdx ? "#BAB3A7" : '#8C867B',
    width: idx === tabIdx ? w(8) : w(2.5),
    height: w(2.5),
    borderRadius: w(10),
}));

const Form = styled(View)(({ theme }) => ({
    paddingTop: h(4),
    display: "flex",
    gap: h(1)
}));

export { SignUp }