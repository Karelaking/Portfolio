"use client";

import type { ThemeProviderProps } from "next-themes";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export interface AppThemeProviderProps extends ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({
  children,
  ...props
}: AppThemeProviderProps): ReactElement => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
