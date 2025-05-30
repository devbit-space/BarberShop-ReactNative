import { Text } from "react-native";
import styled from "styled-components/native";
import { w } from "../../theme/services";

const TextH1 = styled(Text)(({ theme }) => ({
	fontSize: w(6.5),
	fontWeight: '700',
	color: theme.typographyFirstColor,
}));

const TextH2 = styled(Text)(({ theme }) => ({
	fontSize: w(3.5),
	fontWeight: '400',
    letterSpacing: .5,
	color: theme.typographyFirstColor,
}));

const TextH3 = styled(Text)(({ theme }) => ({
	fontSize: w(3),
	fontWeight: 400,
	color: theme.typographyFirstColor,
}));

const TextH4 = styled(Text)(({ theme }) => ({
	fontSize: 16,
	fontWeight: 400,
	color: theme.black,
}))

const TextH5 = styled(Text)(({ theme }) => ({
	fontSize: w(4.5),
	fontWeight: 400,
	color: theme.black,
}))

const TextH6 = styled(Text)(({ theme }) => ({
	fontSize: w(4),
	fontWeight: 400,
	color: theme.black,
}))

const TextBody = styled(Text)(({ theme }) => ({
	fontSize: 9,
	fontWeight: 400,
	color: theme.black,
}))

const TextSM = styled(Text)(({ theme }) => ({
	fontSize: w(2.7),
	fontWeight: '400',
	color: theme.black,
}))

export { TextH6, TextH5, TextH4, TextH3, TextH2, TextH1, TextBody, TextSM }