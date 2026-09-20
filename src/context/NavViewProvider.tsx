"use client";

import React, { useState } from "react";
import type { ActiveView } from "@/types/nav";
import { NavViewContext } from "./NavViewContext";

export const NavViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    const savedView =
      typeof window !== "undefined"
        ? (localStorage.getItem("app_active_view") as ActiveView | null)
        : null;
    return savedView === "Admin" || savedView === "User" ? savedView : "User";
  });

  const toggleView = () => {
    setActiveView((prev) => {
      const nextView = prev === "Admin" ? "User" : "Admin";
      if (typeof window !== "undefined") {
        localStorage.setItem("app_active_view", nextView);
      }
      return nextView;
    });
  };

  const handleSetActiveView = (view: ActiveView) => {
    setActiveView(view);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_active_view", view);
    }
  };

  return (
    <NavViewContext.Provider
      value={{ activeView, toggleView, setActiveView: handleSetActiveView }}
    >
      {children}
    </NavViewContext.Provider>
  );
};
