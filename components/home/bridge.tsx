const sheets = [
  { title: "Ticket thread", meta: "Zendesk · 1,204", mark: "Names removed" },
  { title: "March close", meta: "Xero · ledger", mark: "Packaged" },
  { title: "Renewal call", meta: "Slack · 46", mark: "Licensed" },
];

export function Bridge() {
  return (
    <div className="grid border-y border-line bg-[#f7f6f1] md:grid-cols-[1fr_300px]">
      <div className="grid grid-cols-3">
        {sheets.map((s, i) => (
          <div key={s.title} className={`bg-white px-4 py-4 ${i > 0 ? "border-l border-line" : ""}`}>
            <p className="truncate font-serif text-[17px] leading-none text-ink">{s.title}</p>
            <p className="mt-1.5 mono-label text-[10px] text-ink/40">{s.meta}</p>
            <div className="mt-3 space-y-1.5" aria-hidden>
              <span className="block h-px bg-ink/20" />
              <span className="block h-px w-4/5 bg-ink" />
              <span className="block h-px w-1/2 bg-ink/20" />
            </div>
            <p className="mt-3 mono-label text-[10px] text-th">{s.mark}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between border-t border-line bg-white px-5 py-4 md:border-t-0 md:border-l md:border-th">
        <div className="flex items-center justify-between">
          <p className="mono-label text-th-700">Licensed set</p>
          <span className="grid size-7 place-items-center rounded-full border border-th font-serif text-[13px] leading-none text-th">
            N
          </span>
        </div>
        <p className="mt-3 font-serif text-[22px] leading-[1.15] text-ink">One set a lab can buy.</p>
      </div>
    </div>
  );
}
