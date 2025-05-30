import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useI18n } from "react-simple-i18n";
import styled, { useTheme } from 'styled-components/native';

import { useGlobalContext } from "../provider";
import { h, w } from "../theme/services";

interface TabProps {
    status: any,
    setStatus: Function
}

const Tab = (props: TabProps) => {
    const { t } = useI18n();
    const [state] = useGlobalContext();
    const theme = useTheme();

    const {status, setStatus} = props; 

    const tabs = [t('appointments.past'), t('appointments.upcoming'), t('appointments.cancelled')] as string[];

    const [tabIdx, setTabIdx] = React.useState(0)
    const onChangeTab = (k: number, i: string) => {
        setTabIdx(k)
        setStatus({...status, orderStatus: i.toLowerCase()})
    }
    return (
        <TabWrapper lang={state.lang}>
            {tabs.map((i, k) => (
                <TouchableOpacity
                    onPress={() =>onChangeTab(k, i)} key={k}
                    style={[styles.text, {borderBottomColor: '#8C867B', borderBottomWidth: tabIdx === k ? 1 : 0, flex: 1}]}
                >
                    <Text style={styles.text}>{i}</Text>
                </TouchableOpacity>
            ))}
        </TabWrapper>
    )
}

const TabWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    display: 'flex',
    flexDirection: lang === "en" ? 'row' : 'row-reverse',
    justifyContent: 'center',
    gap: w(3),
}))

const styles = StyleSheet.create({
    text: {
        fontWeight: '700',
        fontSize: w(4.5),
        display: "flex",
        alignItems: 'center',
        paddingBottom: h(.5),
        color: '#8C867B'
    }
})

export { Tab }