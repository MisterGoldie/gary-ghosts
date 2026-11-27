import Link from "next/link";
import { ArtPlaceholder } from "@/components/ArtPlaceholder";
import { CollectionCard } from "@/components/CollectionCard";
import { Countdown, DaysLeft } from "@/components/Countdown";
import { WaitlistForm } from "@/components/WaitlistForm";
import { gen1PriceEth, gen2MintDate, links } from "@/lib/config";
import { collections, faqs, roadmap, stats } from "@/lib/collections";

const steps = [
  {
    title: "Connect",
    body: "Any injected wallet works — MetaMask, Rabby, Coinbase Wallet. WalletConnect is enabled when a project ID is set.",
  },
  {
    title: "Pick your spooks",
    body: `Up to 5 per wallet. Gen 1 is ${gen1PriceEth} ETH each plus gas; the panel quotes the live contract price.`,
  },
  {
    title: "Get haunted",
    body: "Metadata reveals immediately. Holders unlock the ghost den, the Gen 2 free claim, and every future drop.",
  },
];

const marqueeWords = [
  "Spectral Society",
  "Afterlife Arcade",
  "5,000 spooks",
  "One polite ghost",
  "Gen 2 in 30 days",
];

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{children}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="border-b border-white/8 bg-wisp/10">
        <p className="mx-auto w-full max-w-6xl px-5 py-2 text-center text-[0.7rem] uppercase tracking-[0.18em] text-wisp">
          Preview build · placeholder art, data &amp; contract addresses
        </p>
      </div>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-14 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-20">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip border-spectral/40 bg-spectral/10 text-spectral">
                <span className="h-1.5 w-1.5 rounded-full bg-spectral" /> Gen 1 mint live
              </span>
              <span className="chip">Gen 2 in 30 days</span>
            </div>

            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.9] sm:text-7xl lg:text-8xl">
              Gary <span className="glow-text text-wisp">Ghost</span>
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-bone/75">
              Two generative collections. One extremely polite ghost. Spectral
              Society is minting now; Afterlife Arcade rises from the crypt in
              one month.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/mint" className="btn btn-primary">
                Mint Gen 1
              </Link>
              <Link href="/afterlife" className="btn btn-outline">
                See Gen 2
              </Link>
              <Link
                href={links.discord}
                className="text-sm text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-bone"
              >
                Join the ghost den
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/8 pt-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-2xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-wisp/20 blur-3xl" aria-hidden="true" />
            <ArtPlaceholder
              tone="wisp"
              label="Hero key art — Gary, front-facing"
              className="aspect-square w-full animate-float shadow-[0_40px_120px_-60px_rgba(181,140,255,0.9)]"
            />
            <div className="panel absolute left-2 top-1/2 -translate-y-1/2 px-4 py-3 sm:-left-7">
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">Gen 1 price</p>
              <p className="font-display text-lg font-semibold text-bone">{gen1PriceEth} ETH</p>
            </div>
            <div className="panel absolute right-2 top-6 px-4 py-3 sm:-right-6">
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">Gen 2 drops in</p>
              <p className="font-display text-lg font-semibold text-spectral">
                <DaysLeft
                  target={gen2MintDate.toISOString()}
                  fallback={Math.max(
                    0,
                    Math.ceil((gen2MintDate.getTime() - Date.now()) / 86_400_000),
                  )}
                />{" "}
                days
              </p>
            </div>
          </div>
        </div>

        <div className="relative border-y border-white/8 bg-black/25 py-3 marquee-mask">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap pr-8">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-8" aria-hidden={copy === 1}>
                {marqueeWords.map((word) => (
                  <span
                    key={word}
                    className="flex items-center gap-8 text-[0.7rem] uppercase tracking-[0.28em] text-muted"
                  >
                    {word}
                    <span className="text-wisp">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collections" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Two collections" title="One ghost, two afterlives">
            Gen 1 is hand-drawn portraiture in the Spectral Society. Gen 2 goes
            pixel — a haunted arcade cabinet that only Gary knows how to switch
            on.
          </SectionHeading>
          <p className="chip shrink-0">Both on Ethereum</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5">
        <div className="panel overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
            <div className="border-b border-white/8 p-7 md:border-b-0 md:border-r sm:p-9">
              <p className="eyebrow">Gen 2 countdown</p>
              <h2 className="mt-3 font-display text-3xl font-semibold">Afterlife Arcade</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                2,500 pixel spooks, playable perks, and a free 1:1 claim for Gen 1
                holders. Allowlist opens 48 hours early.
              </p>
              <div className="mt-6">
                <Countdown target={gen2MintDate.toISOString()} />
              </div>
              <p className="mt-4 text-xs text-muted">
                Mint opens{" "}
                {gen2MintDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}{" "}
                · 18:00 UTC
              </p>
            </div>
            <div className="p-7 sm:p-9">
              <p className="eyebrow">Allowlist</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">Get in the crypt first</h3>
              <p className="mt-2 text-sm text-muted">
                Drop your email and we&apos;ll send the mint link before the
                public window.
              </p>
              <div className="mt-5">
                <WaitlistForm />
              </div>
              <Link
                href="/afterlife"
                className="mt-5 inline-flex text-sm text-wisp underline decoration-wisp/30 underline-offset-4 hover:decoration-wisp"
              >
                Full Gen 2 details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
        <SectionHeading eyebrow="How it works" title="Minting, without the nonsense">
          Three steps. No hidden phases, no gas wars, no mysterious wallet
          prompts that drain your soul.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="panel p-6">
              <span className="font-display text-sm text-wisp/70">0{index + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Trait preview" title="The society, in blocks" />
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            Placeholder tiles — real renders drop into the same grid. Palette,
            framing and crop ratios are production-ready.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ArtPlaceholder
              key={index}
              index={index + 1}
              tone={index % 3 === 0 ? "wisp" : index % 3 === 1 ? "ink" : "spectral"}
              label={["Hooded", "Sheeted", "Lantern", "Cursed", "Rookie", "Elder", "Twin", "Wanderer"][index]}
              className="aspect-square"
              size="1 / 1"
            />
          ))}
        </div>
      </section>

      <section id="roadmap" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 lg:py-24">
        <SectionHeading eyebrow="Roadmap" title="Where the haunting goes next">
          Four phases, loosely plotted. Gary is not a fan of hard deadlines, but
          the ghost den votes on priorities each month.
        </SectionHeading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {roadmap.map((item) => (
            <div key={item.phase} className="panel relative p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-wisp/80">
                  {item.phase}
                </span>
                <span
                  className={`chip ${
                    item.status === "Shipped"
                      ? "border-spectral/40 bg-spectral/10 !text-spectral"
                      : item.status === "In progress"
                        ? "border-wisp/40 bg-wisp/10 !text-wisp"
                        : ""
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-4xl scroll-mt-24 px-5">
        <SectionHeading eyebrow="FAQ" title="Questions Gary gets a lot" />
        <div className="mt-8 divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-white/2 px-5 py-4 open:bg-white/4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-bone">
                {faq.q}
                <span className="text-wisp transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
        <div className="panel relative overflow-hidden p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(181,140,255,0.25),transparent_70%)]"
            aria-hidden="true"
          />
          <p className="eyebrow">Last call</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
            Come get haunted.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Gen 1 is live and Gen 2 is a month out. Grab a spook, join the den,
            and vote on what Gary does next.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/mint" className="btn btn-primary">
              Mint Spectral Society
            </Link>
            <Link href="/afterlife" className="btn btn-outline">
              Gen 2 countdown
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
