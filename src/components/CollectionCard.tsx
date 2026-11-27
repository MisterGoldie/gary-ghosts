import Link from "next/link";
import type { Collection } from "@/lib/collections";
import { ArtPlaceholder } from "./ArtPlaceholder";

export function CollectionCard({ collection }: { collection: Collection }) {
  const live = collection.status === "live";

  return (
    <article className="panel group flex h-full min-w-0 flex-col p-4 sm:p-5">
      <div className="relative">
        <ArtPlaceholder
          tone={collection.tone}
          label={`${collection.name} — art pending`}
          className="aspect-square w-full"
        />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${
            live
              ? "bg-spectral text-[#04120c]"
              : "bg-wisp/90 text-[#0a0614]"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#04120c]" : "bg-[#0a0614]"}`} />
          {live ? "Mint live" : "In 1 month"}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold">{collection.name}</h3>
          <span className="chip">{collection.subtitle}</span>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{collection.blurb}</p>

        <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { k: "Supply", v: collection.supply },
            { k: "Price", v: collection.price },
            { k: "Chain", v: collection.chain },
          ].map(({ k, v }) => (
            <div key={k} className="panel-soft min-w-0 px-2 py-2.5">
              <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">{k}</dt>
              <dd className="mt-1 truncate font-display text-sm font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 space-y-2">
          {collection.highlights.map((item) => (
            <li key={item} className="flex min-w-0 items-start gap-2 text-sm text-bone/80">
              <span className="mt-[0.3rem] h-1.5 w-1.5 shrink-0 rounded-full bg-wisp" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2">
          <Link href={collection.href} className={`btn flex-1 ${live ? "btn-primary" : "btn-outline"}`}>
            {collection.cta}
          </Link>
          <Link
            href="#roadmap"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-wisp/50 hover:text-bone"
            aria-label="View roadmap"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
