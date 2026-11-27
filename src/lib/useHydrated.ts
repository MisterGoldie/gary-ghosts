"use client";

import { useEffect, useState } from "react";

/** True only after the first client render, so wallet/date UI can avoid hydration mismatches. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
