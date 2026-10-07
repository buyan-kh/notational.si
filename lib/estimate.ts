export const revenueRanges = [
  { id: "lt1m", label: "Under $1M", mid: 0.5 },
  { id: "1-5m", label: "$1M – $5M", mid: 3 },
  { id: "5-20m", label: "$5M – $20M", mid: 12 },
  { id: "20-50m", label: "$20M – $50M", mid: 35 },
  { id: "50-100m", label: "$50M – $100M", mid: 75 },
  { id: "100-500m", label: "$100M – $500M", mid: 250 },
  { id: "500m+", label: "$500M+", mid: 1000 },
] as const;

export const industries = [
  { id: "software", label: "Software / SaaS", weight: 1.3 },
  { id: "financial", label: "Financial services", weight: 1.35 },
  { id: "accounting", label: "Accounting & tax", weight: 1.3 },
  { id: "legal", label: "Legal", weight: 1.3 },
  { id: "healthcare", label: "Healthcare", weight: 1.25 },
  { id: "insurance", label: "Insurance", weight: 1.25 },
  { id: "manufacturing", label: "Manufacturing", weight: 1.1 },
  { id: "packaging", label: "Packaging", weight: 1.1 },
  { id: "logistics", label: "Logistics & supply chain", weight: 1.1 },
  { id: "construction", label: "Construction & engineering", weight: 1.05 },
  { id: "retail", label: "Retail & e-commerce", weight: 1.0 },
  { id: "marketing", label: "Marketing & agencies", weight: 1.05 },
  { id: "recruiting", label: "Recruiting & staffing", weight: 1.05 },
  { id: "professional", label: "Professional services", weight: 1.15 },
  { id: "other", label: "Other", weight: 1.0 },
] as const;

export const ESTIMATE_FLOOR = 20_000;
export const ESTIMATE_CEILING = 5_000_000;

export type EstimateInput = {
  employees: number;
  yearFounded: number;
  revenue: string;
  industry?: string;
  currentYear: number;
};

export function estimatePayout({ employees, yearFounded, revenue, industry, currentYear }: EstimateInput) {
  const rev = revenueRanges.find((r) => r.id === revenue);
  if (!rev || !Number.isFinite(employees) || employees < 1 || !yearFounded) return null;

  const years = Math.max(1, currentYear - yearFounded);
  const history = 1 + Math.min(years, 30) * 0.04;
  const sector = industries.find((i) => i.id === industry)?.weight ?? 1;

  const core = 2000 * Math.pow(Math.min(employees, 100_000), 0.6) * Math.pow(rev.mid, 0.25) * history * sector;

  const low = clamp(roundNice(core), ESTIMATE_FLOOR, ESTIMATE_CEILING * 0.7);
  const high = clamp(roundNice(core * 1.43), low * 1.25, ESTIMATE_CEILING);
  return { low, high: roundNice(high) };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function roundNice(n: number) {
  const step = n >= 1_000_000 ? 50_000 : n >= 100_000 ? 5_000 : 500;
  return Math.round(n / step) * step;
}

export function formatMoney(n: number) {
  if (n >= 1_000_000) return `$${trim(n / 1_000_000)}M`;
  return `$${trim(n / 1000)}K`;
}

function trim(n: number) {
  return n.toFixed(n >= 100 ? 0 : 1).replace(/\.0$/, "");
}

export function rulerPosition(n: number) {
  const lo = Math.log(ESTIMATE_FLOOR);
  const hi = Math.log(ESTIMATE_CEILING);
  return Math.min(1, Math.max(0, (Math.log(n) - lo) / (hi - lo)));
}
