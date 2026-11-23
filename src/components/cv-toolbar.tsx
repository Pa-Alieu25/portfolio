"use client";

export function CvPrintButton({ label }: { label: string }) {
  return <button type="button" className="button button-secondary" onClick={() => window.print()}>{label}</button>;
}
