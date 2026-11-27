import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import promoArtwork from "../../../public/mainpromo.png";
import { Countdown } from "@/components/Countdown";
import { GhostTypes } from "@/components/GhostTypes";
import {
  explorerAddress,
  gen2Contract,
  gen2LaunchLabel,
  gen2MintDate,
  gen2Supply,
  links,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "V2",
  description: "Gary Ghosts V2 is a revamped version of the original 2022 collection. Launching " + gen2LaunchLabel + ".",
};

const facts = [
  { k: "Collection", v: "Gary Ghosts V2" },
  { k: "Supply", v: gen2Supply.toLocaleString() },
  { k: "Network", v: "Ethereum" },
  { k: "Standard", v: "ERC-721" },
];

export default function V2Page() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
      <nav className="flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-bone">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="text-bone/80">V2</span>
      </nav>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="chip border-wisp/40 bg-wisp/10 !text-wisp">V2 &middot; Upcoming</span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] sm:text-6xl">
            Gary Ghosts <span className="glow-text text-spectral">V2</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-bone/75">
            A revamped version of the Gary Ghosts collection that was released in 2022.
          </p>

          <div className="mt-8 max-w-md">
            <p className="eyebrow mb-3">Launches in</p>
            <Countdown target={gen2MintDate.toISOString()} />
            <p className="mt-3 text-xs text-muted">
              <time dateTime={gen2MintDate.toISOString()}>{gen2LaunchLabel}</time>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.openseaV2} target="_blank" rel="noreferrer" className="btn btn-primary">
              View on OpenSea
            </a>
            <a href={explorerAddress(gen2Contract)} target="_blank" rel="noreferrer" className="btn btn-outline">
              View on Etherscan
            </a>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3">
            {facts.map((item) => (
              <div key={item.k} className="panel-soft px-3.5 py-3">
                <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">{item.k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold">{item.v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 break-all text-xs leading-relaxed text-muted">
            Contract:{" "}
            <a href={explorerAddress(gen2Contract)} target="_blank" rel="noreferrer"
              className="font-mono text-bone/75 underline underline-offset-2 hover:text-wisp">
              {gen2Contract}
            </a>
          </p>
        </div>

        <div className="panel overflow-hidden p-5 sm:p-7">
          <Image src={promoArtwork} alt="Gary Ghosts V2 promotional artwork" width={3000} height={3000}
            priority fetchPriority="high" placeholder="blur"
            sizes="(min-width: 1152px) 452px, (min-width: 1024px) calc(47.5vw - 96px), (min-width: 640px) calc(100vw - 98px), calc(100vw - 82px)"
            className="aspect-square w-full object-contain mix-blend-multiply" />
        </div>
      </div>

      <GhostTypes />

      <section className="panel mt-16 flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
        <div>
          <h2 className="font-display text-2xl font-semibold">Explore the original collection</h2>
          <p className="mt-2 max-w-md text-sm text-muted">The original Gary Ghosts are available to mint on Ethereum.</p>
        </div>
        <Link href="/mint" className="btn btn-primary shrink-0">Mint OG collection</Link>
      </section>
    </div>
  );
}
