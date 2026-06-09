import { useEffect, useState } from "react";

// Hitungan mundur sederhana sampai targetDate
export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff / 3_600_000) % 24),
      m: Math.floor((diff / 60_000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const Cell = ({ v, label }: { v: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="grid h-14 w-14 place-items-center rounded-md border border-border bg-background/80 font-display text-2xl tabular-nums">
        {String(v).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    </div>
  );
  return (
    <div className="flex items-center gap-3">
      <Cell v={t.d} label="Hari" />
      <Cell v={t.h} label="Jam" />
      <Cell v={t.m} label="Menit" />
      <Cell v={t.s} label="Detik" />
    </div>
  );
}
