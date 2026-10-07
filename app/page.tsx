import Link from "next/link";
import { Bridge } from "@/components/home/bridge";
import { Ledger } from "@/components/home/ledger";
import { RecordCards } from "@/components/home/record-cards";
import { ArrowRight, Info, Lock } from "@/components/icons";
import { Notation } from "@/components/notation";
import { PageShell } from "@/components/page-shell";
import { MonoLink, PrimaryButton, SectionIntro, Toolbar } from "@/components/ui";

const experts = [
  { role: "Accountants", work: "Closes, reconciliations, audits" },
  { role: "Lawyers", work: "Contracts, diligence, filings" },
  { role: "Software engineers", work: "Reviews, migrations, incidents" },
  { role: "Clinicians", work: "Charting, triage, care plans" },
  { role: "Financial analysts", work: "Models, memos, forecasts" },
  { role: "Support leads", work: "Escalations, macros, QA" },
  { role: "Sales operators", work: "Pipelines, pricing, renewals" },
  { role: "Engineers & builders", work: "Bids, specs, site reports" },
  { role: "Recruiters", work: "Sourcing, screens, offers" },
  { role: "Operations managers", work: "SOPs, scheduling, vendors" },
  { role: "Marketers", work: "Campaigns, briefs, reporting" },
  { role: "Insurance adjusters", work: "Claims, underwriting, appeals" },
];

const steps = [
  {
    theme: "theme-green",
    label: "Your sources",
    title: "List",
    body: "Bring the accounts. We price each one.",
  },
  {
    theme: "theme-gold",
    label: "Quality check",
    title: "Review",
    body: "We check the supply and package it for a buyer.",
  },
  {
    theme: "theme-red",
    label: "The sale",
    title: "Get paid",
    body: "When a lab purchases, the money comes to you.",
  },
];

export default function Home() {
  return (
    <PageShell>
      <section className="pt-[70px]">
        <div className="mx-auto max-w-[800px] px-6 pb-12">
          <p className="text-[15px] text-ink">Proprietary Data, Licensed to Frontier Labs</p>
          <h1 className="mt-1 font-serif text-[40px] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[44px]">
            Monetize the data only your company has
          </h1>
          <p className="mt-4 font-serif text-[19px] leading-[1.55] text-ink/90">
            Your company could be paid <strong className="font-semibold">$20K–$5M</strong>.
          </p>
          <PrimaryButton href="/business" className="mt-7">
            Get paid in 7 days
          </PrimaryButton>
        </div>
        <Ledger />
      </section>

      <section className="border-t border-line pt-16">
        <SectionIntro title="What AI can't do">
          Today&apos;s best AI systems finish <strong className="font-semibold text-ink">under 5%</strong> of the real jobs
          experts put in front of them. To improve, they need real examples of how people take a task from start to
          finish.
        </SectionIntro>
        <RecordCards />
      </section>

      <section className="border-t border-line pt-16">
        <div className="mx-auto max-w-[800px] px-6 pb-6">
          <p className="mono-label text-th-700">How notational works</p>
          <h2 className="mt-2 font-serif text-[26px] leading-snug text-ink">notational bridges that gap.</h2>
        </div>
        <Bridge />
        <div className="flex h-12 items-center justify-end border-b border-line px-4">
          <MonoLink href="/business#how">See how it works</MonoLink>
        </div>
      </section>

      <section className="border-t border-line pt-[100px]">
        <SectionIntro title="Experts we're looking for" className="mb-12">
          Paid at an industry consulting rate.
        </SectionIntro>
        <div className="border-t border-line">
          <div className="grid grid-cols-[1fr_1.4fr_40px] items-center border-b border-line bg-panel px-4 py-2.5 mono-label text-th-950/80 md:grid-cols-[1fr_1.4fr_40px_1fr_1.4fr_40px]">
            <span>Role</span>
            <span>Workflows</span>
            <span />
            <span className="hidden md:block">Role</span>
            <span className="hidden md:block">Workflows</span>
            <span className="hidden md:block" />
          </div>
          <div className="grid bg-th/[.1] md:grid-cols-2">
            {experts.map((e, i) => (
              <Link
                key={e.role}
                href="/business"
                className={`group grid grid-cols-[1fr_1.4fr_40px] items-center border-b border-white px-4 py-3 transition-colors hover:bg-th hover:text-white ${
                  i % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <span className="text-[14.5px] text-ink group-hover:text-white">{e.role}</span>
                <span className="font-mono text-[11.5px] text-th-700 group-hover:text-white/80">{e.work}</span>
                <span className="justify-self-end opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <Toolbar className="border-t-0 border-b-0">
            <span className="flex items-center gap-2 text-[11px] text-ink/70">
              <Info size={13} />
              Don&apos;t see your role? We still want to hear from you.
            </span>
            <MonoLink href="/business">Are you a fit?</MonoLink>
          </Toolbar>
        </div>
      </section>

      <section className="border-t border-line pt-[100px] pb-[80px]">
        <SectionIntro title="List, review, get paid." className="mb-12" />
        <div className="mx-auto grid max-w-[1100px] gap-2 px-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.label} className={`${s.theme} flex flex-col bg-th-50 p-5 text-th`}>
              <p className="mono-label text-th/70">
                0{i + 1} · {s.label}
              </p>
              <p className="mt-4 font-serif text-[40px] leading-none text-th-950">{s.title}</p>
              <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-th-950/75">{s.body}</p>
              <Notation inkUntil={(i + 1) / 3} count={24} className="mt-6" />
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-[800px] flex-col items-center gap-6 px-6 text-center">
          <p className="flex items-start gap-2 text-[13.5px] text-ink/75">
            <Lock size={14} className="mt-0.5 shrink-0" />
            <span>
              Your data stays under your control until a buyer purchases. Buyers only see{" "}
              <strong className="font-semibold text-ink">redacted previews</strong> before the sale.
            </span>
          </p>
          <PrimaryButton href="/business">Get started</PrimaryButton>
        </div>
      </section>

      <section className="theme-blue border-t border-line">
        <div className="grid md:grid-cols-2">
          <div className="px-6 py-[90px] sm:px-[55px]">
            <h2 className="font-serif text-[40px] leading-[1.1] tracking-[-0.01em] text-th-950">
              Value it before
              <br />
              you list it.
            </h2>
            <p className="mt-4 max-w-[420px] font-serif text-[16px] leading-relaxed text-th-700">
              A few questions about your company, and a range before you commit.
            </p>
            <PrimaryButton href="/business" className="mt-7">
              Estimate your assets
            </PrimaryButton>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-th-700">
              <Lock size={12} />
              No listing required. The estimate stays private to you.
            </p>
          </div>
          <div className="ruled flex items-center justify-center border-t border-line px-6 py-[60px] md:border-t-0 md:border-l">
            <div className="relative w-full max-w-[340px] border border-th/20 bg-[#fbfaf6] p-5 text-th">
              <span className="absolute top-0 right-0 border-t-[26px] border-l-[26px] border-t-th border-l-transparent" aria-hidden />
              <p className="mono-label text-th/70">Valuation slip · 60 sec</p>
              <p className="mt-4 font-serif text-[40px] leading-none text-th-950">
                $29K
                <span className="mx-2 text-[16px] text-th/50">to</span>
                $41.5K
              </p>
              <Notation from={0.22} to={0.4} count={32} className="mt-6" />
              <p className="mt-4 border-t border-dashed border-th/25 pt-3 text-[12px] text-th-700">Not an offer.</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
