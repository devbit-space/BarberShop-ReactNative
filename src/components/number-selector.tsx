import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useI18n } from 'react-simple-i18n';

import { h, w } from '../theme/services';
import { TextH3 } from './typography';
import { useGlobalContext } from '../provider';
import { IMAGE } from "../assets/image";

const NumberSelector = () => {
    const { t } = useI18n();
    const [state] = useGlobalContext();
    return (
        <NumberSlectorWrapper style={styles.wrapper} lang={state.lang}>
            <StyledText>Select</StyledText>
            <StyledPlus>+</StyledPlus>
        </NumberSlectorWrapper>

    );
};

const NumberSlectorWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    backgroundColor: theme.white,
    borderRadius: 15,
    paddingLeft: w(2),
    paddingRight: w(2),
    display: 'flex',
    flexDirection: lang === "en" ? "row" : 'row-reverse',
    alignItems: 'center',
    gap: w(1)
}))

const StyledText = styled(Text)(({ theme }) => ({
    fontSize: w(3.5),
    color: '#8C867B'
}))

const StyledPlus = styled(Text)(({ theme }) => ({
    fontSize: w(5),
    color: '#8C867B'
}));

const styles = StyleSheet.create({
    wrapper: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: w(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})

export default NumberSelector;
