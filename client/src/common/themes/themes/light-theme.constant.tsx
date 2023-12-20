import { LightModeIcon } from "../../../components/Icons.components";
import { AppThemeOptions } from "./AppTheme.model";
import { pink, grey, common, red } from "@mui/material/colors";

export const lightTheme: AppThemeOptions = {
  id: "light-theme",
  nameGetter: (fm) => fm("common.lightTheme"),
  iconRenderer: () => <LightModeIcon />,
  themeOptions: {
    palette: {
      background: {
        default: common.white,
        paper: grey[100],
      },
      primary: {
        main: pink[200],
        dark: pink[300],
      },
      secondary: {
        main: pink[400],
        dark: pink[500],
      },
      text: {
        primary: common.black,
        secondary: grey[600],
      },
      error: {
        main: red[500],
      }
    },
  },
};
