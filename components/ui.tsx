import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

type LinkishProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

function Linkish({ href, external, className, children }: LinkishProps) {
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function MonoLink({ href, children, className = "", external }: LinkishProps) {
  return (
    <Linkish
      href={href}
      external={external}
      className={`group inline-flex items-center gap-2.5 mono-label text-ink/80 hover:text-ink ${className}`}
    >
      {children}
      <span className="grid size-6 place-items-center rounded-[3px] bg-black/[.07] transition-colors group-hover:bg-black/[.12]">
        <ArrowUpRight size={12} />
      </span>
    </Linkish>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Linkish
      href={href}
      className={`inline-flex h-10 items-center gap-2.5 rounded-[3px] bg-th px-4 mono-label text-white transition-colors hover:bg-th-950 ${className}`}
    >
      {children}
      <ArrowRight size={13} />
    </Linkish>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Linkish
      href={href}
      className={`inline-flex h-10 items-center gap-2.5 rounded-[3px] border border-th/20 bg-th/5 px-4 mono-label text-th-950 transition-colors hover:bg-th/10 ${className}`}
    >
      {children}
      <ArrowRight size={13} />
    </Linkish>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[800px] px-6 ${className}`}>
      {eyebrow && <p className="mb-1 text-[15px] text-ink">{eyebrow}</p>}
      <h2 className="font-serif text-[28px] leading-tight tracking-[-0.01em] text-ink">{title}</h2>
      {children && <div className="mt-1 font-serif text-[16px] leading-relaxed text-th-700">{children}</div>}
    </div>
  );
}

export function Toolbar({ children, className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`flex min-h-10 items-center justify-between gap-4 border-y border-line bg-th/[.06] px-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex h-6 items-center rounded-[3px] bg-th/[.08] px-2 mono-label text-th-950 ${className}`}>
      {children}
    </span>
  );
}

