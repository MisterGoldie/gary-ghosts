import { gen1FloorEth, gen1PriceEth, gen1Supply, gen2LaunchLabel, gen2Supply } from "./config";

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
    blurb: `The original ${gen1Supply} ghosts — hand-drawn, randomised, and available to mint at ${gen1PriceEth} ETH plus gas.`,
    highlights: [
      `${gen1Supply} hand-drawn ghosts`,
      "Mint one ghost per transaction",
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
    name: "Gary Ghosts V2",
    subtitle: "V2",
    status: "upcoming",
    supply: gen2Supply.toLocaleString(),
    price: "TBA",
    chain: "Ethereum",
    blurb: "A revamped version of the original 2022 Gary Ghosts collection. Launching " + gen2LaunchLabel + ".",
    highlights: [
      gen2Supply + " Gary Ghosts",
      "Launch: " + gen2LaunchLabel,
      "View the collection on OpenSea",
    ],
    href: "/v2",
    cta: "Explore V2",
    tone: "spectral",
    traits: [],
  },
];

export const stats = [
  { label: "Supply", value: gen1Supply.toLocaleString() },
  // Etherscan holder snapshot, checked November 26, 2026.
  { label: "Holders", value: "199" },
  { label: "Floor", value: `${gen1FloorEth} ETH` },
];

export const roadmap = [
  {
    phase: "Phase 01",
    title: "Manifest",
    status: "Shipped",
    body: "Gen 1 launched. Site, contracts and the ghost den all went live without a single scare.",
  },
  {
    phase: "Phase 02",
    title: "The Haunting",
    status: "In progress",
    body: "Gary Ghosts V2 launches " + gen2LaunchLabel + ".",
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
    a: "A ghost. Gary. The OG Collection is 750 hand-drawn Gary Ghosts on Ethereum. Gary Ghosts V2 is the follow-up.",
  },
  {
    q: "How much does a ghost cost?",
    a: `Mint a ghost for ${gen1PriceEth} ETH plus gas, one ghost per transaction. You can also browse holder listings on OpenSea.`,
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
    a: "Ownership of a Gary Ghost from the original collection. Explore Gary Ghosts V2 on its collection page.",
  },
];
