import React from "react";
import { SafeAreaView, Text, StyleSheet, Image, View, Platform, Keyboard } from 'react-native';
import { useI18n } from "react-simple-i18n";
import styled, { useTheme } from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { h, w } from "../../theme/services";
import { IMAGE } from "../../assets/image";

import {TextH2, TextH3} from "../../components/typography";
import { useGlobalContext } from "../../provider";
import { apiNotification } from "../../services";
import { routerConfig } from "../../routerConfig";
import { restApi } from "../../provider/restApi";

interface VerifyCodeStatus {
    isLoading: boolean;
    code: string,
    isRightCode: boolean
}

const CELL_COUNT = 6;

const VerifyCode = ({ navigation }: { navigation: any }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [state, { dispatch, setStore }]: GlobalContextType = useGlobalContext()

    const [status, setStatus] = React.useState({
        code: "",
        isLoading: false,
        isRightCode: false,
    } as VerifyCodeStatus)

    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const onSend = async (text: string) => {
        setValue(text)
        setStatus({ ...status, code: text })
        try {
            if (text.length === CELL_COUNT) {
                const res = await restApi.verifyCode({ email: state.verifyEmail, code: text });
                if (res.message === "success") {
                    setStatus({ ...status, isRightCode: true })
                    Keyboard.dismiss();
                    navigation.navigate(routerConfig.resetPasswordPage.name)
                } else {
                    setStatus({ ...status, isRightCode: false })
                    return
                }
            }
        } catch (error: any) {
            apiNotification(error, "receiveCodePage Failed!");
        }
    }

    return (
        <VerifyCodeWrapper>
            <KeyboardAwareScrollView>
                <View>
                    <View style={{display: 'flex', flexDirection: state.lang === 'en' ? "row" : 'row-reverse'}}>
                        <Image style={{ width: w(11), height: w(11) }} source={IMAGE.tick} />
                    </View>
                    <TextH2 style={{ fontSize: w(6), fontWeight: '700', paddingTop: h(3) }}>{t("resetPassword.emailTitle")}</TextH2>
                    <TextH3 style={{ fontSize: w(4), fontWeight: '400', paddingTop: h(2) }}>{t("resetPassword.emailSubTitle")}</TextH3>
                </View>

                <SafeAreaView style={styles.root}>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={onSend}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete={(Platform as any).select({ android: 'sms-otp', default: 'one-time-code' })}
                        testID="my-code-input"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell,

                                { borderColor: (status.code.length === 6 && !status.isRightCode) ? theme.error : (status.code.length === 6 && status.isRightCode ? theme.success : '#C7C9D9')}
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </VerifyCodeWrapper>
    )
}

const VerifyCodeWrapper = styled(View)(({ theme }) => ({
    flex: 1,
    paddingTop: h(26),
    paddingLeft: w(4),
    paddingRight: w(4),
    backgroundColor: "#EEECEA"
}));

const styles = StyleSheet.create({
    root: { 
        flex: 1, 
    },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: w(12),
        height: w(12),
        fontSize: w(8),
        borderWidth: 1.2,
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    focusCell: {
        borderColor: '#8F90A6',
    },
});

export { VerifyCode }