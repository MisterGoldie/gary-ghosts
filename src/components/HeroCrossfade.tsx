"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const frames = [
  {
    src: "/ggog.png",
    alt: "Gary Ghost in a patched orange sheet, blue cap and sneakers",
    width: 1000,
    height: 1342,
    // ggog is cropped tight to the character; ggnew has wide white margins.
    // Scaling by the ratio of their content heights keeps Gary the same size.
    scale: 1,
  },
  {
    src: "/ggnew.png",
    alt: "Gary Ghost redrawn in detail with a ragged sheet, cap and combat boots",
    width: 2000,
    height: 2000,
    scale: 1.157,
  },
];

const holdMs = 7_000;

export function HeroCrossfade() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(() => frames.map(() => false));
  const ready = loaded.every(Boolean);

  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % frames.length),
      holdMs,
    );
    return () => window.clearInterval(id);
  }, [ready]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden mix-blend-multiply">
      {/* Blend the two frames together before blending the group with the page. */}
      <div className="absolute inset-0 isolate">
        {frames.map((frame, index) => (
          <Image
            key={frame.src}
            src={frame.src}
            alt={frame.alt}
            width={frame.width}
            height={frame.height}
            priority
            sizes="(max-width: 640px) 84vw, 26rem"
            onLoad={() => setLoaded((previous) => previous.map((value, position) => position === index || value))}
            aria-hidden={index !== active}
            style={{ transform: `scale(${frame.scale})` }}
            className={`pointer-events-none absolute inset-0 h-full w-full object-contain mix-blend-plus-lighter transition-opacity duration-[1800ms] ease-in-out will-change-[opacity] motion-reduce:transition-none ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
