"use client";

import { useState, useTransition } from "react";
import { submitBuyer } from "@/app/actions";
import { dataTypes, emptyBuyer, timelines, validateBuyer, type BuyerInput } from "@/lib/inquiry";
import { ArrowRight } from "../icons";

const inputCls =
  "h-10 w-full border border-transparent bg-panel px-3 text-[14px] text-ink placeholder:text-ink/40 outline-none focus:border-th/40 focus:bg-white aria-invalid:border-[#ca635d]/70 disabled:opacity-70";

const points = [
  {
    title: "Real work, not synthetic.",
    body: "Records from companies and the people who do the job.",
  },
  {
    title: "Names come off before you see it.",
    body: "Customer names, contact details, and other identifiers are removed in processing.",
  },
  {
    title: "A signed license for every source.",
    body: "Each set is licensed by the company that owns it.",
  },
  {
    title: "Packaged to spec.",
    body: "Formats, schemas, and labels matched to your training or eval pipeline.",
  },
];

export function RequestForm() {
  const [values, setValues] = useState<BuyerInput>(emptyBuyer);
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = (key: keyof BuyerInput, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleType = (type: string) => {
    const next = picked.includes(type) ? picked.filter((t) => t !== type) : [...picked, type];
    setPicked(next);
    set("dataTypes", next.join(", "));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateBuyer(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setFormError("Please fill in the highlighted fields.");
      return;
    }
    setFormError("");
    startTransition(async () => {
      const res = await submitBuyer(values);
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        setFormError(res.error);
        return;
      }
      setSent(true);
    });
  };

  return (
    <div className="grid border-y border-line lg:grid-cols-[1.15fr_0.85fr]">
      <form onSubmit={onSubmit} noValidate className="bg-white lg:border-r lg:border-line">
        <div className="space-y-5 p-5 sm:p-7">
          <p className="mono-label text-ink/45">What are you looking for?</p>
          <fieldset>
            <legend className="text-[14px] text-ink">
              Data types <span className="text-[#ca635d]">*</span>
            </legend>
            <p className="mt-1 text-[13px] text-ink/50">Pick all that apply.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {dataTypes.map((type) => (
                <Chip key={type} on={picked.includes(type)} disabled={sent} onClick={() => toggleType(type)}>
                  {type}
                </Chip>
              ))}
            </div>
            <FieldError msg={errors.dataTypes} />
          </fieldset>
          <label className="block">
            <span className="text-[14px] text-ink">
              Industries or roles <span className="text-[#ca635d]">*</span>
            </span>
            <input
              value={values.industries}
              disabled={sent}
              placeholder="e.g. accounting firms, B2B SaaS support, construction bids"
              aria-invalid={errors.industries ? true : undefined}
              onChange={(e) => set("industries", e.target.value)}
              className={`${inputCls} mt-2`}
            />
            <FieldError msg={errors.industries} />
          </label>
          <fieldset>
            <legend className="text-[14px] text-ink">
              Timeline <span className="text-[#ca635d]">*</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {timelines.map((t) => (
                <Chip key={t} on={values.timeline === t} disabled={sent} onClick={() => set("timeline", t)}>
                  {t}
                </Chip>
              ))}
            </div>
            <FieldError msg={errors.timeline} />
          </fieldset>
        </div>
        <div className="space-y-3 border-t border-line p-5 sm:p-7">
          <p className="mono-label text-ink/45">How to reach you</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Text label="Full name *" value={values.name} error={errors.name} disabled={sent} onChange={(v) => set("name", v)} autoComplete="name" />
            <Text label="Work email *" type="email" value={values.email} error={errors.email} disabled={sent} onChange={(v) => set("email", v)} autoComplete="email" />
            <Text label="Organization *" value={values.organization} error={errors.organization} disabled={sent} onChange={(v) => set("organization", v)} autoComplete="organization" />
            <Text label="Budget range (optional)" value={values.budget} disabled={sent} onChange={(v) => set("budget", v)} />
          </div>
          {formError && <p className="text-[13px] text-[#9d3934]">{formError}</p>}
          <button
            type="submit"
            disabled={pending || sent}
            className="inline-flex h-11 w-full items-center justify-center gap-2 bg-th mono-label text-white hover:bg-th-950 disabled:opacity-60"
          >
            {sent ? "Request sent" : pending ? "Sending…" : "Request data"}
            {!sent && !pending && <ArrowRight size={13} />}
          </button>
          <p className="text-[12.5px] text-ink/55">
            {sent ? "We reply within one business day." : "We reply within one business day. Samples are covered by an NDA."}
          </p>
        </div>
      </form>
      <aside className="bg-th px-6 py-8 text-white sm:px-8 sm:py-10">
        <h2 className="font-serif text-[32px] leading-tight">What you get</h2>
        <ul className="mt-8 space-y-6">
          {points.map((p) => (
            <li key={p.title}>
              <p className="flex gap-3 font-serif text-[17px]">
                <span className="mt-2 size-1.5 shrink-0 bg-[#f9cf69]" />
                {p.title}
              </p>
              <p className="mt-1 pl-5 text-[14px] leading-relaxed text-white/75">{p.body}</p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function Chip({
  on,
  disabled,
  onClick,
  children,
}: {
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={on}
      onClick={onClick}
      className={`h-9 border px-3 text-[13.5px] transition-colors disabled:opacity-70 ${
        on ? "border-th bg-th text-white" : "border-line bg-panel text-ink hover:border-th/40"
      }`}
    >
      {children}
    </button>
  );
}

function Text({
  label,
  value,
  error,
  onChange,
  type = "text",
  disabled,
  autoComplete,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={label}
        aria-label={label}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
      <FieldError msg={error} />
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="mt-1 block text-[12px] text-[#9d3934]">{msg}</span>;
}
