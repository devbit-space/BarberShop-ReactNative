import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import {
    StyleSheet,
    View,
    I18nManager,
    TextInput,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
} from 'react-native';

import { useGlobalContext } from '../provider';
import { TextSM } from './typography';
import { h, w } from '../theme/services';

const DismissKeyboard = ({ children }: { children: React.ReactNode }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>{children}</View>
    </TouchableWithoutFeedback>
);

interface InputProps {
    title?: string
    onChangeText: Function
    value: string
    onPressIcon?: () => void
    onPress?: () => {}
    icon?: number
    inputProps?: any
    placeholder?: string
    isPasswordVisible?: boolean
    disable?: boolean,
    prevIcon?: number,
    backgroundColor? : string
}

const Input = (props: InputProps) => {
    const theme = useTheme();
    const [state]: GlobalContextType = useGlobalContext()
    const { title, onChangeText, value, prevIcon, onPressIcon, onPress, inputProps, icon, placeholder, disable, backgroundColor, } = props
    return (
        <DismissKeyboard>
            {title && <TextSM style={{ paddingBottom: h(.5) }}>{title}</TextSM>}
            <StyledTouchableOpacity
                bgColor={backgroundColor}
                lang={state.lang}
                activeOpacity={1}
                onPress={onPress}>
                {prevIcon && (
                    <PrevIcon lang={state.lang} prevIcon={prevIcon} onPress={onPressIcon}>
                        <Image source={prevIcon} style={{ width: w(5), height: w(5), resizeMode: 'contain' }} />
                    </PrevIcon>
                )}
                <TextInput
                    {...inputProps}
                    value={value}
                    autoFocus={false}
                    autoCorrect={false}
                    editable={disable ? false : true}
                    autoCapitalize="none"
                    onChangeText={onChangeText}
                    textAlign={state.lang === "en" ? 'left' : 'right'}
                    placeholder={placeholder ? placeholder : ""}
                    placeholderTextColor={theme.black}
                    style={{ width: w(75), fontSize: w(4), paddingVertical: h(0), height: h(5), paddingLeft: prevIcon ? w(9) : w(4), paddingRight: w(4), color: 'black' }}
                />
                {icon && (
                    <TouchableOpacity onPress={onPressIcon}>
                        <Image source={icon} style={{ width: w(5.8), height: w(5.8), resizeMode: 'contain' }} />
                    </TouchableOpacity>
                )}
            </StyledTouchableOpacity>
        </DismissKeyboard>
    );
};

const StyledTouchableOpacity = styled(TouchableOpacity)<{ lang: string, bgColor?: string }>(({ theme, lang, bgColor }) => ({
    flexDirection: lang === "en" ? 'row' : "row-reverse",
    color: 'black',
    borderRadius: w(100),
    paddingLeft: lang === "en" ? w(0) : w(3),
    paddingRight: lang === "en" ? w(3) : w(0),
    backgroundColor: bgColor ? bgColor : "#EEECEA",
    borderWidth: .9,
    borderColor: '#C7C9D9',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    position: 'relative'
}));

const PrevIcon =  styled(TouchableOpacity)<{ lang: string, prevIcon: number }>(({ theme, lang, prevIcon }) => ({
    position: 'absolute',
    opacity: .5,
    top: h(1.5),
    left: w(3),
}));

export default Input;
