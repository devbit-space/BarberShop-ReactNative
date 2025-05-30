import { Text } from "react-native";
import styled from "styled-components/native";

import { w } from "../theme/services";

const LinkButton = styled(Text)(({ theme }) => ({
	fontSize: w(4),
    fontWeight: '400',
    color: "#8C867B",
}));

export default LinkButton