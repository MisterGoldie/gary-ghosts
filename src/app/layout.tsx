import type { Metadata } from "next";
import { Architects_Daughter, Caveat_Brush } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const display = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-google",
  display: "swap",
});

const body = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body-google",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://garyghost.example"),
  title: {
    default: "Gary Ghost — Two collections. One ghost.",
    template: "%s · Gary Ghost",
  },
  description:
    "Gary Ghost is an NFT brand with two generative collections: Spectral Society (Gen 1, live now) and Afterlife Arcade (Gen 2, dropping in one month).",
  openGraph: {
    title: "Gary Ghost — Two collections. One ghost.",
    description:
      "Gen 1 Spectral Society is live. Gen 2 Afterlife Arcade rises in one month.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gary Ghost — Two collections. One ghost.",
    description:
      "Gen 1 Spectral Society is live. Gen 2 Afterlife Arcade rises in one month.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
