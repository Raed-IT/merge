"use client";

import React from "react";
import ThemeContextProvider from "./ThemeContext";
import ThemeWrapper from "./ThemeWrapper";

export default function ThemeProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeContextProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeContextProvider>
  );
}