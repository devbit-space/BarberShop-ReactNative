import { Image, View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import { IMAGE } from "../assets/image";
import { h, w } from "../theme/services";

interface FirstPageProps {
    isShow: boolean
}

const FirstPage = ({ isShow }: FirstPageProps) => {
    return (
        <FirstPageWrapper isShow={isShow}>
            <Image style={styles.imageStyle} source={IMAGE.login_loading} />
        </FirstPageWrapper>
    )
}

const FirstPageWrapper = styled(View)<{ isShow: boolean }>(({ theme, isShow }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.white,
    display: isShow ? "block" : "none",

    top: 0, left: 0,
    position: "fixed",
    zIndex: 500,
}))

const styles = StyleSheet.create({
    imageStyle: {
        width: "100%",
        height: "100%",
    }
})

export { FirstPage };