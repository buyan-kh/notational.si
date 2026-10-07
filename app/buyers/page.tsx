import type { Metadata } from "next";
import { RequestForm } from "@/components/buyers/request-form";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Request data — notational.si",
  description: "Tell us the data types, industries, and timeline you need. We reply within one business day.",
};

export default function BuyersPage() {
  return (
    <PageShell>
      <section className="pt-16 pb-20">
        <div className="mx-auto max-w-[800px] px-6 pb-8">
          <p className="text-[15px] text-ink">For buyers</p>
          <h1 className="mt-1 font-serif text-[40px] leading-[1.1] tracking-[-0.015em] text-ink">Request data</h1>
        </div>
        <RequestForm />
      </section>
    </PageShell>
  );
}
