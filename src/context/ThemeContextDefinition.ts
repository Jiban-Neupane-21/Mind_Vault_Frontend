import { createContext, useContext } from "react";
import type { PaletteMode } from "@mui/material";

export interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorMode = (): ColorModeContextType =>
  useContext(ColorModeContext);
