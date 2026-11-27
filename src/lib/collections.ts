import { gen1FloorEth, gen1PriceEth, gen1Supply } from "./config";

export type CollectionStatus = "live" | "upcoming";

export type Collection = {
  id: "gen1" | "gen2";
  name: string;
  subtitle: string;
  status: CollectionStatus;
  supply: string;
  price: string;
  chain: string;
  blurb: string;
  highlights: string[];
  href: string;
  cta: string;
  tone: "wisp" | "spectral";
  traits: { label: string; value: string }[];
};

export const collections: Collection[] = [
  {
    id: "gen1",
    name: "Gary Ghosts",
    subtitle: "OG Collection",
    status: "live",
    supply: gen1Supply.toLocaleString(),
    price: `${gen1PriceEth} ETH`,
    chain: "Ethereum",
    blurb: `The original ${gen1Supply} ghosts — hand-drawn, randomised, and minted out at ${gen1PriceEth} ETH. The only way in now is the secondary market.`,
    highlights: [
      `${gen1Supply} hand-drawn ghosts`,
      "Sold out · trade on OpenSea",
      "Art pinned to IPFS",
    ],
    href: "/mint",
    cta: "Mint Gen 1",
    tone: "wisp",
    traits: [
      { label: "Auras", value: "12" },
      { label: "Sheets", value: "9" },
      { label: "Eyes", value: "24" },
      { label: "Curses", value: "6" },
    ],
  },
  {
    id: "gen2",
    name: "Afterlife Arcade",
    subtitle: "Gen 2",
    status: "upcoming",
    supply: "2,500",
    price: "TBA",
    chain: "Ethereum",
    blurb:
      "Gary found a haunted arcade cabinet. Gen 2 bends the art into low-poly pixel spooks with playable trait perks, launching in one month.",
    highlights: [
      "2,500 pixel spooks",
      "Allowlist opens 48h early",
      "Gen 1 holders mint free (1:1)",
    ],
    href: "/afterlife",
    cta: "See the reveal",
    tone: "spectral",
    traits: [
      { label: "Cabinets", value: "8" },
      { label: "Pixels", value: "32px" },
      { label: "Perks", value: "4" },
      { label: "Rarities", value: "5" },
    ],
  },
];

export const stats = [
  { label: "Supply", value: gen1Supply.toLocaleString() },
  { label: "Minted", value: gen1Supply.toLocaleString() },
  { label: "Holders", value: "206" },
  { label: "Floor", value: `${gen1FloorEth} ETH` },
];

export const roadmap = [
  {
    phase: "Phase 01",
    title: "Manifest",
    status: "Shipped",
    body: "Gen 1 minted out its first wave. Site, contracts and the ghost den all went live without a single scare.",
  },
  {
    phase: "Phase 02",
    title: "The Haunting",
    status: "In progress",
    body: "Gen 2 — Afterlife Arcade — drops in one month with pixel traits, playable perks, and a free 1:1 claim for Gen 1 holders.",
  },
  {
    phase: "Phase 03",
    title: "Possession",
    status: "Next",
    body: "Stake a spook, earn Ectoplasm, and dress your ghost up in community-designed sheets and cursed accessories.",
  },
  {
    phase: "Phase 04",
    title: "Séance",
    status: "Later",
    body: "IRL haunting: pop-ups, artist collabs, and a very small, very haunted merch run nobody asked for.",
  },
];

export const faqs = [
  {
    q: "What actually is Gary Ghost?",
    a: "A ghost. Gary. The OG Collection is 750 hand-drawn Gary Ghosts on Ethereum — all minted out. Afterlife Arcade (Gen 2) is the follow-up.",
  },
  {
    q: "How much does a ghost cost?",
    a: `The mint sold out at ${gen1PriceEth} ETH plus gas, one ghost per transaction. New ones are bought from holders on the secondary market — the OpenSea floor was around ${gen1FloorEth} ETH at the time of writing.`,
  },
  {
    q: "Do I need a wallet?",
    a: "Only to mint. Browsing the site is wallet-free. The mint button supports any injected wallet (MetaMask, Rabby, Coinbase Wallet) plus WalletConnect if configured.",
  },
  {
    q: "Is the art final?",
    a: "No — every tile on this site is a placeholder block. Real artwork, metadata and the final contract addresses get swapped in before launch.",
  },
  {
    q: "What does holding get me?",
    a: "Ghost den access, the Gen 2 free claim, early access to every future drop, and a vote on where the Ectoplasm treasury goes.",
  },
];
