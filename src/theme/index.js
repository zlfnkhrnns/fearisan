import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4C27D7",
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: "#FFAC31",
      contrastText: '#FFFFFF',
    },
    background: {
      paper: '#fff',
      default: "#fff"
    },
  },
});

export default function ThemeProvider(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}