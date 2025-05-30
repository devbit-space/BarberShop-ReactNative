import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { View, TextInput, Keyboard, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';

import { TextSM } from './../typography';
import { h, w } from '../../theme/services';
import { useGlobalContext } from '../../provider';

const DismissKeyboard = ({ children }: { children: React.ReactNode }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>{children}</View>
    </TouchableWithoutFeedback>
);

interface NumberProps {
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
    prevIcon?: number
}

const StyledNumber = (props: NumberProps) => {
    const theme = useTheme();
    const [state]: GlobalContextType = useGlobalContext()
    const { title, onChangeText, value, onPressIcon, onPress, inputProps, icon, disable } = props;

    return (
        <DismissKeyboard>
            {title && <TextSM style={{ paddingBottom: h(.5) }}>{title}</TextSM>}
            <StyledTouchableOpacity lang={state.lang} activeOpacity={1} onPress={onPress}>
                <TextInput
                    {...inputProps}
                    value={value}
                    autoFocus={false}
                    keyboardType='number-pad'
                    autoCorrect={false}
                    editable={disable ? false : true}
                    autoCapitalize="none"
                    onChangeText={onChangeText}
                    textAlign={state.lang === "en" ? 'left' : 'right'}
                    // placeholder={placeholder ? placeholder : ""}
                    placeholderTextColor={theme.black}
                    style={{ flex: 1, fontSize: w(4), paddingVertical: h(0), height: h(5), color: 'black' }}
                />
                {icon && (
                    <TouchableOpacity onPress={onPressIcon}>
                        <Image source={icon} style={{ width: w(5), height: w(5), resizeMode: 'contain' }} />
                    </TouchableOpacity>
                )}
            </StyledTouchableOpacity>
        </DismissKeyboard>
    );
};

const StyledTouchableOpacity = styled(TouchableOpacity)<{ lang: string }>(({ theme, lang }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: lang === "en" ? 'flex-start' : "flex-end",
    color: 'black',
    borderRadius: w(100),
    paddingLeft: w(3),
    paddingRight: w(3),
    backgroundColor: "#EEECEA",
    borderWidth: 1,
    borderColor: '#C7C9D9',
    alignItems: 'center',
    width: "100%",
}))

export default StyledNumber;
