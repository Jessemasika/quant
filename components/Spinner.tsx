"use client";

export default function Spinner() {
  return (
<div className="flex items-center justify-center" role="status" aria-live="polite">
  <div className="w-6 h-6 border-2 border-blue-500 border-t-white rounded-full animate-spin" />
  <span className="sr-only">Loading…</span>
</div>

  );
}