import Link from "next/link";
import { HeroCrossfade } from "@/components/HeroCrossfade";

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-3xl flex-col items-center justify-center px-5 py-12 text-center">
      <HeroCrossfade />

      <h1 className="mt-8 font-display text-5xl font-bold leading-none sm:text-6xl">
        Gary <span className="text-wisp">Ghosts</span>
      </h1>

      <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
        Two collections. One extremely polite ghost.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/mint" className="btn btn-primary">
          OG
        </Link>
        <Link href="/v2" className="btn btn-outline">
          V2
        </Link>
      </div>
    </section>
  );
}
