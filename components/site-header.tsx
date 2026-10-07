import Link from "next/link";
import { ArrowRight, Logo } from "./icons";

export function SiteHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-[56px] max-w-[1470px] items-center justify-between px-6 lg:px-[95px]">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="notational home">
            <Logo />
          </Link>
          <Link href="/refer" className="hidden items-center gap-2 text-[14px] text-ink/80 hover:text-ink sm:inline-flex">
            <span className="size-1.5 bg-th" />
            Refer for another $10K
          </Link>
        </div>
        <nav className="flex items-center gap-7 text-[14px]">
          <Link href="/buyers" className="hidden text-ink/80 hover:text-ink sm:inline">
            For buyers
          </Link>
          <Link
            href="/business"
            className="inline-flex h-9 items-center gap-2 rounded-[3px] bg-th px-3.5 text-[13px] text-white transition-colors hover:bg-th-950"
          >
            Get paid in 7 days
            <ArrowRight size={13} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
