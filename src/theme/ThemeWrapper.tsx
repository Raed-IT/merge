
import { ThemeProvider } from "@mui/material/styles";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";

export default function ComponentWrapper({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const { theme } = useContext(ThemeContext)!;
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>;
}