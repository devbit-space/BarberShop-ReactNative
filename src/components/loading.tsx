import { View, Image } from "react-native";
import styled from "styled-components/native";
import { TextH6 } from "./typography";

interface LoadingProps {
	isLoading: boolean
}

const svgCode = `
	<svg viewBox="0 0 256 256">
    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
  </svg>
`

const Loading = ({ isLoading }: LoadingProps) => {

	return (
		<LoadingWrapper loading={isLoading}>
			<LoadingText>Loading...</LoadingText>
		</LoadingWrapper>
	)
}

const LoadingWrapper = styled(View)<{ loading: boolean }>(({ theme, loading }) => ({
	width: "100%",
	height: "100%",
	position: "absolute",
	top: 0, left: 0,
	zIndex: 200,

	display: loading ? "flex" : "none",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.black,
	opacity: 0.6,
}))

const LoadingText = styled(TextH6)(({ theme }) => ({
	color: theme.white,
}))

export { Loading };