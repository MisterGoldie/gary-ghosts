type Tone = "wisp" | "spectral" | "ink";

const toneStyles: Record<Tone, string> = {
  wisp: "bg-[linear-gradient(150deg,#fdf0e2,#f8dcc2_45%,#f8ead8)]",
  spectral: "bg-[linear-gradient(150deg,#e9f5ec,#d3e9d8_48%,#eef6ef)]",
  ink: "bg-[linear-gradient(150deg,#f7f3ea,#eae1d1_52%,#f9f6f0)]",
};

const accentStyles: Record<Tone, string> = {
  wisp: "text-wisp",
  spectral: "text-spectral",
  ink: "text-muted",
};

export function ArtPlaceholder({
  tone = "ink",
  label,
  index,
  className = "",
  size = "1080 × 1080",
}: {
  tone?: Tone;
  label?: string;
  index?: number;
  className?: string;
  size?: string;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl border border-black/8 ${toneStyles[tone]} ${className}`}
    >
      <div className="absolute inset-0 hairline-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255,255,255,0.75),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-3 rounded-xl border border-dashed border-black/10" aria-hidden="true" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-2">
          <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${accentStyles[tone]}`}>
            Placeholder
          </span>
          {index !== undefined && (
            <span className="font-display text-[0.65rem] uppercase tracking-[0.18em] text-black/45">
              #{String(index).padStart(3, "0")}
            </span>
          )}
        </div>
        <div>
          <p className="font-display text-lg font-semibold leading-tight text-bone/90">
            {label ?? "Art coming soon"}
          </p>
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-black/40">{size}</p>
        </div>
      </div>
    </div>
  );
}
