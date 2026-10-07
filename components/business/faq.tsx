"use client";

import { useState } from "react";
import { ChevronDown } from "../icons";

const faqs = [
  {
    q: "Who buys the data?",
    a: "Frontier AI labs and research teams training and evaluating models. We only work with vetted buyers, and every sale happens under a signed licensing agreement that sets out how the data can be used.",
  },
  {
    q: "What kind of data qualifies?",
    a: "A few years of consistent work. A fresh export is worth less than a history.",
  },
  {
    q: "Will my customers' information be exposed?",
    a: "No. Buyers never see customer names or contact details.",
  },
  {
    q: "How fast do I get paid?",
    a: "Once your data passes review and the buyer confirms the purchase, payment lands in your account within 7 days.",
  },
  {
    q: "Does this take a lot of my team's time?",
    a: "One call to agree on scope, then we handle the rest.",
  },
  {
    q: "How is the payout calculated?",
    a: "Payout depends on the sources involved, volume, history, quality, access terms, and buyer demand. The estimator gives you a ballpark; your final number is set out in a written offer before anything is shared.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center gap-3 py-4 text-left"
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-[3px] bg-black/[.06] text-ink/70 transition-transform ${
                  on ? "" : "-rotate-90"
                }`}
              >
                <ChevronDown size={12} />
              </span>
              <span className="text-[15px] text-ink">{f.q}</span>
            </button>
            {on && <p className="pb-5 pl-9 font-serif text-[16px] leading-relaxed text-ink/85">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
