import Link from "next/link";
import { mailto, site } from "@/lib/site";
import { ArrowUpRight, Logo } from "./icons";
import { CurrentYear } from "./current-year";

const licenseLinks = [
  { label: "Get an estimate", href: "/business" },
  { label: "B2B business data", href: "/business" },
  { label: "Accounting data", href: "/business" },
  { label: "Software company data", href: "/business" },
  { label: "Manufacturing data", href: "/business" },
  { label: "Data partnerships", href: mailto("Data partnership") },
];

const supportLinks = [
  { label: "Buy data", href: "/buyers" },
  { label: "Security", href: "/business#security" },
  { label: "Contact", href: mailto("Contact") },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const cls = "mono-label text-[12px] text-ink/85 hover:text-th";
  return href.startsWith("mailto:") ? (
    <a href={href} className={cls}>
      {label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white pb-16 pt-6">
      <div className="mx-auto flex max-w-[800px] flex-col items-center px-6 text-center">
        <Link href="/" aria-label="notational home">
          <Logo />
        </Link>
        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {licenseLinks.map((l) => (
            <FooterLink key={l.label} {...l} />
          ))}
        </nav>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {supportLinks.map((l) => (
            <FooterLink key={l.label} {...l} />
          ))}
          <a
            href={mailto("Licensing my data")}
            aria-label="Email us"
            className="grid size-6 place-items-center rounded-[3px] bg-black/[.07] text-ink/70 hover:bg-black/[.12]"
          >
            <ArrowUpRight size={12} />
          </a>
        </nav>
        <p className="mt-9 font-serif text-[14px] text-th-700">
          Email us at{" "}
          <a href={mailto("Licensing my data")} className="underline underline-offset-2 hover:text-th">
            {site.contactEmail}
          </a>{" "}
          if you are interested in licensing your data.
        </p>
        <p className="mt-2 font-serif text-[14px] text-th-700">
          Copyright © <CurrentYear /> {site.domain}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
