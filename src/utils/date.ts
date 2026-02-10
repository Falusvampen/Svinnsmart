// src/utils/date.ts
// Hjälpfunktioner för datum och utgångsstatus (Svenska kommentarer)

export type ExpiryStatus = "expired" | "urgent" | "soon" | "ok";

export function daysUntil(isoDate: string): number {
  const now = new Date();
  // Tolk ISO-datum utan tid som lokal midnatt
  const target = new Date(isoDate + "T00:00:00");
  const diffMs = target.getTime() - now.getTime();
  // Runda ned till hela dagar
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDateShort(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getExpiryInfo(isoDate: string): {
  label: string;
  status: ExpiryStatus;
} {
  const days = daysUntil(isoDate);
  if (days < 0) return { label: "Utgånget", status: "expired" };
  if (days === 0) return { label: "Går ut idag", status: "urgent" };
  if (days <= 3) return { label: `${days} dagar kvar`, status: "urgent" };
  if (days <= 14) return { label: `${days} dagar kvar`, status: "soon" };
  return { label: `Bäst före ${formatDateShort(isoDate)}`, status: "ok" };
}
