import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useI18n } from 'react-simple-i18n';
import { useGlobalContext } from '../provider';

import { h, w } from '../theme/services';
import { TextH3 } from './typography';

interface SelectProps {
    value: string
    values: Array<{ label: string, value: string }>
    title: string
    onSelect: (v: string) => void;
}

const DropdownComponent = (props: SelectProps) => {
    const { t } = useI18n();
    const [state] = useGlobalContext()

    const { value, values, title, onSelect } = props

    const [isFocus, setIsFocus] = useState(false);
    return (
        <View>
            <TextH3 style={{ paddingBottom: h(.5) }}>{title}</TextH3>
            <View style={styles.container}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    itemTextStyle={{fontSize: w(4), padding: 0}}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={state.lang === "en" ? styles.iconStyle : styles.iconLeftStyle}
                    data={values}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? t("signUp.genderPlaceholder") : ''}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item: any) => {
                        onSelect(item.value)
                        setIsFocus(false);
                    }}
                />
            </View>
        </View>

    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: w(100)
    },
    dropdown: {
        height: h(6),
        backgroundColor: "#EEECEA",
        borderWidth: 1,
        borderColor: '#a7a6a6',
        borderRadius: w(10),
        paddingHorizontal: w(5),
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: w(4)
    },
    placeholderStyle: {
        fontSize: w(4),
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: w(4),
        color: 'black'
    },
    iconStyle: {
        width: (16),
        height: (16),
        position: 'absolute',
        right: 0,
    },
    iconLeftStyle: {
        width: (16),
        height: (16),
        position: 'absolute',
        left: 0,
    }
});