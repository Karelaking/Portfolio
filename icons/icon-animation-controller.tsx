"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface IconAnimationContextType {
  navbarInView: boolean;
  setNavbarInView: (value: boolean) => void; // eslint-disable-line no-unused-vars
  hoveredIcon: string | null;
  setHoveredIcon: (value: string | null) => void; // eslint-disable-line no-unused-vars
  triggerViewportAnimation: () => void;
}

const IconAnimationContext = createContext<IconAnimationContextType | undefined>(undefined);

export function useIconAnimation() {
  const context = useContext(IconAnimationContext);
  if (!context) {
    throw new Error("useIconAnimation must be used within IconAnimationProvider");
  }
  return context;
}

interface IconAnimationProviderProps {
  children: ReactNode;
}

export function IconAnimationProvider({ children }: IconAnimationProviderProps) {
  const [navbarInView, setNavbarInView] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const triggerViewportAnimation = useCallback(() => {
    setNavbarInView(true);
  }, []);

  return (
    <IconAnimationContext.Provider
      value={{
        navbarInView,
        setNavbarInView,
        hoveredIcon,
        setHoveredIcon,
        triggerViewportAnimation,
      }}
    >
      {children}
    </IconAnimationContext.Provider>
  );
}