// src/utils/date.ts
// Hjälpfunktioner för datum och utgångsstatus (Svenska kommentarer)

import { InventoryItem } from "@/models/";

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

/**
 * Beräkna ett "expiry" ISO-datum för ett InventoryItem när vi inte har ett explicit
 * `expiryDate`-fält i modellen längre. Regler:
 * - Om item har ett explict `expiryDate` (bakåtkompatibilitet) returnera det.
 * - Om item.shelfLifeDays och item.addedAt finns, returnera `addedAt + shelfLifeDays`.
 * - Annars returnera undefined.
 *
 * Kommentarer: Svenska för komplex logik enligt repo-riktlinjer.
 */
export function getItemExpiryDate(item: InventoryItem): string | undefined {
  // Backwards-compat: some legacy items might still carry expiryDate
  const anyItem = item as any;
  if (anyItem && typeof anyItem.expiryDate === "string")
    return anyItem.expiryDate;

  if (typeof item.shelfLifeDays === "number" && item.addedAt) {
    const d = new Date(item.addedAt + "T00:00:00");
    d.setDate(d.getDate() + item.shelfLifeDays);
    // Returnera YYYY-MM-DD (samma format som övriga utility-funktioner för datum)
    return d.toISOString().slice(0, 10);
  }

  return undefined;
}
