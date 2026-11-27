import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/mint", label: "Gen 1" },
  { href: "/afterlife", label: "Gen 2" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-void/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-5xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/sidelogo.png"
            alt="Gary Ghost"
            width={1000}
            height={630}
            priority
            sizes="96px"
            className="h-14 w-auto mix-blend-multiply"
          />
        </Link>

        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
