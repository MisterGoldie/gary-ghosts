const ZERO = "0x0000000000000000000000000000000000000000";

function address(raw: string | undefined): `0x${string}` {
  const value = (raw ?? "").trim();
  if (/^0x[a-fA-F0-9]{40}$/.test(value)) return value as `0x${string}`;
  return ZERO as `0x${string}`;
}

export const ZERO_ADDRESS = ZERO as `0x${string}`;

/** Live collection (Gen 1). Set NEXT_PUBLIC_GEN1_CONTRACT to enable minting. */
export const gen1Contract = address(process.env.NEXT_PUBLIC_GEN1_CONTRACT);
/** Upcoming collection (Gen 2). */
export const gen2Contract = address(process.env.NEXT_PUBLIC_GEN2_CONTRACT);

export const gen1MintConfigured = gen1Contract !== ZERO_ADDRESS;
export const gen2MintConfigured = gen2Contract !== ZERO_ADDRESS;

export const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 1) || 1;

/** Fallback price used only when the contract read is unavailable. */
export const gen1PriceEth = process.env.NEXT_PUBLIC_GEN1_PRICE_ETH ?? "0.035";
export const maxPerWallet = Number(process.env.NEXT_PUBLIC_MAX_PER_WALLET ?? 5) || 5;

export const gen2MintDate = new Date(
  process.env.NEXT_PUBLIC_GEN2_MINT_DATE ?? "2026-12-26T18:00:00.000Z",
);

export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const links = {
  x: process.env.NEXT_PUBLIC_LINK_X ?? "https://x.com",
  discord: process.env.NEXT_PUBLIC_LINK_DISCORD ?? "https://discord.com",
  opensea: process.env.NEXT_PUBLIC_LINK_OPENSEA ?? "https://opensea.io",
  etherscan: process.env.NEXT_PUBLIC_LINK_ETHERSCAN ?? "https://etherscan.io",
};

export function explorerTx(hash: string) {
  return `${links.etherscan}/tx/${hash}`;
}

export function explorerAddress(addr: string) {
  return `${links.etherscan}/address/${addr}`;
}
