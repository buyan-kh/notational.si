"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useToday } from "@/lib/use-today";
import { ChevronLeft, ChevronRight, Lock } from "../icons";

const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function BookingPanel({
  unlocked,
  prefill,
}: {
  unlocked: boolean;
  prefill: { name: string; email: string; notes: string };
}) {
  if (unlocked && calLink) return <CalEmbed prefill={prefill} />;

  return (
    <div className="relative p-6">
      <PlaceholderCalendar />
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/4 border border-line bg-white p-4 text-center text-[13.5px] leading-relaxed text-ink/80 shadow-[0_8px_30px_rgb(0_0_0/.08)]">
        {unlocked ? (
          <>Thanks — we&apos;ll email you to schedule a time.</>
        ) : (
          <span className="inline-flex items-start gap-2 text-left">
            <Lock size={14} className="mt-1 shrink-0 text-th" />
            <span>
              Please fill out the form and press <strong className="font-semibold text-ink">Continue</strong> before
              choosing your time slot.
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

function CalEmbed({ prefill }: { prefill: { name: string; email: string; notes: string } }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "valuation" });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: { light: { "cal-brand": "#284d32" }, dark: { "cal-brand": "#94c7a2" } },
      });
    })();
  }, []);

  return (
    <Cal
      namespace="valuation"
      calLink={calLink!}
      className="min-h-[520px] w-full overflow-auto"
      config={{ layout: "month_view", theme: "light", name: prefill.name, email: prefill.email, notes: prefill.notes }}
    />
  );
}

function PlaceholderCalendar() {
  const today = useToday();
  const year = today?.year ?? 2000;
  const month = today?.month ?? 0;
  const first = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const label = today ? new Date(year, month, 1).toLocaleString("en-US", { month: "long", year: "numeric" }) : "";

  return (
    <div className="pointer-events-none select-none opacity-60" aria-hidden>
      <p className="font-serif text-[20px] text-ink">
        notational <span className="mx-1 text-ink/40">|</span> Data valuation call
      </p>
      <p className="mt-5 text-center mono-label text-ink/60">Select a day</p>
      <div className="mt-4 flex items-center justify-between px-2 text-ink/50">
        <ChevronLeft size={14} />
        <span className="text-[14px]">{label}</span>
        <ChevronRight size={14} />
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
        {weekdays.map((d) => (
          <span key={d} className="mono-label text-[10px] text-ink/45">
            {d}
          </span>
        ))}
        {today &&
          Array.from({ length: first + days }, (_, i) => {
            const d = i - first + 1;
            if (d < 1) return <span key={i} />;
            const weekend = i % 7 >= 5;
            const past = d < today.day;
            return (
              <span
                key={i}
                className={`mx-auto grid size-8 place-items-center rounded-full font-mono text-[12px] ${
                  weekend || past ? "text-ink/30" : "bg-th/[.08] text-ink/70"
                }`}
              >
                {d}
              </span>
            );
          })}
      </div>
    </div>
  );
}
