"use client";

import { useEffect, useState } from "react";

export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect((): void => {
    setMounted(true);
  }, []);

  return mounted;
};
