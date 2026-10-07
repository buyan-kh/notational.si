import { industries, revenueRanges } from "./estimate";

export type LeadInput = {
  employees: string;
  yearFounded: string;
  revenue: string;
  industry: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  role: string;
};

export type LeadField = keyof LeadInput;
export type FieldErrors = Partial<Record<LeadField, string>>;

export const emptyLead: LeadInput = {
  employees: "",
  yearFounded: "",
  revenue: "",
  industry: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
  role: "",
};

const MAX_LEN = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export function validateLead(input: LeadInput, currentYear: number): FieldErrors {
  const errors: FieldErrors = {};
  const v = (k: LeadField) => (input[k] ?? "").trim();

  const employees = Number(v("employees"));
  if (!v("employees")) errors.employees = "Required";
  else if (!Number.isInteger(employees) || employees < 1 || employees > 1_000_000) errors.employees = "Enter a whole number";

  const year = Number(v("yearFounded"));
  if (!v("yearFounded")) errors.yearFounded = "Required";
  else if (!Number.isInteger(year) || year < 1800 || year > currentYear) errors.yearFounded = "Select a year";

  if (!revenueRanges.some((r) => r.id === v("revenue"))) errors.revenue = "Required";
  if (!industries.some((i) => i.id === v("industry"))) errors.industry = "Required";
  if (!v("firstName")) errors.firstName = "Required";
  if (!v("lastName")) errors.lastName = "Required";
  if (!EMAIL_RE.test(v("email"))) errors.email = "Enter a valid email";
  if (v("phone").replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number";
  if (!WEBSITE_RE.test(v("website"))) errors.website = "Enter a valid website";

  for (const k of Object.keys(emptyLead) as LeadField[]) {
    if (v(k).length > MAX_LEN) errors[k] = "Too long";
  }
  return errors;
}
