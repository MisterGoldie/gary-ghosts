import { links } from "@/lib/config";

const nav = [
  { label: "X", href: links.x },
  { label: "Discord", href: links.discord },
  { label: "OpenSea", href: links.opensea },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline/70">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-5 py-7 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Gary Ghost</p>
        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
