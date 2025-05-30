import { Pressable } from "react-native";
import styled from "styled-components/native";

const BaseButton = styled(Pressable)(({ theme }) => ({
	backgroundColor: theme.white,
	border: `1px solid ${theme.buttonBorderColor}`,
	borderRadius: 20,
	padding: "8px 15px",
	alignItems: 'center',
}))

export { BaseButton };