// ─── Environment ─────────────────────────────────────────────────────────────
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
} as const;

// ─── API ─────────────────────────────────────────────────────────────────────
export const apiConfig = {
  baseUrl: env.apiUrl,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authConfig = {
  // Cookie / localStorage key names
  accessTokenKey: "ecp_access_token",
  refreshTokenKey: "ecp_refresh_token",
  // Token expiry (ms)
  accessTokenTtl: 15 * 60 * 1000,        // 15 minutes
  refreshTokenTtl: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

// ─── Image sizes ──────────────────────────────────────────────────────────────
export const imageSizes = {
  thumbnail: { width: 80, height: 80 },
  productCard: { width: 360, height: 360 },
  productHero: { width: 800, height: 800 },
  avatar: { width: 48, height: 48 },
} as const;

// ─── Feature Flags ────────────────────────────────────────────────────────────
export const featureFlags = {
  enableWishlist: true,
  enableReviews: true,
  enableNotifications: true,
  enableSearch: true,
  enableAdminPanel: true,
} as const;
