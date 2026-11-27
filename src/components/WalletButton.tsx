"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { errorMessage } from "@/lib/error";
import { useHydrated } from "@/lib/useHydrated";

function shortAddress(address?: string) {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";
}

export function WalletButton({ className = "" }: { className?: string }) {
  const hydrated = useHydrated();
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (wrapper.current && !wrapper.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Keep the popover open on failure so the error stays visible.
  useEffect(() => {
    if (isConnected) setOpen(false);
  }, [isConnected]);

  if (!hydrated) {
    return (
      <button type="button" disabled className={`btn btn-outline ${className}`}>
        Connect wallet
      </button>
    );
  }

  if (isConnected) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        title="Disconnect wallet"
        className={`btn btn-outline ${className}`}
      >
        <span className="h-2 w-2 rounded-full bg-spectral shadow-[0_0_10px_rgba(61,255,178,0.9)]" />
        {shortAddress(address)}
        <span className="hidden text-muted sm:inline">· {chain?.name ?? "Unknown"}</span>
      </button>
    );
  }

  const message = errorMessage(error);

  return (
    <div className="relative" ref={wrapper}>
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen((value) => !value);
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`btn btn-outline ${className}`}
      >
        {isPending ? "Connecting…" : "Connect wallet"}
      </button>

      {open && (
        <div
          role="listbox"
          className="panel absolute left-0 top-[calc(100%+0.5rem)] z-40 w-64 overflow-hidden p-1.5"
        >
          {connectors.length === 0 && (
            <p className="px-3 py-2.5 text-xs text-muted">No wallets detected.</p>
          )}
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              type="button"
              role="option"
              aria-selected={false}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-bone/85 transition-colors hover:bg-black/5 hover:text-bone disabled:opacity-50"
            >
              {connector.name}
              <span className="text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                {connector.type}
              </span>
            </button>
          ))}
          {message && (
            <p className="mt-1 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-700">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
