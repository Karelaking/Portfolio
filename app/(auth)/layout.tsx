import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const layout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return <div>{children}</div>;
};

export default layout;
