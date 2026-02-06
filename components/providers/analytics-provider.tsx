"use client";

import type { ReactElement } from "react";
import { Analytics } from "@vercel/analytics/react";

export const AnalyticsProvider = (): ReactElement => {
  return <Analytics />;
};
