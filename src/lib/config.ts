import { OG_MAINNET_ADDRESS } from "./mint-target";
const ZERO = "0x0000000000000000000000000000000000000000";

/** Deployed V2 collection. */
const GEN2_DEFAULT = "0x44fc0be497a6e882aa2c6751315e888df37bace6";

function address(raw: string | undefined): `0x${string}` {
  const value = (raw ?? "").trim();
  if (/^0x[a-fA-F0-9]{40}$/.test(value)) return value as `0x${string}`;
  return ZERO as `0x${string}`;
}

export const ZERO_ADDRESS = ZERO as `0x${string}`;

/** Verified live OG contract on Ethereum mainnet. */
if (process.env.NEXT_PUBLIC_GEN1_CONTRACT && process.env.NEXT_PUBLIC_GEN1_CONTRACT.toLowerCase() !== OG_MAINNET_ADDRESS) {
  throw new Error("The live OG contract must match the verified Gary Ghosts address.");
}
export const gen1Contract = OG_MAINNET_ADDRESS;
/** Upcoming collection (Gen 2). */
export const gen2Contract = address(process.env.NEXT_PUBLIC_GEN2_CONTRACT || GEN2_DEFAULT);

export const gen1MintConfigured = gen1Contract !== ZERO_ADDRESS;
export const gen2MintConfigured = gen2Contract !== ZERO_ADDRESS;

/** Fallback values; the panel prefers the live GHOST_PRICE / MAX_TOKENS reads. */
export const gen1PriceEth = process.env.NEXT_PUBLIC_GEN1_PRICE_ETH ?? "0.05";
export const gen1Supply = 750;
/** Last known OpenSea floor — market data, so it is a manual figure. */
export const gen1FloorEth = "0.02";

export const gen2MintDate = new Date(
  process.env.NEXT_PUBLIC_GEN2_MINT_DATE ?? "2026-12-22T14:00:00.000Z",
);

export const gen2Supply = 750;
export const gen2LaunchLabel = gen2MintDate.toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Chicago",
  timeZoneName: "short",
});

export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const links = {
  x: process.env.NEXT_PUBLIC_LINK_X ?? "https://x.com/GoldiesNFTart",
  discord: process.env.NEXT_PUBLIC_LINK_DISCORD ?? "https://discord.gg/7f6EQhswWt",
  opensea: process.env.NEXT_PUBLIC_LINK_OPENSEA ?? "https://opensea.io/collection/gary-ghosts",
  openseaV2: process.env.NEXT_PUBLIC_LINK_OPENSEA_V2 ?? "https://opensea.io/collection/gary-ghosts-v2",
  etherscan: process.env.NEXT_PUBLIC_LINK_ETHERSCAN ?? "https://etherscan.io",
};

export function explorerTx(hash: string) {
  return `${links.etherscan}/tx/${hash}`;
}

export function explorerAddress(addr: string) {
  return `${links.etherscan}/address/${addr}`;
}

export function explorerToken(addr: string) {
  return `${links.etherscan}/token/${addr}`;
}
