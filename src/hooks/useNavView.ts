import { useContext } from "react";
import { NavViewContext } from "@/context/NavViewContext";

export const useNavView = () => {
  const context = useContext(NavViewContext);
  if (!context) {
    throw new Error("useNavView must be used within a NavViewProvider");
  }
  return context;
};
