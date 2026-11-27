# Gary Ghost — Web3 site

Marketing + mint site for the **Gary Ghost** NFT brand. Two collections:

| Collection | Status | Route |
| --- | --- | --- |
| Spectral Society (Gen 1) | Mint live | `/mint` |
| Gary Ghosts V2 | December 22, 2026 at 8:00 AM CST | `/v2` |

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, wagmi v2 + viem.

```bash
npm install
cp .env.example .env.local   # fill in the values you have
npm run dev                  # http://localhost:3000
```

## Environment

Environment variables are optional. OG minting defaults to the existing Gary Ghosts contract on Ethereum mainnet.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GEN1_CONTRACT` | OG contract override. Defaults to `0x396b3e128bb62a71813f4ef42bbe66ed2cc657df`. |
| `NEXT_PUBLIC_GEN2_CONTRACT` | V2 contract override. Defaults to `0x44fc0be497a6e882aa2c6751315e888df37bace6`. |
| `NEXT_PUBLIC_CHAIN_ID` | `1` (Ethereum) or `11155111` (Sepolia). Default `1`. |
| `NEXT_PUBLIC_GEN1_PRICE_ETH` | Display/fallback price. Default `0.05`. Transactions use the on-chain `GHOST_PRICE`. |
| `NEXT_PUBLIC_GEN2_MINT_DATE` | V2 countdown timestamp. Defaults to `2026-12-22T14:00:00.000Z` (8:00 AM CST). |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Adds the WalletConnect connector when set. |
| `NEXT_PUBLIC_LINK_X` / `_DISCORD` / `_OPENSEA` / `_ETHERSCAN` | Social + explorer links. |

## Placeholders to replace before launch

- **Art** — every image is a colored block from [`ArtPlaceholder`](src/components/ArtPlaceholder.tsx). Swap in real renders (or `next/image`) at the call sites: hero, collection cards, gallery, `/mint`, `/v2`.
- **Copy + stats** — collection metadata lives in [`src/lib/collections.ts`](src/lib/collections.ts).
- **OG mint** uses `GhostMint()` with no arguments: one ghost per transaction at `GHOST_PRICE` plus gas. `tokenCount()` is the minted count; `MAX_TOKENS` is the cap. The site simulates each mint before wallet approval, waits for an Ethereum receipt, then refreshes the count and balance.
- **Allowlist form** — [`WaitlistForm`](src/components/WaitlistForm.tsx) validates and fakes success; wire it to a route handler or provider.
- **Metadata** — `metadataBase` in [`src/app/layout.tsx`](src/app/layout.tsx) is a placeholder domain.

## Migration note

OG contract reads, mint transactions, balances, and confirmations use the configured target chain (Ethereum mainnet by default), even when the wallet starts on a different chain.

Injected browser wallets and Coinbase Wallet work without extra configuration. WalletConnect QR/mobile connections additionally require `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`.
