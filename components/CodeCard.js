"use client";
import { useState } from "react";

export default function CodeCard({ label, value, note }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {}
  }
  return (
    <div className="flex items-center justify-between gap-3 border-l-4 border-brand bg-surface p-4">
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <p className="break-all font-mono text-xl font-semibold tracking-wide">{value}</p>
        {note && <p className="mt-1 text-sm text-muted">{note}</p>}
      </div>
      <button onClick={copy} className="shrink-0 rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-paper" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
