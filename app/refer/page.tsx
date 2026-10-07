import type { Metadata } from "next";
import { ReferralForm } from "@/components/refer/referral-form";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Refer for another $10K — notational.si",
  description: "Know another company that would be a good fit? Send a referral.",
};

export default function ReferPage() {
  return (
    <PageShell>
      <section className="px-6 pt-16 pb-20">
        <div className="mx-auto max-w-[640px]">
          <p className="text-center mono-label text-ink/45">Referral program</p>
          <h1 className="mt-3 text-center font-serif text-[40px] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[44px]">
            Refer for another $10K
          </h1>
          <p className="mt-3 text-center font-serif text-[18px] text-ink/75">Know another company that&apos;d be a good fit?</p>
          <div className="mt-8">
            <ReferralForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
