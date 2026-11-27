"use client";

import { useEffect, useState } from "react";

const taglines = [
  "Two collections. Multiple creepy ghosts",
  "Same ghost. New era.",
  "Born and raised in Gary, Indiana",
];

export function HomeTagline() {
  const [tagline, setTagline] = useState<string | null>(null);

  useEffect(() => {
    setTagline(taglines[Math.floor(Math.random() * taglines.length)]);
  }, []);

  return (
    <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
      {tagline ?? <span className="invisible" aria-hidden="true">{taglines[0]}</span>}
    </p>
  );
}
