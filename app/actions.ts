"use server";

import { Resend } from "resend";
import { estimatePayout, formatMoney, industries, revenueRanges } from "@/lib/estimate";
import { emptyBuyer, emptyReferral, validateBuyer, validateReferral, type BuyerInput, type ReferralInput } from "@/lib/inquiry";
import { emptyLead, validateLead, type FieldErrors, type LeadInput } from "@/lib/lead";

export type LeadResult = { ok: true } | { ok: false; error: string; fieldErrors?: FieldErrors };
export type FormResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitLead(raw: LeadInput): Promise<LeadResult> {
  const input = Object.fromEntries(
    (Object.keys(emptyLead) as (keyof LeadInput)[]).map((k) => [k, String(raw?.[k] ?? "").trim()]),
  ) as LeadInput;

  const currentYear = new Date().getFullYear();
  const fieldErrors = validateLead(input, currentYear);
  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const estimate = estimatePayout({
    employees: Number(input.employees),
    yearFounded: Number(input.yearFounded),
    revenue: input.revenue,
    industry: input.industry,
    currentYear,
  });
  const range = estimate ? `${formatMoney(estimate.low)} – ${formatMoney(estimate.high)}` : "n/a";

  const rows: [string, string][] = [
    ["Name", `${input.firstName} ${input.lastName}`],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Website", input.website],
    ["Role", input.role || "—"],
    ["Industry", industries.find((i) => i.id === input.industry)?.label ?? input.industry],
    ["Full-time employees", input.employees],
    ["Year founded", input.yearFounded],
    ["Annual revenue", revenueRanges.find((r) => r.id === input.revenue)?.label ?? input.revenue],
    ["Estimated payout", range],
  ];

  return notify(`New estimate: ${input.firstName} ${input.lastName} (${input.website}) — ${range}`, input.email, rows);
}

function clean<T extends Record<string, string>>(empty: T, raw: T): T {
  return Object.fromEntries((Object.keys(empty) as (keyof T)[]).map((k) => [k, String(raw?.[k] ?? "").trim()])) as T;
}

export async function submitBuyer(raw: BuyerInput): Promise<FormResult> {
  const input = clean(emptyBuyer, raw);
  const fieldErrors = validateBuyer(input);
  if (Object.keys(fieldErrors).length) return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };

  return notify(`Buyer request: ${input.name} (${input.organization})`, input.email, [
    ["Name", input.name],
    ["Email", input.email],
    ["Organization", input.organization],
    ["Data types", input.dataTypes],
    ["Industries or roles", input.industries],
    ["Timeline", input.timeline],
    ["Budget", input.budget || "—"],
  ]);
}

export async function submitReferral(raw: ReferralInput): Promise<FormResult> {
  const input = clean(emptyReferral, raw);
  const fieldErrors = validateReferral(input);
  if (Object.keys(fieldErrors).length) return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };

  const industry = industries.find((i) => i.id === input.industry)?.label ?? input.industry;
  return notify(`Referral: ${input.company}`, input.email, [
    ["Referral", `${input.firstName} ${input.lastName}`],
    ["Email", input.email],
    ["Company", input.company],
    ["Industry", industry],
    ["Company size", input.size],
    ["Years in operation", input.years],
    ["Country", input.country],
    ["Website", input.website || "—"],
  ]);
}

async function notify(subject: string, replyTo: string, rows: [string, string][]): Promise<FormResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[lead] Resend env vars missing; lead not emailed:", Object.fromEntries(rows));
      return { ok: true };
    }
    console.error("[lead] Resend env vars missing");
    return { ok: false, error: "Something went wrong. Please try again or email us." };
  }

  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#666;border-bottom:1px solid #eee">${escape(k)}</td><td style="border-bottom:1px solid #eee"><b>${escape(v)}</b></td></tr>`,
    )
    .join("")}</table>`;

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo,
    subject,
    html,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
  });

  if (error) {
    console.error("[lead] Resend error", error);
    return { ok: false, error: "Something went wrong. Please try again or email us." };
  }
  return { ok: true };
}
