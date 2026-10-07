"use client";

import { useState, useTransition } from "react";
import { submitReferral } from "@/app/actions";
import { industries } from "@/lib/estimate";
import { companySizes, countries, emptyReferral, validateReferral, yearsOperating, type ReferralInput } from "@/lib/inquiry";
import { ArrowRight } from "../icons";

const inputCls =
  "h-10 w-full border border-transparent bg-panel px-3 text-[14px] text-ink placeholder:text-ink/40 outline-none focus:border-th/40 focus:bg-white aria-invalid:border-[#ca635d]/70 disabled:opacity-70";

export function ReferralForm() {
  const [values, setValues] = useState<ReferralInput>(emptyReferral);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = (key: keyof ReferralInput, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateReferral(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setFormError("Please fill in the highlighted fields.");
      return;
    }
    setFormError("");
    startTransition(async () => {
      const res = await submitReferral(values);
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        setFormError(res.error);
        return;
      }
      setSent(true);
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-white p-5 sm:p-7">
      <div className="grid gap-2 sm:grid-cols-2">
        <Text label="Referral first name *" value={values.firstName} error={errors.firstName} disabled={sent} onChange={(v) => set("firstName", v)} autoComplete="given-name" />
        <Text label="Referral last name *" value={values.lastName} error={errors.lastName} disabled={sent} onChange={(v) => set("lastName", v)} autoComplete="family-name" />
      </div>
      <div className="mt-2 grid gap-2">
        <Text label="Referral email *" type="email" value={values.email} error={errors.email} disabled={sent} onChange={(v) => set("email", v)} autoComplete="email" />
        <Text label="Company name *" value={values.company} error={errors.company} disabled={sent} onChange={(v) => set("company", v)} autoComplete="organization" />
      </div>

      <label className="mt-5 block">
        <span className="text-[14px] text-ink">
          Industry <span className="text-[#ca635d]">*</span>
        </span>
        <select
          value={values.industry}
          disabled={sent}
          aria-invalid={errors.industry ? true : undefined}
          onChange={(e) => set("industry", e.target.value)}
          className={`${inputCls} mt-2`}
        >
          <option value="">Select one</option>
          {industries.map((i) => (
            <option key={i.id} value={i.id}>
              {i.label}
            </option>
          ))}
        </select>
        <FieldError msg={errors.industry} />
      </label>

      <fieldset className="mt-5">
        <legend className="text-[14px] text-ink">
          Company size <span className="text-[#ca635d]">*</span>
        </legend>
        <p className="mt-1 text-[13px] text-ink/50">Number of employees.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {companySizes.map((s) => (
            <Chip key={s} on={values.size === s} disabled={sent} onClick={() => set("size", s)}>
              {s}
            </Chip>
          ))}
        </div>
        <FieldError msg={errors.size} />
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-[14px] text-ink">
          Estimated years in operation <span className="text-[#ca635d]">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {yearsOperating.map((y) => (
            <Chip key={y} on={values.years === y} disabled={sent} onClick={() => set("years", y)}>
              {y}
            </Chip>
          ))}
        </div>
        <FieldError msg={errors.years} />
      </fieldset>

      <label className="mt-5 block">
        <span className="text-[14px] text-ink">
          Country <span className="text-[#ca635d]">*</span>
        </span>
        <select
          value={values.country}
          disabled={sent}
          aria-invalid={errors.country ? true : undefined}
          onChange={(e) => set("country", e.target.value)}
          className={`${inputCls} mt-2`}
        >
          <option value="">Select one</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <FieldError msg={errors.country} />
      </label>

      <div className="mt-2">
        <Text label="Company website (optional)" value={values.website} error={errors.website} disabled={sent} onChange={(v) => set("website", v)} autoComplete="url" />
      </div>

      {formError && <p className="mt-4 text-[13px] text-[#9d3934]">{formError}</p>}
      <button
        type="submit"
        disabled={pending || sent}
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 bg-th mono-label text-white hover:bg-th-950 disabled:opacity-60"
      >
        {sent ? "Referral sent" : pending ? "Sending…" : "Submit referral"}
        {!sent && !pending && <ArrowRight size={13} />}
      </button>
    </form>
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
