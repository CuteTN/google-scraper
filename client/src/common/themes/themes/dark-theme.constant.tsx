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
        main: pink[500],
        dark: pink[600],
      },
      secondary: {
        main: pink[400],
        dark: pink[500],
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