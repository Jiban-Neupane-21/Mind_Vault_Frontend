import React, { useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import type { PaletteMode } from "@mui/material/styles";
import { ColorModeContext } from "./ThemeContextDefinition";

// Re-export hook and types so other files can import directly from '@/context/ThemeContext'
export type { ColorModeContextType } from "./ThemeContextDefinition";

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    return savedMode === "dark" || savedMode === "light" ? savedMode : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#2563eb",
                },
                background: {
                  default: "#f8fafc",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#0f172a",
                  secondary: "#475569",
                },
              }
            : {
                primary: {
                  main: "#3b82f6",
                },
                background: {
                  default: "#0f172a",
                  paper: "#1e293b",
                },
                text: {
                  primary: "#f8fafc",
                  secondary: "#94a3b8",
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
