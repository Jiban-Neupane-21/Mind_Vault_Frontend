import { createContext } from "react";
import type { ActiveView } from "@/types/nav";

export interface NavViewContextType {
  activeView: ActiveView;
  toggleView: () => void;
  setActiveView: (view: ActiveView) => void;
}

export const NavViewContext = createContext<NavViewContextType | undefined>(
  undefined,
);
