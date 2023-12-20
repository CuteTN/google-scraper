import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Select } from "./Select.component";
import { useAppTheme } from "../common/themes/Theme.context"; 
import { useAppI18n } from "../common/i18n/I18nProvider.context"; 
import { AppThemeOptions } from "../common/themes/themes/AppTheme.model"; 

export function Navbar() {
  const { fm, allLanguages, languageId, selectLanguage } = useAppI18n();
  const { themeId, selectTheme, themes } = useAppTheme();

  const languageOptions = React.useMemo(() => {
    return Object.entries(allLanguages).map(([key, value]) => ({
      id: key,
      name: value.languageName,
      imgSrc: value.languageImgSrc,
    }));
  }, [allLanguages]);

  const themeItemRenderer = React.useCallback(
    (theme: AppThemeOptions) => {
      return (
        <div className="flex items-center">
          {theme.iconRenderer()}
          <span className="ml-2">{theme.nameGetter(fm)}</span>
        </div>
      );
    },
    [fm]
  );

  const languageItemRenderer = React.useCallback((language: { name: string; imgSrc: string }) => {
    return (
      <div className="flex items-center">
        <img className="h-4" alt={language.name} src={language.imgSrc} />
        <span className="ml-2">{language.name}</span>
      </div>
    );
  }, []);

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex mt-2 gap-1 flex-nowrap">
        <Typography className="flex-1 self-center sm:text-sm whitespace-nowrap text-ellipsis" component="div" variant="h6">
          🐏 Quan Tien Nghia - Google Scraper
        </Typography>

        <Select
          label={fm("common.theme")}
          className="w-56"
          options={themes}
          value={themeId}
          valueExtractor={(theme) => theme.id}
          itemRenderer={themeItemRenderer}
          onChange={selectTheme}
        />

        <Select
          label={fm("common.language")}
          className="w-40 ml-2"
          options={languageOptions}
          value={languageId}
          valueExtractor={(language) => language.id}
          itemRenderer={languageItemRenderer}
          onChange={selectLanguage}
        />
      </Toolbar>
    </AppBar>
  );
}
