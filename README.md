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

Everything is optional — the site runs in "preview" mode without env vars.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GEN1_CONTRACT` | Gen 1 mint contract. **Required to enable minting.** |
| `NEXT_PUBLIC_GEN2_CONTRACT` | V2 contract override. Defaults to `0x44fc0be497a6e882aa2c6751315e888df37bace6`. |
| `NEXT_PUBLIC_CHAIN_ID` | `1` (Ethereum) or `11155111` (Sepolia). Default `1`. |
| `NEXT_PUBLIC_GEN1_PRICE_ETH` | Display/fallback price. Default `0.035`. |
| `NEXT_PUBLIC_MAX_PER_WALLET` | Quantity cap. Default `5`. |
| `NEXT_PUBLIC_GEN2_MINT_DATE` | V2 countdown timestamp. Defaults to `2026-12-22T14:00:00.000Z` (8:00 AM CST). |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Adds the WalletConnect connector when set. |
| `NEXT_PUBLIC_LINK_X` / `_DISCORD` / `_OPENSEA` / `_ETHERSCAN` | Social + explorer links. |

## Placeholders to replace before launch

- **Art** — every image is a colored block from [`ArtPlaceholder`](src/components/ArtPlaceholder.tsx). Swap in real renders (or `next/image`) at the call sites: hero, collection cards, gallery, `/mint`, `/v2`.
- **Copy + stats** — collection metadata lives in [`src/lib/collections.ts`](src/lib/collections.ts).
- **Contract ABIs** — [`src/lib/abi.ts`](src/lib/abi.ts) expects `mint(uint256)` (payable), `price()`, `totalSupply()`, `maxSupply()`, `mintOpen()`. Adjust if your contract differs.
- **Allowlist form** — [`WaitlistForm`](src/components/WaitlistForm.tsx) validates and fakes success; wire it to a route handler or provider.
- **Metadata** — `metadataBase` in [`src/app/layout.tsx`](src/app/layout.tsx) is a placeholder domain.

## Migration note

wagmi reads the *connected* chain. If you later ship with `ssr: true`, switch the
wagmi storage to `cookieStorage` and hydrate with `cookieToInitialState`.
