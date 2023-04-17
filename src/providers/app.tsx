import React from "react";
import {HashRouter as Router} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

interface Props {
    children: React.ReactNode;
}

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

export function AppProvider({children}: Props) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <React.Suspense>
                <Router>{children}</Router>
            </React.Suspense>
        </ThemeProvider>
    );
}
