"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export function useToday() {
  const key = useSyncExternalStore(subscribe, todayKey, () => null);
  if (!key) return null;
  const [y, m, d] = key.split("-").map(Number);
  return { year: y, month: m, day: d };
}
