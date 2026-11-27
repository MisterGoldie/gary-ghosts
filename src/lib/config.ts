const ZERO = "0x0000000000000000000000000000000000000000";

/** Deployed Gen 1 contract — Gary Ghosts (OG Collection), 750 tokens. */
const GEN1_DEFAULT = "0x396b3e128bb62a71813f4ef42bbe66ed2cc657df";

function address(raw: string | undefined): `0x${string}` {
  const value = (raw ?? "").trim();
  if (/^0x[a-fA-F0-9]{40}$/.test(value)) return value as `0x${string}`;
  return ZERO as `0x${string}`;
}

export const ZERO_ADDRESS = ZERO as `0x${string}`;

/** Live collection (Gen 1). Override with NEXT_PUBLIC_GEN1_CONTRACT. */
export const gen1Contract = address(process.env.NEXT_PUBLIC_GEN1_CONTRACT || GEN1_DEFAULT);
/** Upcoming collection (Gen 2). */
export const gen2Contract = address(process.env.NEXT_PUBLIC_GEN2_CONTRACT);

export const gen1MintConfigured = gen1Contract !== ZERO_ADDRESS;
export const gen2MintConfigured = gen2Contract !== ZERO_ADDRESS;

export const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 1) || 1;

/** Fallback values; the panel prefers the live GHOST_PRICE / MAX_TOKENS reads. */
export const gen1PriceEth = process.env.NEXT_PUBLIC_GEN1_PRICE_ETH ?? "0.05";
export const gen1Supply = 750;
/** Last known OpenSea floor — market data, so it is a manual figure. */
export const gen1FloorEth = "0.02";

export const gen2MintDate = new Date(
  process.env.NEXT_PUBLIC_GEN2_MINT_DATE ?? "2026-12-26T18:00:00.000Z",
);

export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const links = {
  x: process.env.NEXT_PUBLIC_LINK_X ?? "https://x.com",
  discord: process.env.NEXT_PUBLIC_LINK_DISCORD ?? "https://discord.com",
  opensea: process.env.NEXT_PUBLIC_LINK_OPENSEA ?? "https://opensea.io/collection/gary-ghosts",
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
