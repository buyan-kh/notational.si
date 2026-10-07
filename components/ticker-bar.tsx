"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Close } from "./icons";

const items = [
  { tag: "Now licensing", text: "First listings are open", href: "/business" },
  { tag: "Referrals", text: "Refer a company and earn another $10K", href: "/refer" },
];

export function TickerBar() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const item = items[index];
  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);
  const isMail = item.href.startsWith("mailto:");

  const content = (
    <>
      <span className="mono-label text-th-950/80">{item.tag}</span>
      <span className="font-serif text-[15px] text-ink">{item.text}</span>
      <span className="grid size-5 place-items-center rounded-[3px] bg-black/[.07] text-ink/70">
        <ArrowUpRight size={11} />
      </span>
    </>
  );

  return (
    <div className="flex h-[42px] items-stretch border-b border-line bg-ticker">
      <div className="mx-auto flex w-full max-w-[1280px] items-stretch border-x border-line">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous announcement"
          className="grid w-10 place-items-center border-r border-line text-ink/50 hover:text-ink"
        >
          <ChevronLeft size={13} />
        </button>
        {isMail ? (
          <a href={item.href} className="flex flex-1 items-center justify-center gap-3 truncate px-3">
            {content}
          </a>
        ) : (
          <Link href={item.href} className="flex flex-1 items-center justify-center gap-3 truncate px-3">
            {content}
          </Link>
        )}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next announcement"
          className="grid w-10 place-items-center border-l border-line text-ink/50 hover:text-ink"
        >
          <ChevronRight size={13} />
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className="grid w-10 place-items-center border-l border-line text-ink/50 hover:text-ink"
        >
          <Close size={13} />
        </button>
      </div>
    </div>
  );
}
