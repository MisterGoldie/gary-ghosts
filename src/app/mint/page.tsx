import type { Metadata } from "next";
import Link from "next/link";
import { MintPanel } from "@/components/MintPanel";
import {
  explorerToken,
  gen1Contract,
  gen1FloorEth,
  gen1PriceEth,
  gen1Supply,
  links,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Gary Ghosts — OG Collection",
  description:
    "Gary Ghosts is a 750-piece ERC-721 collection on Ethereum. Mint a ghost from the original collection.",
};

const notes = [
  {
    title: "Art wit meaning",
    body: "Based on one of Gary, Indiana's nicknames. Gary Ghosts originally released in April 2022",
  },
  {
    title: "Mint a ghost",
    body: "Connect your Ethereum wallet to mint one ghost per transaction.",
  },
  {
    title: "Art lives on IPFS",
    body: "Images and metadata are pinned to IPFS, so the ghosts stick around even if this website ever disappears.",
  },
];

const facts = [
  { k: "Supply", v: gen1Supply.toLocaleString() },
  { k: "Mint price", v: `${gen1PriceEth} ETH` },
  { k: "Floor", v: `${gen1FloorEth} ETH` },
  { k: "Standard", v: "ERC-721" },
];

export default function MintPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
      <nav className="flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-bone">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-bone/80">Gary Ghosts</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div>
          <span className="chip border-spectral/40 bg-spectral/10 !text-spectral">
            <span className="h-1.5 w-1.5 rounded-full bg-spectral" /> Gen 1
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Gary Ghosts
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
            OG Collection · {gen1Supply} pieces
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-bone/75">
            The original collection: {gen1Supply} hand-drawn ghosts on Ethereum,
            available to mint at {gen1PriceEth} ETH each plus gas.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={links.opensea}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              OpenSea ↗
            </a>
            <a
              href={explorerToken(gen1Contract)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Etherscan ↗
            </a>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((item) => (
              <div key={item.k} className="panel-soft px-3.5 py-3">
                <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">{item.k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold">{item.v}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Before you buy</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {notes.map((note) => (
                <div key={note.title} className="panel-soft p-4">
                  <p className="text-sm font-semibold text-bone">{note.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{note.body}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="mt-8 break-all text-xs leading-relaxed text-muted">
            Contract:{" "}
            <a
              href={explorerToken(gen1Contract)}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-bone/75 underline underline-offset-2 hover:text-wisp"
            >
              {gen1Contract}
            </a>
          </p>
        </div>

        <div className="lg:sticky lg:top-24">
          <MintPanel />
          <p className="mt-4 text-center text-xs text-muted">
            Trouble buying?{" "}
            <a href={links.discord} className="text-wisp underline underline-offset-2">
              Ask in the ghost den
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
