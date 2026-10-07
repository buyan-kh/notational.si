const tall = (i: number) => i % 4 === 0;

export function Notation({
  count = 36,
  inkUntil,
  from,
  to,
  className = "",
}: {
  count?: number;
  inkUntil?: number;
  from?: number;
  to?: number;
  className?: string;
}) {
  const a = from === undefined ? -1 : Math.round(from * (count - 1));
  const b = to === undefined ? -1 : Math.round(to * (count - 1));
  const ranged = a >= 0 && b >= 0;

  return (
    <div className={`flex h-5 items-end gap-px ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const inked = ranged ? i >= Math.min(a, b) && i <= Math.max(a, b) : inkUntil !== undefined && i / count < inkUntil;
        return (
          <span
            key={i}
            className="w-0.5 bg-current"
            style={{ height: tall(i) ? 20 : 11, opacity: inked ? 1 : 0.16 }}
          />
        );
      })}
    </div>
  );
}
