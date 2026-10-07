import type { Metadata } from "next";
import { Estimator } from "@/components/business/estimator";
import { Faq } from "@/components/business/faq";
import { Contract, Lock, Shield, Vault } from "@/components/icons";
import { PageShell } from "@/components/page-shell";
import { PrimaryButton, SectionIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Estimate your data's worth — notational.si",
  description: "Tell us your team size, founding year, and revenue. See your payout range instantly, then book a call.",
};

const tools = [
  "HubSpot",
  "Salesforce",
  "ServiceNow",
  "Dynamics 365",
  "Zendesk",
  "Jira",
  "QuickBooks",
  "Xero",
  "NetSuite",
  "Slack",
  "GitHub",
  "Notion",
];

const steps = [
  {
    n: "01",
    tag: "60 seconds",
    title: "Get an estimate",
    body: "Tell us your team size, founding year, and revenue. See your payout range instantly.",
    cls: "bg-panel text-ink",
    num: "text-ink",
    sub: "text-ink/70",
  },
  {
    n: "02",
    tag: "20-minute call",
    title: "Book a call",
    body: "We walk through your data sources together and agree on exactly what's in scope and what isn't.",
    cls: "theme-gold bg-th-50 text-th-950",
    num: "text-th-950",
    sub: "text-th-950/70",
  },
  {
    n: "03",
    tag: "Read-only access",
    title: "Secure transfer",
    body: "We connect read-only to the approved sources. Customer details are removed before anything leaves processing.",
    cls: "bg-th text-white",
    num: "text-th-300",
    sub: "text-white/75",
  },
  {
    n: "04",
    tag: "7 days",
    title: "Get paid",
    body: "Payment lands once the review clears. No ongoing work.",
    cls: "bg-[#3d3b38] text-white",
    num: "text-[#f9cf69]",
    sub: "text-white/75",
  },
];

const security = [
  {
    Icon: Vault,
    title: "Approved data scope and clear boundaries",
    points: ["Original datasets are retained only for processing purposes.", "Original datasets are deleted after processing."],
  },
  {
    Icon: Shield,
    title: "Security and customer confidentiality standards",
    points: ["Customer information is never exposed."],
  },
  {
    Icon: Lock,
    title: "Encrypted, read-only access",
    points: ["Encrypted in transit and at rest.", "Access ends when the project ends."],
  },
  {
    Icon: Contract,
    title: "Written terms you sign off on",
    points: [
      "Data use, retention, and payment are set out in a signed agreement.",
      "You approve every source before anything is shared.",
    ],
  },
];

export default function BusinessPage() {
  return (
    <PageShell>
      <section className="pt-[70px]">
        <div className="mx-auto max-w-[800px] px-6 pb-10">
          <p className="text-[15px] text-ink">For Businesses</p>
          <h1 className="mt-1 font-serif text-[40px] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[44px]">
            Estimate your data&apos;s worth
          </h1>
        </div>
        <Estimator />
      </section>

      <section className="pt-[100px]">
        <div className="mx-auto max-w-[800px] px-6">
          <h2 className="font-serif text-[36px] leading-[1.15] tracking-[-0.01em] text-ink">
            The tools we license from
          </h2>
        </div>
        <div className="mt-4 overflow-hidden border-y border-line bg-th/[.04]">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
                {tools.map((t) => (
                  <span key={t} className="flex h-14 items-center border-r border-line px-8 mono-label text-[13px] text-th-950/80">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-[800px] px-6 py-12">
          <p className="font-serif text-[19px] leading-[1.55] text-ink/85">
            If your team works in one of these, there is a number.
          </p>
        </div>
      </section>

      <section id="how" className="scroll-mt-6 border-t border-line pt-[100px] pb-[80px]">
        <SectionIntro title="How it works" className="mb-12" />
        <div className="mx-auto grid max-w-[1100px] gap-2 px-6">
          {steps.map((s) => (
            <div key={s.n} className={`grid gap-6 p-7 sm:grid-cols-[220px_1fr] sm:p-9 ${s.cls}`}>
              <span className={`font-serif text-[88px] leading-[.85] ${s.num}`}>{s.n}</span>
              <div className="self-end">
                <p className={`flex items-center gap-2 mono-label ${s.sub}`}>
                  <span className="size-1.5 bg-current" />
                  {s.tag}
                </p>
                <h3 className="mt-2 font-serif text-[28px] leading-tight">{s.title}</h3>
                <p className={`mt-2 max-w-[460px] text-[14px] leading-relaxed ${s.sub}`}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="scroll-mt-6 border-t border-line bg-th text-white">
        <div className="mx-auto max-w-[800px] px-6 pt-[90px] pb-12">
          <h2 className="font-serif text-[36px] leading-tight text-[#f9cf69]">How we secure your data</h2>
          <p className="mt-2 font-serif text-[16px] text-white/75">Before any participation, together we define:</p>
        </div>
        <div className="grid border-t border-white/15 md:grid-cols-2">
          {security.map((s, i) => (
            <div
              key={s.title}
              className={`border-white/15 p-8 sm:p-10 ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "border-b" : "border-b md:border-b-0"}`}
            >
              <span className="grid size-11 place-items-center rounded-[3px] bg-white/10 text-th-300">
                <s.Icon size={22} />
              </span>
              <h3 className="mt-6 font-serif text-[21px] leading-snug">{s.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-white/75">
                    <span className="mt-2 size-1.5 shrink-0 bg-[#f9cf69]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line pt-[100px] pb-[60px]">
        <div className="mx-auto max-w-[800px] px-6">
          <h2 className="font-serif text-[32px] italic text-ink">Questions</h2>
          <div className="mt-6">
            <Faq />
          </div>
        </div>
      </section>

      <section className="border-t border-line py-[100px]">
        <div className="mx-auto flex max-w-[800px] flex-col items-center px-6 text-center">
          <h2 className="font-serif text-[44px] leading-[1.1] tracking-[-0.015em] text-ink">
            See the range
          </h2>
          <PrimaryButton href="#estimate" className="mt-8">
            Get an estimate
          </PrimaryButton>
        </div>
      </section>
    </PageShell>
  );
}
