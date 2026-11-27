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

const holdMs = 10_000;

export function HeroCrossfade() {
  const [active, setActive] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setInstant(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % frames.length),
      holdMs,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden">
      {frames.map((frame, index) => (
        <Image
          key={frame.src}
          src={frame.src}
          alt={frame.alt}
          width={frame.width}
          height={frame.height}
          priority
          sizes="(max-width: 640px) 84vw, 26rem"
          aria-hidden={index !== active}
          style={{ transform: `scale(${frame.scale})` }}
          className={`pointer-events-none absolute inset-0 h-full w-full object-contain mix-blend-multiply transition-opacity ease-out ${
            instant ? "duration-0" : "duration-[1500ms]"
          } ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
