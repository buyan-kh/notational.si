import { Info } from "../icons";
import { Notation } from "../notation";
import { MonoLink, Toolbar } from "../ui";

const entries = [
  { name: "Support tickets", span: "4 yrs", ink: 0.92, value: "410" },
  { name: "CRM pipelines", span: "6 yrs", ink: 0.84, value: "385" },
  { name: "Ledgers", span: "8 yrs", ink: 0.76, value: "360" },
  { name: "Code history", span: "5 yrs", ink: 0.68, value: "330" },
  { name: "Contracts", span: "7 yrs", ink: 0.58, value: "300" },
  { name: "Project tasks", span: "3 yrs", ink: 0.46, value: "250" },
  { name: "Call notes", span: "2 yrs", ink: 0.34, value: "180" },
  { name: "Field reports", span: "4 yrs", ink: 0.2, value: "70" },
];

export function Ledger() {
  return (
    <div>
      <Toolbar>
        <span className="mono-label text-th-950">A year of work, written down</span>
        <span className="mono-label text-ink/45">Indicative · USD</span>
      </Toolbar>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {entries.map((e) => (
          <div
            key={e.name}
            className="flex flex-col gap-3 border-r border-b border-line bg-[#fbfaf6] px-4 py-4 text-th transition-colors hover:bg-white"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-[14px] text-ink">{e.name}</p>
              <p className="shrink-0 mono-label text-[10px] text-ink/40">{e.span}</p>
            </div>
            <Notation inkUntil={e.ink} count={22} />
            <p className="font-serif text-[26px] leading-none text-th-950">${e.value}K</p>
          </div>
        ))}
      </div>
      <Toolbar className="border-b-0">
        <span className="flex items-center gap-2 text-[11px] text-ink/70">
          <Info size={13} />
          Top of range, by source.
        </span>
        <MonoLink href="/business">Get your estimate</MonoLink>
      </Toolbar>
    </div>
  );
}
