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
  explorerAddress,
  explorerTx,
  gen1Contract,
  gen1MintConfigured,
  gen1PriceEth,
  maxPerWallet,
} from "@/lib/config";
import { errorMessage } from "@/lib/error";
import { useHydrated } from "@/lib/useHydrated";
import { targetChain } from "@/lib/wagmi";
import { WalletButton } from "./WalletButton";

const quantityOptions = Array.from({ length: maxPerWallet }, (_, index) => index + 1);

export function MintPanel() {
  const hydrated = useHydrated();
  const { address, isConnected, chainId } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [quantity, setQuantity] = useState(1);

  const readsEnabled = gen1MintConfigured;
  const { data: onchainPrice } = useReadContract({
    address: gen1Contract,
    abi: mintAbi,
    functionName: "price",
    query: { enabled: readsEnabled },
  });
  const { data: minted } = useReadContract({
    address: gen1Contract,
    abi: mintAbi,
    functionName: "totalSupply",
    query: { enabled: readsEnabled },
  });
  const { data: maxSupply } = useReadContract({
    address: gen1Contract,
    abi: mintAbi,
    functionName: "maxSupply",
    query: { enabled: readsEnabled },
  });
  const { data: mintOpen } = useReadContract({
    address: gen1Contract,
    abi: mintAbi,
    functionName: "mintOpen",
    query: { enabled: readsEnabled },
  });
  const { data: balance } = useBalance({ address, query: { enabled: Boolean(address) } });

  const unitPrice = useMemo(() => onchainPrice ?? parseEther(gen1PriceEth), [onchainPrice]);
  const total = unitPrice * BigInt(quantity);

  const { writeContractAsync, isPending: isSigning, error: writeError, reset } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const receipt = useWaitForTransactionReceipt({ hash });

  const wrongChain = isConnected && chainId !== targetChain.id;
  const closed = mintOpen === false;
  const insufficient = Boolean(balance && balance.value < total);

  const progress =
    minted !== undefined && maxSupply !== undefined && maxSupply > 0n
      ? Math.min(100, Number((minted * 10_000n) / maxSupply) / 100)
      : null;

  async function handleMint() {
    if (!gen1MintConfigured) return;
    if (wrongChain) {
      switchChain({ chainId: targetChain.id });
      return;
    }
    try {
      const txHash = await writeContractAsync({
        address: gen1Contract,
        abi: mintAbi,
        functionName: "mint",
        args: [BigInt(quantity)],
        value: total,
      });
      setHash(txHash);
    } catch {
      // Surfaced through writeError below.
    }
  }

  let label = "Mint now";
  if (!gen1MintConfigured) label = "Mint not configured";
  else if (!hydrated) label = "Loading wallet…";
  else if (!isConnected) label = "Connect wallet first";
  else if (wrongChain) label = isSwitching ? "Switching…" : `Switch to ${targetChain.name}`;
  else if (closed) label = "Mint closed";
  else if (isSigning) label = "Confirm in wallet…";
  else if (receipt.isLoading) label = "Minting…";

  const disabled =
    !hydrated ||
    !gen1MintConfigured ||
    !isConnected ||
    isSwitching ||
    closed ||
    isSigning ||
    receipt.isLoading ||
    receipt.isSuccess;

  const failure = errorMessage(writeError) ?? errorMessage(receipt.error);

  return (
    <div className="panel p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Gen 1 · Spectral Society</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Mint a spook</h2>
        </div>
        <span
          className={`chip ${
            gen1MintConfigured
              ? "border-spectral/40 bg-spectral/10 !text-spectral"
              : "border-wisp/40 bg-wisp/10 !text-wisp"
          }`}
        >
          {gen1MintConfigured ? "Live" : "Preview"}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between text-xs text-muted">
          <span>
            {minted !== undefined ? minted.toLocaleString() : "3,842"} minted
          </span>
          <span>{maxSupply !== undefined ? maxSupply.toLocaleString() : "5,000"} supply</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/8">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ef7a33,#c2540f)] transition-[width] duration-500"
            style={{ width: `${progress ?? 77}%` }}
          />
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-2.5">
        <div className="panel-soft px-3.5 py-3">
          <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">Price each</dt>
          <dd className="mt-1 font-display text-lg font-semibold">{formatEther(unitPrice)} ETH</dd>
        </div>
        <div className="panel-soft px-3.5 py-3">
          <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">Max / wallet</dt>
          <dd className="mt-1 font-display text-lg font-semibold">{maxPerWallet}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Quantity</p>
          <p className="text-xs text-muted">Total {formatEther(total)} ETH</p>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="grid h-10 w-10 place-items-center rounded-xl border border-black/12 text-lg text-bone transition-colors hover:border-wisp/50 disabled:opacity-40"
          >
            −
          </button>
          <div className="flex flex-1 gap-1.5" role="group" aria-label="Mint quantity">
            {quantityOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={quantity === option}
                onClick={() => setQuantity(option)}
                className={`h-10 flex-1 rounded-xl border text-sm font-semibold tabular-nums transition-colors ${
                  quantity === option
                    ? "border-wisp/70 bg-wisp/15 text-bone"
                    : "border-black/12 text-muted hover:border-black/25 hover:text-bone"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(maxPerWallet, q + 1))}
            disabled={quantity >= maxPerWallet}
            className="grid h-10 w-10 place-items-center rounded-xl border border-black/12 text-lg text-bone transition-colors hover:border-wisp/50 disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
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

        {insufficient && (
          <p className="rounded-xl bg-amber-500/10 px-3 py-2 text-xs text-amber-700">
            Balance looks short for {quantity} spook{quantity > 1 ? "s" : ""} plus gas.
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
            to a deployed mint contract to enable the transaction.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-4 text-[0.7rem] text-muted">
        <span>Contract</span>
        {gen1MintConfigured ? (
          <a
            href={explorerAddress(gen1Contract)}
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
