import React from "react";
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
declare module 'styled-components/native' {
  export interface DefaultTheme {
    white: string;
    black: string;
    success: string
    error: string

    mainBackground: string
    borderColor: string
    globalSpacingX: number

    typographyFirstColor: string
    typographyThirdColor: string
    typographySecondColor: string
    typographyFourthColor: string
    typographyFifthColor: string
    typographySixthColor: string

    textItemBackground: string
    textInputBackground: string
    textInputBorderColor: string
    textInputPlaceholderColor: string

    firstButtonBackground: string
    secondButtonBackground: string
    thirdButtonBackground: string

    baseModalHideBackground: string

    buttonBorderColor: string
  }
}

const StyledThemeProvider = ({ children }: any) => {
  const theme: DefaultTheme = {
    white: '#ffffff',
    black: '#000000',
    success: '#22eb10',
    error: '#eb1010',

    mainBackground: "#EEECEA",
    borderColor: "#D3CDC1",
    globalSpacingX: 15,

    typographyFirstColor: "#333",
    typographySecondColor: "#1C1C28",
    typographyThirdColor: '#d3cdc1',
    typographyFourthColor: "#8F90A6",
    typographyFifthColor: "#555770",
    typographySixthColor: "#FF3B3B",

    textItemBackground: "#E4E4EB",
    textInputBackground: '#EBEBF0',
    textInputBorderColor: '#8F90A6',
    textInputPlaceholderColor: "#8F90A6",

    firstButtonBackground: '#1C1C28',
    secondButtonBackground: '#FF3B3B',
    thirdButtonBackground: '#555770',

    baseModalHideBackground: "#00000080",

    buttonBorderColor: "#C7C9D9",
  };

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export { StyledThemeProvider };