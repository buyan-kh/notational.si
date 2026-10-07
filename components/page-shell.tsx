import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TickerBar } from "./ticker-bar";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex-1 overflow-hidden rounded-t-[14px] border-x border-t border-line">
        <TickerBar />
        <main className="mx-auto max-w-[1280px] border-x border-line">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
