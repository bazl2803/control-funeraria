import React from "react";
import { HashRouter as Router } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense>
        <Router>{children}</Router>
      </React.Suspense>
    </ThemeProvider>
  );
}
