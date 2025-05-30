import React from "react";
import { createI18n, I18nProvider } from 'react-simple-i18n';

import en from './languages/en';
import he from './languages/he';
import { useGlobalContext } from "../provider";

const langData = {
	en: en,
	he: he,
}

const TranslationProvider = ({ children }: any) => {
	const [{ lang }] = useGlobalContext();

	return (
		<I18nProvider i18n={createI18n(langData, { lang: lang })}>
			{children}
		</I18nProvider>
	)
}

export { TranslationProvider };