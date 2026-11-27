import type { Metadata } from "next";
import Link from "next/link";
import { ArtPlaceholder } from "@/components/ArtPlaceholder";
import { Countdown } from "@/components/Countdown";
import { WaitlistForm } from "@/components/WaitlistForm";
import { gen2MintDate, links } from "@/lib/config";

export const metadata: Metadata = {
  title: "Gen 2 — Afterlife Arcade",
  description:
    "Gary Ghost Gen 2: Afterlife Arcade. 2,500 pixel spooks with playable trait perks, dropping in one month.",
};

const changes = [
  {
    title: "Pixel spooks",
    body: "Gary traded the charcoal for a 32px grid. Eight cabinets, five rarity tiers, and a palette pulled from arcade CRTs.",
  },
  {
    title: "Playable perks",
    body: "Certain traits unlock cabinet access in the ghost den — high scores mint Ectoplasm, the community token.",
  },
  {
    title: "Free 1:1 claim",
    body: "Every Gen 1 spook can claim one Gen 2 for free during the holder window. Hold more, claim more.",
  },
];

const mechanics = [
  { k: "Supply", v: "2,500" },
  { k: "Price", v: "TBA with allowlist" },
  { k: "Allowlist", v: "Opens 48h early" },
  { k: "Holder claim", v: "Free, 1 per Gen 1" },
  { k: "Network", v: "Ethereum" },
  { k: "Reveal", v: "Instant" },
];

export default function AfterlifePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
      <nav className="flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-bone">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-bone/80">Gen 2</span>
      </nav>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="chip border-wisp/40 bg-wisp/10 !text-wisp">Gen 2 · In one month</span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] sm:text-6xl">
            Afterlife
            <br />
            <span className="glow-text text-spectral">Arcade</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-bone/75">
            Gary found a haunted arcade cabinet behind the crypt and refuses to
            leave. 2,500 pixel spooks, playable perks, and a free claim for every
            Gen 1 holder.
          </p>

          <div className="mt-8 max-w-md">
            <p className="eyebrow mb-3">Mint opens in</p>
            <Countdown target={gen2MintDate.toISOString()} />
            <p className="mt-3 text-xs text-muted">
              {gen2MintDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}{" "}
              · 18:00 UTC
            </p>
          </div>

          <div className="panel mt-8 max-w-md p-5">
            <p className="eyebrow">Allowlist</p>
            <p className="mt-2 text-sm text-muted">First access, 48 hours before the public mint.</p>
            <div className="mt-4">
              <WaitlistForm />
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <ArtPlaceholder
            tone="spectral"
            label="Gen 2 key art — cabinet"
            className="aspect-[4/3] animate-float"
            size="1920 × 1440"
          />
          <div className="grid grid-cols-2 gap-3">
            <ArtPlaceholder tone="ink" label="Pixel Gary" index={1} className="aspect-square" size="512 × 512" />
            <ArtPlaceholder tone="wisp" label="Cabinet trait" index={7} className="aspect-square" size="512 × 512" />
          </div>
        </div>
      </div>

      <section className="mt-16">
        <p className="eyebrow">What changes</p>
        <h2 className="mt-3 font-display text-3xl font-semibold">Same ghost, new engine</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {changes.map((change, index) => (
            <div key={change.title} className="panel p-6">
              <span className="font-display text-sm text-spectral/70">0{index + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{change.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{change.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Trait preview</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">Eight cabinets, five tiers</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Placeholder tiles stand in for the final pixel renders. Every Gen 2
            spook gets one cabinet, one screen effect, and one cursed snack.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Common", "Uncommon", "Rare", "Epic", "Cursed"].map((tier) => (
              <span key={tier} className="chip">
                {tier}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["Cabinet", "Screen", "Snack", "Chair", "Token", "High score"].map((label, index) => (
            <ArtPlaceholder
              key={label}
              tone={index % 2 === 0 ? "spectral" : "ink"}
              label={label}
              index={index + 1}
              className="aspect-square"
              size="512 × 512"
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Mint mechanics</p>
        <h2 className="mt-3 font-display text-3xl font-semibold">The fine print</h2>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mechanics.map((item) => (
            <div key={item.k} className="panel-soft flex items-center justify-between px-4 py-3.5">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">{item.k}</dt>
              <dd className="font-display text-sm font-semibold">{item.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-muted">
          Final numbers are announced with the allowlist. Follow{" "}
          <a href={links.x} className="text-wisp underline underline-offset-2">
            @garyghost
          </a>{" "}
          or ask in the{" "}
          <a href={links.discord} className="text-wisp underline underline-offset-2">
            ghost den
          </a>{" "}
          for the latest.
        </p>
      </section>

      <section className="panel mt-16 flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
        <div>
          <h2 className="font-display text-2xl font-semibold">Still need a Gen 1?</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Holders get the free Gen 2 claim plus early allowlist access. Gen 1 is
            minting right now.
          </p>
        </div>
        <Link href="/mint" className="btn btn-primary shrink-0">
          Mint Gen 1
        </Link>
      </section>
    </div>
  );
}
