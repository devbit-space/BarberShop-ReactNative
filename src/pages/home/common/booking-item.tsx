import React from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import { useI18n } from "react-simple-i18n"

import { TextH2, TextH3, TextH4, TextH5, TextH6, TextSM } from "../../../components/typography"
import { h, w } from "../../../theme/services"
import { useGlobalContext } from "../../../provider"
import styled from "styled-components/native"

interface BookingItemProps {
    status: any
    setStatus: Function
    i: AppointmentsObject
    onBooking: () => void
}

const BookingItem = (props: BookingItemProps) => {
    const [state] = useGlobalContext()
    const { status, setStatus, onBooking, i } = props;
    const { t } = useI18n();

    return (
        <View style={styles.bookingWrapper}>
            <StyledText lang={state.lang} style={styles.title}>{i.title}</StyledText>
            <StyledText lang={state.lang} style={styles.desc}>{i.desc}</StyledText>
            <View style={{ display: "flex", flexDirection: state.lang === "en" ? "row" : "row-reverse", gap: w(2) }}>
                <StyledText lang={state.lang} style={styles.dateTime}>{i.dateTime}</StyledText>
                <StyledText lang={state.lang} style={styles.dateTime}>{i.price}</StyledText>
            </View>
            {state.lang === "en" ? (
                <View style={[styles.reorderContent, {justifyContent: status.orderStatus === "upcoming" ? "space-between" : "flex-end"}]}>
                {status.orderStatus === "upcoming" && (
                    <Pressable onPress={() => setStatus({ ...status, isCancelBooking: true })}>
                        <StyledText lang={state.lang} style={styles.cancel}>{t('appointments.cancelBooking')}</StyledText>
                    </Pressable>
                )}
                <Pressable style={styles.reorderBtn} onPress={onBooking}>
                    <StyledText lang={state.lang} style={styles.reorderText}>{status.orderStatus === "past" ? t('appointments.reorder') : t('appointments.reschedule')}</StyledText>
                </Pressable>
            </View>
            ) : (
                <View style={[styles.reorderContent, {justifyContent: status.orderStatus !== "upcoming" ? "space-between" : "flex-end"}]}>
               
                <Pressable style={styles.reorderBtn} onPress={onBooking}>
                    <StyledText lang={state.lang} style={styles.reorderText}>{status.orderStatus === "past" ? t('appointments.reorder') : t('appointments.reschedule')}</StyledText>
                </Pressable>
                {status.orderStatus === t('appointments.upcoming') && (
                    <Pressable onPress={() => setStatus({ ...status, isCancelBooking: true })}>
                        <StyledText lang={state.lang} style={styles.cancel}>{t('appointments.cancelBooking')}</StyledText>
                    </Pressable>
                )}
            </View>
            )}
        </View>
    )
}

const StyledText = styled(TextH5)<{lang: string}>(({ theme, lang }) => ({
    textAlign: lang === "en" ? "left" : "right"
}));

const styles = StyleSheet.create({
    bookingWrapper: {
        paddingTop: h(1.5),
        paddingBottom: h(2.5),
    },
    title: {
        fontWeight: '600',
    },
    desc: {
        fontWeight: '300',
        fontSize: w(3.5),
        color: "#8F90A6"
    },
    dateTime: {
        fontSize: w(4),
        fontWeight: '300',
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

export { BookingItem }