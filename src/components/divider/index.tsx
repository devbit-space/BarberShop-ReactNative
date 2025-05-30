import { View } from "react-native";
import styled from "styled-components/native";

const Divider = styled(View)(({ theme }) => ({
	height: 1,
	opacity: 0.25,
	backgroundColor: theme.typographyFourthColor
}))

export { Divider };