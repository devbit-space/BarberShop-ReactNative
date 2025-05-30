import React from "react"
import { View, StyleSheet, Text, Pressable, Image } from "react-native"
import { useI18n } from "react-simple-i18n"

import { TextH2, TextH3, TextH4, TextH5, TextH6, TextSM } from "../../../components/typography"
import { h, w } from "../../../theme/services"
import { useGlobalContext } from "../../../provider"
import styled from "styled-components/native"

import { packageImg1 } from "../../../assets/image";
import { timerIcon } from "../../../assets/image";
import NumberSelector from "../../../components/number-selector"
interface BuyingItemProps {
    status?: any
    setStatus?: Function
    i: BuyingItemObject
    onBuying: () => void
}

const BuyingItem = (props: BuyingItemProps) => {
    const [state] = useGlobalContext()
    const { status, setStatus, onBuying, i } = props;
    const { t } = useI18n();

    return (
        <BuyingWrapper lang={state.lang}>

            <ImageContainer lang={state.lang}>
                <Image source={packageImg1} style={{ width: w(19), height: w(19) }} />
                <View style={{ display: "flex", gap: h(.5) }}>
                    <StyledText lang={state.lang} style={styles.title}>{i.title}</StyledText>
                    <StyledText lang={state.lang} style={styles.time}>{i.price}</StyledText>
                    <View style={{display: "flex", flexDirection: state.lang === "en" ? "row" : "row-reverse", alignItems: 'center', gap: w(1)}}>
                        <Image source={timerIcon} style={{ width: w(4), height: w(4) }} />
                        <StyledText lang={state.lang} style={styles.time}>{i.time}</StyledText>
                    </View>
                </View>
            </ImageContainer>

            <NumberSelector />

        </BuyingWrapper>
    )
}

const BuyingWrapper = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    paddingTop: h(1.5),
    paddingBottom: h(2.5),
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    justifyContent: 'space-between',
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor
}));

const ImageContainer = styled(View)<{ lang: string }>(({ theme, lang }) => ({
    display: "flex",
    flexDirection: lang === "en" ? "row" : "row-reverse",
    alignItems: "center",
    justifyContent: 'space-between',
    gap: w(4),
}));

const StyledText = styled(TextH5)<{ lang: string }>(({ theme, lang }) => ({
    textAlign: lang === "en" ? "left" : "right"
}));

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: w(3.8)
    },
    time: {
        fontSize: w(3.3),
        fontWeight: '400',
        color: "#8F90A6"
    },
    reorderContent: {
        marginTop: h(3),
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    reorderText: {
        fontSize: w(3.3),
        fontWeight: '600',
        paddingHorizontal: w(2)
    },
    reorderBtn: {
        paddingHorizontal: w(6),
        paddingVertical: h(1.5),
        borderColor: "#8C867B",
        borderWidth: 1,
        borderRadius: w(100)
    },
    cancel: {
        fontSize: w(3.5),
        fontWeight: '600',
        color: "#FF3B3B"
    }
})

export { BuyingItem }