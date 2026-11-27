"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatEther, parseEther, type Address } from "viem";
import {
  useAccount,
  useBalance,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { mintAbi } from "@/lib/abi";
import {
  gen1Contract,
  gen1FloorEth,
  gen1MintConfigured,
  gen1PriceEth,
} from "@/lib/config";
import { errorMessage } from "@/lib/error";
import { useHydrated } from "@/lib/useHydrated";
import { targetChain } from "@/lib/wagmi";
import { assertExactOgCode, confirmedMintToken, createMintRequest } from "@/lib/mint-target";
import { WalletButton } from "./WalletButton";

export function MintPanel() {
  const explorerToken = (address: string) => `${targetChain.blockExplorers.default.url}/token/${address}`;
  const explorerTx = (hash: string) => `${targetChain.blockExplorers.default.url}/tx/${hash}`;
  const hydrated = useHydrated();
  const { address, isConnected, chainId } = useAccount();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: targetChain.id });

  const readsEnabled = gen1MintConfigured;
  const { data: onchainPrice, isError: priceError, refetch: refetchPrice } = useReadContract({
    address: gen1Contract,
    chainId: targetChain.id,
    abi: mintAbi,
    functionName: "GHOST_PRICE",
    query: { enabled: readsEnabled },
  });
  const { data: minted, refetch: refetchMinted } = useReadContract({
    address: gen1Contract,
    chainId: targetChain.id,
    abi: mintAbi,
    functionName: "tokenCount",
    query: { enabled: readsEnabled, refetchInterval: 12_000 },
  });
  const { data: maxTokens } = useReadContract({
    address: gen1Contract,
    chainId: targetChain.id,
    abi: mintAbi,
    functionName: "MAX_TOKENS",
    query: { enabled: readsEnabled },
  });
  const { data: balance, refetch: refetchBalance } = useBalance({
    address,
    chainId: targetChain.id,
    query: { enabled: Boolean(address) },
  });

  const unitPrice = useMemo(() => onchainPrice ?? parseEther(gen1PriceEth), [onchainPrice]);

  const { writeContractAsync, isPending: isSigning, error: writeError, reset } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const mintLock = useRef(false);
  const [mintRecipient, setMintRecipient] = useState<Address>();
  const [isChecking, setIsChecking] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const receipt = useWaitForTransactionReceipt({ hash, chainId: targetChain.id });
  const mintedTokenId = receipt.data && mintRecipient ? confirmedMintToken(receipt.data, mintRecipient) : undefined;
  const mintSucceeded = mintedTokenId !== undefined;

  useEffect(() => {
    if (!mintSucceeded) return;
    void refetchMinted();
    void refetchBalance();
  }, [mintSucceeded, refetchMinted, refetchBalance]);

  const wrongChain = isConnected && chainId !== targetChain.id;
  const insufficient = Boolean(balance && balance.value < unitPrice);

  const progress =
    minted !== undefined && maxTokens !== undefined && maxTokens > 0n
      ? Math.min(100, Number((minted * 10_000n) / maxTokens) / 100)
      : null;

  async function handleMint() {
    if (!address || mintLock.current || isSigning || hash) return;
    mintLock.current = true;
    setActionError(null);
    try {
      if (wrongChain) {
        await switchChainAsync({ chainId: targetChain.id });
        return;
      }
      if (!publicClient || onchainPrice === undefined) return;
      setIsChecking(true);
      reset();
      assertExactOgCode(await publicClient.getCode({ address: gen1Contract }));
      const { chainId: mintChainId, ...mintRequest } = createMintRequest(address, onchainPrice);
      await publicClient.simulateContract(mintRequest);
      const txHash = await writeContractAsync({ ...mintRequest, chainId: mintChainId });
      setMintRecipient(address);
      setHash(txHash);
    } catch (error) {
      setActionError(errorMessage(error));
    } finally {
      mintLock.current = false;
      setIsChecking(false);
    }
  }

  function resetMint() {
    setHash(undefined);
    setMintRecipient(undefined);
    reset();
    setActionError(null);
  }

  let label = "Mint a ghost";
  if (!gen1MintConfigured) label = "Mint not configured";
  else if (!hydrated) label = "Loading wallet…";
  else if (!isConnected) label = "Connect wallet first";
  else if (wrongChain) label = isSwitching ? "Switching…" : `Switch to ${targetChain.name}`;
  else if (isSigning) label = "Confirm in wallet…";
  else if (isChecking) label = "Checking mint…";
  else if (mintSucceeded) label = "Mint confirmed";
  else if (hash) label = receipt.isError ? "Check transaction" : "Minting…";
  else if (priceError && onchainPrice === undefined) label = "Mint price unavailable";
  else if (onchainPrice === undefined) label = "Loading mint price…";

  const disabled =
    !hydrated ||
    !gen1MintConfigured ||
    !isConnected ||
    isSwitching ||
    isChecking ||
    isSigning ||
    Boolean(hash) ||
    (!wrongChain && (!publicClient || onchainPrice === undefined));

  const failure = actionError ?? errorMessage(writeError) ?? errorMessage(receipt.error) ??
    (receipt.isSuccess && !mintSucceeded ? "The transaction did not contain a matching NFT mint. Check its status before trying again." : null);

  return (
    <div className="panel p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">OG Collection</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Gary Ghosts</h2>
        </div>
        <span
          className={`chip ${
            gen1MintConfigured
              ? "border-spectral/40 bg-spectral/10 !text-spectral"
              : "border-wisp/40 bg-wisp/10 !text-wisp"
          }`}
        >
          Live
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
            style={{ width: `${progress ?? 0}%` }}
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
        <button
          type="button"
          onClick={handleMint}
          disabled={disabled}
          className="btn btn-primary w-full !py-3.5"
        >
          {label}
        </button>

        <div className="flex justify-center">
          <WalletButton />
        </div>

        <p className="text-center text-[0.7rem] text-muted">
          One ghost per transaction · {formatEther(unitPrice)} ETH + gas
        </p>

        {priceError && onchainPrice === undefined && (
          <p className="text-center text-xs text-muted">
            Could not load the mint price.{" "}
            <button type="button" onClick={() => void refetchPrice()} className="underline underline-offset-2">
              Try again
            </button>
          </p>
        )}

        {hash && !mintSucceeded && (
          <div className="text-center text-xs text-muted">
            <a href={explorerTx(hash)} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              View transaction
            </a>
            {(receipt.isError || (receipt.isSuccess && !mintSucceeded)) && (
              <button type="button" onClick={() => void receipt.refetch()} className="ml-3 underline underline-offset-2">
                Check confirmation again
              </button>
            )}
            {receipt.isError && (
              <>
                <p className="mt-2">Check the transaction status before starting another mint.</p>
                <button type="button" onClick={resetMint} className="mt-2 underline underline-offset-2">
                  Start another mint
                </button>
              </>
            )}
          </div>
        )}

        {insufficient && (
          <p className="rounded-xl bg-amber-500/10 px-3 py-2 text-xs text-amber-700">
            Balance looks short for one ghost plus gas.
          </p>
        )}

        {failure && (
          <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-700">{failure}</p>
        )}

        {mintSucceeded && hash && (
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
              onClick={resetMint}
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
