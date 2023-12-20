import { DarkModeIcon } from "../../../components/Icons.components";
import { AppThemeOptions } from "./AppTheme.model";
import { common, grey, pink, red } from "@mui/material/colors"

export const darkTheme: AppThemeOptions = {
  id: "dark-theme",
  nameGetter: fm => fm("common.darkTheme"),
  iconRenderer: () => <DarkModeIcon />,
  themeOptions: {
    palette: {
      background: {
        default: grey[800],
        paper: grey[700],
      },
      primary: {
        main: pink[200],
        dark: pink[300],
      },
      secondary: {
        main: pink[100],
        dark: pink[200],
      },
      text: {
        primary: common.white,
        secondary: grey[300],
      },
      error: {
        main: red[300]
      }
    }
  }
}