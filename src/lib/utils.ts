import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "TRY"): string {
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (currency === "TRY" || currency === "TL") {
    return `₺${formatted}`;
  }
  if (currency === "USD") {
    return `$${formatted}`;
  }
  if (currency === "EUR") {
    return `€${formatted}`;
  }
  return `${formatted} ${currency}`;
}

export function calculateDiscount(original: number, current: number): number {
  if (original <= current || original === 0) return 0;
  return Math.round(((original - current) / original) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
