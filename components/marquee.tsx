export function Marquee({ items }: { items: string[] }) {
  const row = Array.from({ length: 4 }, () => items).flat();
  return (
    <div className="overflow-hidden border-t border-line bg-ticker py-5" aria-label={items.join(". ")}>
      <div className="flex w-max animate-marquee" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center font-serif text-[44px] leading-none text-th">
                <span className="px-8">{t}</span>
                <span className="size-2 bg-th/40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
