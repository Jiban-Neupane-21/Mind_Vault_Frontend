import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "@/context/AuthProvider.tsx";
import { CustomThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
