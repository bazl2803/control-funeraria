import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.Suspense>
          <Router>{children}</Router>
        </React.Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
