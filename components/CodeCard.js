"use client";
import { useState } from "react";

export default function CodeCard({ label, value, note }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {}
  }
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="font-mono text-xl font-semibold tracking-wide break-all">{value}</p>
        {note && <p className="text-xs text-muted mt-1">{note}</p>}
      </div>
      <button onClick={copy} className="shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brandink" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
