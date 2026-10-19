"use client";
import { useState } from "react";

export default function CodeCard({ label, value, note }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {}
  }
  return (
    <div className="soft flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <p className="break-all font-mono text-xl font-semibold tracking-wide">{value}</p>
        {note && <p className="mt-1 text-sm text-muted">{note}</p>}
      </div>
      <button onClick={copy} className="btn btn-sm shrink-0" aria-live="polite">{copied ? "Copied" : "Copy"}</button>
    </div>
  );
}