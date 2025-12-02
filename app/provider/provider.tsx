import ThemeProvider from "@/components/theme-provider";
import React, { Fragment } from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Fragment>
  );
};
