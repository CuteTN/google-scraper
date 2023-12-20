import React from "react";
import { AppI18nProvider } from "./common/i18n/I18nProvider.context";
import { AppThemeProvider } from "./common/themes/Theme.context";
import { Navbar } from "./components/Navbar.component";
import { AppRouter } from "./common/routers/routers";
import { allLanguages } from "./common/i18n/messages/messages.constants";
import { themeOptions } from "./common/themes/themes/themes.constants";

export function App() {
  return (
    <AppI18nProvider allLanguages={allLanguages}>
      <AppThemeProvider themes={themeOptions}>
        <Navbar />
        <AppRouter />
      </AppThemeProvider>
    </AppI18nProvider>
  );
}
