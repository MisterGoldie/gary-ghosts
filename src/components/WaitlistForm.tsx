"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "done">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    // Demo only — connect this to your allowlist provider (e.g. a Next route handler).
    setStatus("done");
    setEmail("");
  }

  if (status === "done") {
    return (
      <div className="panel-soft flex items-center gap-3 px-4 py-3.5">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-spectral/15 text-spectral">✓</span>
        <p className="text-sm text-bone/85">
          You&apos;re on the list. Gary will haunt your inbox soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2.5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "invalid") setStatus("idle");
          }}
          placeholder="you@haunted.house"
          className="w-full min-w-0 rounded-full border border-hairline bg-white px-5 py-3 text-sm text-bone placeholder:text-muted/70 focus:border-wisp/60 focus:outline-none"
        />
        <button type="submit" className="btn btn-primary shrink-0">
          Join allowlist
        </button>
      </div>
      {status === "invalid" ? (
        <p className="pl-2 text-xs text-red-700">That email looks a little cursed. Try again.</p>
      ) : (
        <p className="pl-2 text-xs text-muted">
          Demo form — no backend wired yet. Gen 1 holders are auto-allowlisted.
        </p>
      )}
    </form>
  );
}
