"use client";

import { useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { mintAbi } from "@/lib/abi";
import {
  explorerToken,
  explorerTx,
  gen1Contract,
  gen1FloorEth,
  gen1MintConfigured,
  gen1PriceEth,
  links,
} from "@/lib/config";
import { errorMessage } from "@/lib/error";
import { useHydrated } from "@/lib/useHydrated";
import { targetChain } from "@/lib/wagmi";
import { WalletButton } from "./WalletButton";

export function MintPanel() {
  const hydrated = useHydrated();
  const { address, isConnected, chainId } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const readsEnabled = gen1MintConfigured;
  const { data: onchainPrice } = useReadContract({
    address: gen1Contract,
    abi: mintAbi,
    functionName: "GHOST_PRICE",
    query: { enabled: readsEnabled },
  });
  const { data: minted } = useReadContract({
    address: gen1Contract,
    abi: mintAbi,
    functionName: "totalSupply",
    query: { enabled: readsEnabled },
  });
  const { data: maxTokens } = useReadContract({
    address: gen1Contract,
    abi: mintAbi,
    functionName: "MAX_TOKENS",
    query: { enabled: readsEnabled },
  });
  const { data: balance } = useBalance({ address, query: { enabled: Boolean(address) } });

  const unitPrice = useMemo(() => onchainPrice ?? parseEther(gen1PriceEth), [onchainPrice]);

  const { writeContractAsync, isPending: isSigning, error: writeError, reset } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const receipt = useWaitForTransactionReceipt({ hash });

  const wrongChain = isConnected && chainId !== targetChain.id;
  const soldOut = minted !== undefined && maxTokens !== undefined && minted >= maxTokens;
  const insufficient = Boolean(balance && balance.value < unitPrice);

  const progress =
    minted !== undefined && maxTokens !== undefined && maxTokens > 0n
      ? Math.min(100, Number((minted * 10_000n) / maxTokens) / 100)
      : null;

  async function handleMint() {
    if (!gen1MintConfigured || soldOut) return;
    if (wrongChain) {
      switchChain({ chainId: targetChain.id });
      return;
    }
    try {
      const txHash = await writeContractAsync({
        address: gen1Contract,
        abi: mintAbi,
        functionName: "GhostMint",
        value: unitPrice,
      });
      setHash(txHash);
    } catch {
      // Surfaced through writeError below.
    }
  }

  let label = "Mint a ghost";
  if (!gen1MintConfigured) label = "Mint not configured";
  else if (!hydrated) label = "Loading wallet…";
  else if (!isConnected) label = "Connect wallet first";
  else if (wrongChain) label = isSwitching ? "Switching…" : `Switch to ${targetChain.name}`;
  else if (isSigning) label = "Confirm in wallet…";
  else if (receipt.isLoading) label = "Minting…";

  const disabled =
    !hydrated ||
    !gen1MintConfigured ||
    !isConnected ||
    isSwitching ||
    soldOut ||
    isSigning ||
    receipt.isLoading ||
    receipt.isSuccess;

  const failure = errorMessage(writeError) ?? errorMessage(receipt.error);

  return (
    <div className="panel p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">OG Collection</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Gary Ghosts</h2>
        </div>
        <span
          className={`chip ${
            soldOut
              ? "border-spectral/40 bg-spectral/10 !text-spectral"
              : gen1MintConfigured
                ? "border-spectral/40 bg-spectral/10 !text-spectral"
                : "border-wisp/40 bg-wisp/10 !text-wisp"
          }`}
        >
          {soldOut ? "Sold out" : gen1MintConfigured ? "Live" : "Preview"}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between text-xs text-muted">
          <span>{minted !== undefined ? minted.toLocaleString() : "—"} minted</span>
          <span>{maxTokens !== undefined ? maxTokens.toLocaleString() : "750"} supply</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/8">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ef7a33,#c2540f)] transition-[width] duration-500"
            style={{ width: `${progress ?? 100}%` }}
          />
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-2.5">
        <div className="panel-soft px-3.5 py-3">
          <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">Mint price</dt>
          <dd className="mt-1 font-display text-lg font-semibold">{formatEther(unitPrice)} ETH</dd>
        </div>
        <div className="panel-soft px-3.5 py-3">
          <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">Floor</dt>
          <dd className="mt-1 font-display text-lg font-semibold">{gen1FloorEth} ETH</dd>
        </div>
      </dl>

      <div className="mt-6 space-y-2.5">
        {soldOut ? (
          <>
            <a
              href={links.opensea}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-full !py-3.5"
            >
              Buy on OpenSea ↗
            </a>
            <p className="text-center text-[0.7rem] leading-relaxed text-muted">
              All {maxTokens !== undefined ? maxTokens.toLocaleString() : "750"} ghosts are
              minted. Secondary market only.
            </p>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleMint}
              disabled={disabled}
              className="btn btn-primary w-full !py-3.5"
            >
              {label}
            </button>

            {!isConnected && (
              <div className="flex justify-center">
                <WalletButton />
              </div>
            )}

            <p className="text-center text-[0.7rem] text-muted">
              One ghost per transaction · {formatEther(unitPrice)} ETH + gas
            </p>
          </>
        )}

        {insufficient && (
          <p className="rounded-xl bg-amber-500/10 px-3 py-2 text-xs text-amber-700">
            Balance looks short for one ghost plus gas.
          </p>
        )}

        {failure && (
          <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-700">{failure}</p>
        )}

        {receipt.isSuccess && hash && (
          <div className="rounded-xl border border-spectral/30 bg-spectral/10 px-3 py-2.5 text-xs text-spectral">
            <p className="font-semibold">Gary has been summoned.</p>
            <a
              href={explorerTx(hash)}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block underline decoration-spectral/40 underline-offset-2"
            >
              View transaction ↗
            </a>
            <button
              type="button"
              onClick={() => {
                setHash(undefined);
                reset();
              }}
              className="mt-2 block text-spectral/80 underline underline-offset-2 hover:text-spectral"
            >
              Mint another
            </button>
          </div>
        )}

        {!gen1MintConfigured && (
          <p className="text-[0.7rem] leading-relaxed text-muted">
            Preview mode: set{" "}
            <code className="rounded bg-black/6 px-1 py-0.5 text-bone/80">NEXT_PUBLIC_GEN1_CONTRACT</code>{" "}
            to the deployed contract to enable the transaction.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-4 text-[0.7rem] text-muted">
        <span>Contract</span>
        {gen1MintConfigured ? (
          <a
            href={explorerToken(gen1Contract)}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-bone/75 hover:text-wisp"
          >
            {gen1Contract.slice(0, 6)}…{gen1Contract.slice(-4)} ↗
          </a>
        ) : (
          <span className="font-mono text-bone/50">0x0000…0000</span>
        )}
      </div>
    </div>
  );
}
