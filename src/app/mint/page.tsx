import type { Metadata } from "next";
import Link from "next/link";
import { ArtPlaceholder } from "@/components/ArtPlaceholder";
import { MintPanel } from "@/components/MintPanel";
import { gen1PriceEth, links } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mint Gen 1 — Spectral Society",
  description:
    "Mint Gary Ghost: Spectral Society. 5,000 generative spooks on Ethereum, max 5 per wallet.",
};

const notes = [
  {
    title: "Live contract price wins",
    body: "The panel reads price() from the contract. The configured fallback only applies while the contract is unreachable.",
  },
  {
    title: "One wallet, five spooks",
    body: "The quantity selector is capped at 5 per wallet to keep the mint fair. Adjust the cap in config if your contract differs.",
  },
  {
    title: "Reveal is instant",
    body: "Metadata is served the moment the transaction confirms — no waiting for a reveal window.",
  },
];

export default function MintPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
      <nav className="flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-bone">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-bone/80">Mint Gen 1</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div>
          <span className="chip border-spectral/40 bg-spectral/10 !text-spectral">
            <span className="h-1.5 w-1.5 rounded-full bg-spectral" /> Mint live
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Spectral Society
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-bone/75">
            5,000 generative spooks living on Ethereum. {gen1PriceEth} ETH each,
            capped at five per wallet. Connect, pick a quantity, and Gary handles
            the rest.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <ArtPlaceholder
              tone="wisp"
              label="Key art — Gary"
              className="aspect-square sm:aspect-auto sm:h-full"
              size="1080 × 1080"
            />
            <div className="grid gap-3">
              <ArtPlaceholder
                tone="ink"
                label="Trait sheet"
                index={12}
                className="aspect-[4/3]"
                size="1600 × 1200"
              />
              <ArtPlaceholder
                tone="spectral"
                label="Rare variant"
                index={88}
                className="aspect-[4/3]"
                size="1600 × 1200"
              />
            </div>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Supply", v: "5,000" },
              { k: "Price", v: `${gen1PriceEth} ETH` },
              { k: "Network", v: "Ethereum" },
              { k: "Standard", v: "ERC-721A" },
            ].map((item) => (
              <div key={item.k} className="panel-soft px-3.5 py-3">
                <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">{item.k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold">{item.v}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Before you mint</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {notes.map((note) => (
                <div key={note.title} className="panel-soft p-4">
                  <p className="text-sm font-semibold text-bone">{note.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{note.body}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="mt-8 text-xs leading-relaxed text-muted">
            Placeholder asset note: artwork, traits and the contract address on
            this page are not final. Verify everything from the official{" "}
            <a href={links.x} className="text-wisp underline underline-offset-2">
              X account
            </a>{" "}
            before minting.
          </p>
        </div>

        <div className="lg:sticky lg:top-24">
          <MintPanel />
          <p className="mt-4 text-center text-xs text-muted">
            Trouble minting?{" "}
            <Link href="/#faq" className="text-wisp underline underline-offset-2">
              Read the FAQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
