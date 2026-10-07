import { RotatingWord } from "./rotating-word";

function PageMark({ scraped = false }: { scraped?: boolean }) {
  const ink = scraped ? "#191917" : "#ffffff";
  const accent = scraped ? "#191917" : "#f3e2a4";
  return (
    <svg viewBox="0 0 220 132" className="h-[132px] w-[220px]" aria-hidden>
      <rect x="0.75" y="0.75" width="218.5" height="130.5" fill={scraped ? "#ffffff" : "none"} fillOpacity={scraped ? 0.55 : 1} stroke={ink} strokeOpacity={scraped ? 0.25 : 0.45} />
      {[28, 46, 64, 82, 100].map((y, i) => (
        <line
          key={y}
          x1="16"
          x2={i === 2 ? 118 : 188}
          y1={y}
          y2={y}
          stroke={i === 2 && !scraped ? accent : ink}
          strokeOpacity={scraped ? 0.35 : i === 2 ? 1 : 0.75}
          strokeWidth={i === 2 && !scraped ? 2 : 1.25}
        />
      ))}
      {scraped &&
        [28, 46, 64, 82, 100].map((y, i) => (
          <line key={`x${y}`} x1="16" x2={i === 2 ? 118 : 188} y1={y} y2={y} stroke={ink} strokeOpacity="0.7" strokeWidth="1.25" />
        ))}
      {!scraped && (
        <>
          <path d="M126 56 v16 M126 56 h-6 M126 72 h-6" fill="none" stroke={accent} strokeWidth="1.25" />
          <text x="134" y="68" fill={accent} fontSize="11" className="font-serif">
            the call
          </text>
        </>
      )}
      {scraped && (
        <g transform="rotate(-12 150 78)">
          <rect x="112" y="62" width="78" height="22" fill="none" stroke={ink} strokeOpacity="0.55" />
          <text x="122" y="77" fill={ink} fillOpacity="0.55" fontFamily="var(--font-jetbrains), monospace" fontSize="9" letterSpacing="1.5">
            SCRAPED
          </text>
        </g>
      )}
    </svg>
  );
}

export function RecordCards() {
  return (
    <div className="mt-10 grid border-t border-line md:grid-cols-2">
      <div className="flex items-end justify-between gap-6 overflow-hidden bg-th p-6 text-white sm:p-8">
        <div className="max-w-[240px] pb-1">
          <p className="mono-label text-white/70">Your private data</p>
          <p className="mt-8 text-[13px] text-white/70">Worth more than you think</p>
          <p className="mt-1 font-serif text-[32px] leading-tight">
            <RotatingWord
              words={["the close", "the escalation", "the renewal", "the audit", "the incident"]}
            />
          </p>
        </div>
        <div className="hidden shrink-0 sm:block">
          <PageMark />
        </div>
      </div>

      <div className="flex items-end justify-between gap-6 overflow-hidden border-t border-line bg-[#f3f1ec] p-6 sm:p-8 md:border-t-0 md:border-l">
        <div className="max-w-[240px] pb-1">
          <p className="mono-label text-ink/45">Public data</p>
          <p className="mt-8 text-[13px] text-ink/50">Already scraped and trained on</p>
          <p className="mt-1 font-serif text-[32px] leading-tight text-ink/30 line-through decoration-1">the open web</p>
        </div>
        <div className="hidden shrink-0 sm:block">
          <PageMark scraped />
        </div>
      </div>
    </div>
  );
}
