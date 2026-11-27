"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/mint", label: "Gen 1 mint" },
  { href: "/afterlife", label: "Gen 2" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/#faq", label: "FAQ" },
];

function GhostMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      <path
        d="M12 2.5c-4.1 0-6.8 3.2-6.8 7.2v7.6c0 1.5 1.3 2.2 2.5 1.3l1.4-1.1 1.4 1.1c.8.7 2 .7 2.8 0l1.4-1.1 1.4 1.1c1.2.9 2.5.2 2.5-1.3V9.7c0-4-2.7-7.2-6.8-7.2Z"
        fill="currentColor"
      />
      <circle cx="9.6" cy="9.6" r="1.25" fill="#0b0714" />
      <circle cx="14.4" cy="9.6" r="1.25" fill="#0b0714" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2.5 text-wisp">
          <GhostMark />
          <span className="font-display text-lg font-bold tracking-tight text-bone">
            Gary<span className="text-wisp">Ghost</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  active ? "text-bone" : "text-muted hover:text-bone"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/mint" className="btn btn-primary hidden sm:inline-flex !px-5 !py-2.5">
            Connect &amp; mint
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-bone md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-void/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/mint" className="btn btn-primary mt-2 w-full">
              Connect &amp; mint
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
