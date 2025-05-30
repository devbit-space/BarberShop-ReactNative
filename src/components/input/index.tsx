import { TextInput } from "react-native";
import styled from "styled-components/native";
import { h, w } from "../../theme/services";

const CustomTextInput = styled(TextInput)<{ lang?: string }>(({ theme, lang }) => ({
	flex: 1,
	// backgroundColor: theme.textInputBackground,
	// border: `1px solid ${theme.textInputBorderColor}`,
	// borderRadius: 20,

	height: h(6.8),
	fontSize: w(3.5),
	fontWeight: 700,
	color: theme.typographyFirstColor,
	textAlign: lang == "he" ? "right" : "left",
}))

export { CustomTextInput };