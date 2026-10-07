"use client";

import { useRef, useState, useTransition } from "react";
import { submitLead } from "@/app/actions";
import { estimatePayout, formatMoney, industries, revenueRanges, rulerPosition } from "@/lib/estimate";
import { emptyLead, validateLead, type FieldErrors, type LeadField, type LeadInput } from "@/lib/lead";
import { useToday } from "@/lib/use-today";
import { ArrowRight, Logo } from "../icons";
import { Notation } from "../notation";
import { BookingPanel } from "./booking-panel";

const fieldBase =
  "h-10 w-full rounded-[2px] border px-3 text-[14px] text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-th/40 focus:bg-white aria-invalid:border-[#ca635d]/70 disabled:opacity-70";
const inputCls = `${fieldBase} border-transparent bg-panel`;
const rowInputCls = `${fieldBase} border-line-soft bg-white text-right font-mono [text-align-last:right]`;

export function Estimator() {
  const today = useToday();
  const [lead, setLead] = useState<LeadInput>(emptyLead);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const bookingRef = useRef<HTMLDivElement>(null);

  const currentYear = today?.year ?? 0;
  const years = currentYear ? Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i) : [];

  const estimate = currentYear
    ? estimatePayout({
        employees: Number(lead.employees),
        yearFounded: Number(lead.yearFounded),
        revenue: lead.revenue,
        industry: lead.industry,
        currentYear,
      })
    : null;

  const set = (k: LeadField) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setLead((l) => ({ ...l, [k]: value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const field = (k: LeadField) => ({
    name: k,
    value: lead[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    disabled: submitted,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const found = validateLead(lead, currentYear);
    setErrors(found);
    if (Object.keys(found).length) {
      setFormError("Please fill in the highlighted fields.");
      return;
    }
    startTransition(async () => {
      const res = await submitLead(lead);
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        setFormError(res.error);
        return;
      }
      setSubmitted(true);
      bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const industryLabel = industries.find((i) => i.id === lead.industry)?.label ?? "";
  const revenueLabel = revenueRanges.find((r) => r.id === lead.revenue)?.label ?? "";

  return (
    <div id="estimate" className="scroll-mt-6 border-y border-line">
      <div className="flex h-10 items-center justify-center gap-8 border-b border-line bg-th/[.06]">
        <Step n={1} label="Fill out the form" active={!submitted} done={submitted} />
        <Step n={2} label="Book a call" active={submitted} />
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} noValidate className="border-line lg:border-r">
          <div className="space-y-1.5 p-5 sm:p-6">
            <Row label="Full-time employees" error={errors.employees}>
              <input {...field("employees")} inputMode="numeric" placeholder="e.g. 25" className={rowInputCls} />
            </Row>
            <Row label="Year founded" error={errors.yearFounded}>
              <select {...field("yearFounded")} className={rowInputCls}>
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </Row>
            <Row label="Annual revenue" error={errors.revenue}>
              <select {...field("revenue")} className={rowInputCls}>
                <option value="">Select range</option>
                {revenueRanges.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </Row>
          </div>

          <div className="border-t border-line p-5 sm:p-6">
            <p className="mono-label text-ink/55">Your company and how to reach you</p>
            <label className="mt-4 block">
              <span className="text-[13.5px] text-ink">
                What industry is your company in? <span className="text-[#ca635d]">*</span>
              </span>
              <select {...field("industry")} className={`${inputCls} mt-2`}>
                <option value="">Select one</option>
                {industries.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.label}
                  </option>
                ))}
              </select>
              <FieldError msg={errors.industry} />
            </label>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Text {...field("firstName")} placeholder="First name *" autoComplete="given-name" error={errors.firstName} />
              <Text {...field("lastName")} placeholder="Last name *" autoComplete="family-name" error={errors.lastName} />
              <Text {...field("email")} type="email" placeholder="Email *" autoComplete="email" error={errors.email} />
              <Text {...field("phone")} type="tel" placeholder="Phone number *" autoComplete="tel" error={errors.phone} />
            </div>
            <div className="mt-2 grid gap-2">
              <Text {...field("website")} type="url" placeholder="Your business website *" autoComplete="url" error={errors.website} />
              <Text {...field("role")} placeholder="Your role at the company (optional)" autoComplete="organization-title" />
            </div>

            {formError && <p className="mt-4 text-[13px] text-[#9d3934]">{formError}</p>}

            <button
              type="submit"
              disabled={pending || submitted}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-[3px] bg-th mono-label text-[12px] text-white transition-colors hover:bg-th-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitted ? "Submitted — choose a time" : pending ? "Sending…" : "Continue"}
              {!submitted && !pending && <ArrowRight size={13} />}
            </button>
            <p className="mt-3 text-[12px] text-ink/55">We use the numbers to give an estimate. No newsletters.</p>
          </div>
        </form>

        <div className="flex flex-col border-t border-line lg:border-t-0">
          <div className="theme-green border-b border-line bg-th-50 p-6 text-th">
            <p className="mono-label text-th/70">Estimated payout range</p>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2 font-serif text-th-950" aria-live="polite">
              {estimate ? (
                <>
                  <Money value={estimate.low} />
                  <span className="text-[16px] text-th/50">to</span>
                  <Money value={estimate.high} />
                </>
              ) : (
                <span className="text-[44px] leading-none text-th/30">$— to $—</span>
              )}
            </p>
            <div className="mt-6">
              <Notation
                from={estimate ? rulerPosition(estimate.low) : undefined}
                to={estimate ? rulerPosition(estimate.high) : undefined}
                count={48}
              />
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-th-950/70">
              Final payout is determined based on data sources, volume, quality, access terms, and due diligence.
            </p>
          </div>
          <div ref={bookingRef} className="flex-1 scroll-mt-6">
            <BookingPanel
              unlocked={submitted}
              prefill={{
                name: `${lead.firstName} ${lead.lastName}`.trim(),
                email: lead.email,
                notes: [lead.website, industryLabel, `${lead.employees} employees`, revenueLabel]
                  .filter(Boolean)
                  .join(" · "),
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex h-10 items-center justify-between border-t border-line bg-th/[.06] px-3">
        <span className="text-[11px] text-ink/70">Estimates are indicative and private to you.</span>
        <Logo className="[&_span]:text-[13px] [&_svg]:size-3.5" />
      </div>
    </div>
  );
}

function Step({ n, label, active, done }: { n: number; label: string; active: boolean; done?: boolean }) {
  return (
    <span className={`flex items-center gap-2 mono-label ${active ? "text-ink" : "text-ink/40"}`}>
      <span className={`size-1.5 ${active || done ? "bg-th" : "bg-ink/30"}`} />
      0{n} {label}
    </span>
  );
}

function Money({ value }: { value: number }) {
  const s = formatMoney(value);
  return (
    <span className="text-[44px] leading-none">
      <span className="mr-0.5 text-[22px] text-th/60">$</span>
      {s.slice(1)}
    </span>
  );
}

function Row({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid items-center gap-2 bg-panel px-4 py-1.5 sm:grid-cols-[1fr_1.1fr]">
      <span className="mono-label text-ink/70">
        {label} <span className="text-[#ca635d]">*</span>
        {error && <span className="ml-2 normal-case tracking-normal text-[#9d3934]">{error}</span>}
      </span>
      {children}
    </label>
  );
}

function Text({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <label className="block">
      <input {...props} aria-label={props.placeholder} className={inputCls} />
      <FieldError msg={error} />
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="mt-1 block text-[12px] text-[#9d3934]">{msg}</span>;
}
