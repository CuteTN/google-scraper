import { ThemeOptions } from "@mui/material/styles";

export const commonThemeOptions: ThemeOptions = {
  typography: () => {
    return {
      fontFamily: [
        '"Segoe UI"',
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      button: {
        textTransform: "none",
      }
    };
  },
};
