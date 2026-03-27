import { CURRENCY_SYMBOL, DEFAULT_CURRENCY } from "@/constants";

/**
 * Format a number as a currency string.
 * @example formatPrice(1999.9) → "$1,999.90"
 */
export function formatPrice(
  amount: number,
  currency: string = DEFAULT_CURRENCY
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate the discount percentage between two prices.
 * @example calcDiscount(100, 75) → 25
 */
export function calcDiscount(original: number, sale: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Truncate a string to a max length and append an ellipsis.
 */
export function truncate(str: string, maxLength: number = 80): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Convert a string to a URL-friendly slug.
 * @example slugify("Hello World!") → "hello-world"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Format a date string to a human-readable format.
 * @example formatDate("2024-01-15T10:30:00Z") → "Jan 15, 2024"
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

/**
 * Format a date string to a relative time (e.g. "2 hours ago").
 */
export function timeAgo(date: string | Date): string {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count !== 1 ? "s" : ""} ago`;
  }
  return "just now";
}

/**
 * Generate a simple unique ID (not cryptographically secure).
 */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if a product is on sale.
 */
export function isOnSale(price: number, compareAtPrice?: number): boolean {
  return !!compareAtPrice && compareAtPrice > price;
}
