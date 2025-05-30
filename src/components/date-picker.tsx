import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import {
    View,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
} from 'react-native';

import { useGlobalContext } from '../provider';
import { TextH3 } from './typography';
import { h, w } from '../theme/services';
import DatePicker from 'react-native-date-picker';

const DismissKeyboard = ({ children }: { children: React.ReactNode }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>{children}</View>
    </TouchableWithoutFeedback>
);

interface InputProps {
    title: string
    onChangeDate: (date: Date, k: string) => void;
    value: string
    onPress?: () => {}
    icon?: number
    inputProps?: any
    placeholder?: string
    k: string
}

const StyledDatePicker = (props: InputProps) => {
    const theme = useTheme();
    const [state]: GlobalContextType = useGlobalContext()
    const { title, value, onPress, icon, onChangeDate, placeholder, k } = props
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date())
    return (
        <DismissKeyboard>
            {title && <TextH3 style={{ paddingBottom: h(.5) }}>{title}</TextH3>}
            <StyledTouchableOpacity
                lang={state.lang}
                activeOpacity={1}
                onPress={onPress}>
                <StyledView value={value} lang={state.lang}>
                    <StyledText value={value} onPress={() => setOpen(true)}>{value ? value : placeholder}</StyledText>
                </StyledView>
                {icon && (
                    <Image source={icon} style={{ width: w(5), height: w(5), resizeMode: 'contain' }} />
                )}
            </StyledTouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                dividerColor="white"
                locale={state.lang}
                onConfirm={(date) => {
                    setOpen(false)
                    onChangeDate(date, k)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </DismissKeyboard>
    );
};

const StyledTouchableOpacity = styled(TouchableOpacity)<{ lang: string }>(({ theme, lang }) => ({
    flexDirection: lang === "en" ? 'row' : "row-reverse",
    color: theme.black,
    borderRadius: w(100),
    backgroundColor: "#EEECEA",
    borderColor: '#C7C9D9',
    borderWidth: 1.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: lang === "en" ? w(2) : w(4),
    paddingRight: lang === "en" ? w(4) : w(2),
}))

const StyledView = styled(View)<{ value: string, lang: string }>(({ theme, value, lang }) => ({
    textAlign: 'left',
    display: 'flex',
    flexDirection: lang === "en" ? "row" : 'row-reverse',
    justifyContent: lang === "en" ? 'flex-start' : "start",
    alignItems: lang === "en" ? 'center' : "center",
    height: h(5),
    fontSize: w(4),
    paddingHorizontal: w(3)
}))

const StyledText = styled(Text)<{ value: string }>(({ theme, value }) => ({
    color: theme.black,
    fontSize: w(4)
}))

export default StyledDatePicker;
