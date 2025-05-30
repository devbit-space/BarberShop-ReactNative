
import { Routers } from "./Router"
import { StyledThemeProvider } from "./theme";
import { GlobalContextProvider } from "./provider";
import { TranslationProvider } from "./translations";

export const App = () => {
	return (
		<GlobalContextProvider>
			<TranslationProvider>
				<StyledThemeProvider>
					<Routers />
				</StyledThemeProvider>
			</TranslationProvider>
		</GlobalContextProvider>
	)
}