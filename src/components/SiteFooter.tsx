import Link from "next/link";
import { links } from "@/lib/config";

const columns = [
  {
    title: "Collections",
    items: [
      { label: "Spectral Society (Gen 1)", href: "/mint" },
      { label: "Afterlife Arcade (Gen 2)", href: "/afterlife" },
      { label: "Roadmap", href: "/#roadmap" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "X / Twitter", href: links.x },
      { label: "Discord", href: links.discord },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Marketplace",
    items: [
      { label: "OpenSea", href: links.opensea },
      { label: "Etherscan", href: links.etherscan },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/8 bg-black/30">
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-xl font-bold tracking-tight">
              Gary<span className="text-wisp">Ghost</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              A very polite ghost with an extremely haunted portfolio. Two
              generative collections living on Ethereum.
            </p>
            <span className="chip mt-5">Preview build</span>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-wisp"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gary Ghost. All spooks reserved.</p>
          <p className="max-w-md sm:text-right">
            Placeholder art, data, and contract addresses. Nothing here is
            financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
