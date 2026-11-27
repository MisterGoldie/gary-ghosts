"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const frames = [
  {
    src: "/ggog.png",
    href: "/mint",
    label: "OG",
    alt: "Gary Ghost in a patched orange sheet, blue cap and sneakers",
    width: 1000,
    height: 1342,
    // ggog is cropped tight to the character; ggnew has wide white margins.
    // Scaling by the ratio of their content heights keeps Gary the same size.
    scale: 1,
  },
  {
    src: "/ggnew.png",
    href: "/v2",
    label: "V2",
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
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const ready = loaded.every(Boolean);
  const currentFrame = frames[active];

  useEffect(() => {
    if (!ready || hovered || focused) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % frames.length),
      holdMs,
    );
    return () => window.clearInterval(id);
  }, [ready, hovered, focused]);

  return (
    <Link
      href={currentFrame.href}
      aria-label={currentFrame.label + ": More information"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="group relative mx-auto block aspect-square w-full max-w-[26rem] cursor-pointer"
    >
      {/* Blend the two frames together before blending the group with the page. */}
      <div className="absolute inset-0 overflow-hidden mix-blend-multiply">
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
      <span
        aria-hidden="true"
        className="absolute -bottom-6 inset-x-0 text-center text-xs text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
      >
        {currentFrame.label}: More information
      </span>
    </Link>
  );
}
