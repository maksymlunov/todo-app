import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6E579F" },
    secondary: { main: "#493F5E" },
    background: {
      default: "#111113",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B7B6BA",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});
