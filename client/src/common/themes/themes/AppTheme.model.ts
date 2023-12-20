import React from "react";
import { ThemeOptions } from "@mui/material/styles"
import { FormatMessageFunction } from "../../i18n/messages/FormatMessage.model";

export type AppThemeOptions = {
  id: string,
  nameGetter: (fm: FormatMessageFunction) => string,
  iconRenderer: () => React.ReactNode;
  themeOptions: ThemeOptions;
}