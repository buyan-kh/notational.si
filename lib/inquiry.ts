import { industries } from "./estimate";

const MAX = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const dataTypes = ["Messages", "Documents", "Codebases", "Raw data", "Tasks", "Expert traces"] as const;
export const timelines = ["ASAP", "This quarter", "Exploring"] as const;
export const companySizes = ["1–10", "11–24", "25–49", "50–99", "100+"] as const;
export const yearsOperating = ["Under 3", "3–5", "6–10", "11+"] as const;

export const countries = [
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Croatia",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "India",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
] as const;

export type BuyerInput = {
  dataTypes: string;
  industries: string;
  timeline: string;
  name: string;
  email: string;
  organization: string;
  budget: string;
};

export type ReferralInput = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industry: string;
  size: string;
  years: string;
  country: string;
  website: string;
};

export const emptyBuyer: BuyerInput = {
  dataTypes: "",
  industries: "",
  timeline: "",
  name: "",
  email: "",
  organization: "",
  budget: "",
};

export const emptyReferral: ReferralInput = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  industry: "",
  size: "",
  years: "",
  country: "",
  website: "",
};

const oneOf = (value: string, options: readonly string[]) => options.includes(value);

export function validateBuyer(input: BuyerInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const types = input.dataTypes.split(",").map((s) => s.trim()).filter(Boolean);
  if (!types.length || types.some((t) => !oneOf(t, dataTypes))) errors.dataTypes = "Pick at least one";
  if (!input.industries.trim()) errors.industries = "Required";
  if (!oneOf(input.timeline, timelines)) errors.timeline = "Pick one";
  if (!input.name.trim()) errors.name = "Required";
  if (!EMAIL_RE.test(input.email.trim())) errors.email = "Enter a valid email";
  if (!input.organization.trim()) errors.organization = "Required";
  for (const [k, v] of Object.entries(input)) {
    if (v.length > MAX) errors[k] = "Too long";
  }
  return errors;
}

export function validateReferral(input: ReferralInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.firstName.trim()) errors.firstName = "Required";
  if (!input.lastName.trim()) errors.lastName = "Required";
  if (!EMAIL_RE.test(input.email.trim())) errors.email = "Enter a valid email";
  if (!input.company.trim()) errors.company = "Required";
  if (!industries.some((i) => i.id === input.industry)) errors.industry = "Required";
  if (!oneOf(input.size, companySizes)) errors.size = "Pick one";
  if (!oneOf(input.years, yearsOperating)) errors.years = "Pick one";
  if (!oneOf(input.country, countries)) errors.country = "Required";
  if (input.website.trim() && !WEBSITE_RE.test(input.website.trim())) errors.website = "Enter a valid website";
  for (const [k, v] of Object.entries(input)) {
    if (v.length > MAX) errors[k] = "Too long";
  }
  return errors;
}
