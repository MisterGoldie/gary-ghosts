import type { Metadata } from "next";
import { Architects_Daughter, Caveat_Brush } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { gen2LaunchLabel } from "@/lib/config";

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
    "Explore Gary Ghosts and Gary Ghosts V2. V2 launches " + gen2LaunchLabel + ".",
  openGraph: {
    title: "Gary Ghost — Two collections. One ghost.",
    description:
      "The original Gary Ghosts are available to mint. Gary Ghosts V2 launches " + gen2LaunchLabel + ".",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gary Ghost — Two collections. One ghost.",
    description:
      "The original Gary Ghosts are available to mint. Gary Ghosts V2 launches " + gen2LaunchLabel + ".",
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
