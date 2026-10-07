"use client";

import { useToday } from "@/lib/use-today";

export function CurrentYear() {
  return <>{useToday()?.year ?? ""}</>;
}
