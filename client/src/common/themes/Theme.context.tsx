import React from "react";
import { Theme, createTheme } from "@mui/material/styles";
import { AppThemeOptions } from "./themes/AppTheme.model";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { commonThemeOptions } from "./common-theme.constants";

const LOCAL_STORAGE_THEME_ITEM_KEY = "todo-theme";

const appThemeContext = React.createContext<{
  theme: Theme;
  themes: AppThemeOptions[];
  themeId: string;
  selectTheme: (themeId?: string) => void;
}>(undefined as any);

export function AppThemeProvider({ themes, children }: { themes: AppThemeOptions[]; children: any }) {
  const [selectedThemeId, setSelectedThemeId] = React.useState<string>(
    () => localStorage.getItem(LOCAL_STORAGE_THEME_ITEM_KEY) || themes[0].id
  );

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_ITEM_KEY, selectedThemeId);
  }, [selectedThemeId]);

  const theme = React.useMemo(() => {
    const { themeOptions } = themes.find((theme) => theme.id === selectedThemeId) || themes[0];
    return createTheme(commonThemeOptions, themeOptions);
  }, [selectedThemeId, themes]);

  const selectTheme = React.useCallback(
    (themeId?: string) => {
      if (themes.find((theme) => theme.id === themeId)) {
        setSelectedThemeId(themeId!);
      } else {
        setSelectedThemeId(themes[0].id);
      }
    },
    [setSelectedThemeId, themes]
  );

  const contextValue = React.useMemo(
    () => ({
      themeId: selectedThemeId,
      selectTheme,
      theme,
      themes,
    }),
    [selectedThemeId, selectTheme, theme, themes]
  );

  return (
    <appThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </appThemeContext.Provider>
  );
}

export function useAppTheme() {
  return React.useContext(appThemeContext);
}
