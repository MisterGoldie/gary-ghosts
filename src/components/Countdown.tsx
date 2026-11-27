"use client";

import { useEffect, useState } from "react";
import { useHydrated } from "@/lib/useHydrated";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const delta = Math.max(0, target - Date.now());
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta / 3_600_000) % 24),
    minutes: Math.floor((delta / 60_000) % 60),
    seconds: Math.floor((delta / 1000) % 60),
  };
}

export function Countdown({ target, compact = false }: { target: string; compact?: boolean }) {  const hydrated = useHydrated();
  const targetMs = new Date(target).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(targetMs));
    const id = window.setInterval(() => setParts(diff(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const cells: { label: string; value: number | null }[] = [
    { label: "Days", value: parts?.days ?? null },
    { label: "Hrs", value: parts?.hours ?? null },
    { label: "Min", value: parts?.minutes ?? null },
    { label: "Sec", value: parts?.seconds ?? null },
  ];

  return (
    <div
      className={`grid grid-cols-4 gap-2 ${compact ? "" : "sm:gap-3"}`}
      role="timer"
      aria-live="off"
      aria-label="Time until Gen 2 mint"
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="panel-soft flex flex-col items-center px-1 py-2.5 sm:py-3"
        >
          <span className="font-display text-xl font-semibold tabular-nums text-bone sm:text-2xl">
            {hydrated && cell.value !== null ? String(cell.value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[0.55rem] uppercase tracking-[0.18em] text-muted">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Whole days until `target`, recomputed on the client so static builds don't go stale. */
export function DaysLeft({ target, fallback }: { target: string; fallback: number }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const targetMs = new Date(target).getTime();
    setDays(Math.max(0, Math.ceil((targetMs - Date.now()) / 86_400_000)));
  }, [target]);

  return <>{days ?? fallback}</>;
}
