"use client";

import { useEffect, useState } from "react";

export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span key={i} className="inline-block animate-[fadeUp_.45s_ease-out]">
      {words[i]}
    </span>
  );
}
