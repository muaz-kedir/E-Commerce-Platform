// ─── App ─────────────────────────────────────────────────────────────────────
export const APP_NAME = "EcommercePro";
export const APP_DESCRIPTION =
  "Discover thousands of products at unbeatable prices.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [12, 24, 48, 96] as const;

// ─── Currency ────────────────────────────────────────────────────────────────
export const DEFAULT_CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";

// ─── Product ──────────────────────────────────────────────────────────────────
export const PRODUCT_SORT_OPTIONS = [
  { label: "Newest", value: "createdAt:desc" },
  { label: "Price: Low to High", value: "price:asc" },
  { label: "Price: High to Low", value: "price:desc" },
  { label: "Best Rated", value: "rating:desc" },
  { label: "Most Popular", value: "reviewCount:desc" },
] as const;

export const MAX_CART_QUANTITY = 99;
export const LOW_STOCK_THRESHOLD = 5;

// ─── Order Status Labels ──────────────────────────────────────────────────────
export const ORDER_STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
} as const;

export const ORDER_STATUS_COLORS = {
  pending: "yellow",
  processing: "blue",
  shipped: "indigo",
  delivered: "green",
  cancelled: "red",
  refunded: "gray",
} as const;

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  // Store
  home: "/",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  cart: "/cart",
  checkout: "/checkout",
  wishlist: "/wishlist",
  orders: "/orders",
  order: (id: string) => `/orders/${id}`,
  profile: "/profile",
  search: "/search",

  // Auth
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // Admin
  admin: "/admin",
  adminProducts: "/admin/products",
  adminOrders: "/admin/orders",
  adminUsers: "/admin/users",
  adminSettings: "/admin/settings",
} as const;

// ─── Navigation ────────────────────────────────────────────────────────────────
export const STORE_NAV_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "Products", href: ROUTES.products },
  { label: "Deals", href: `${ROUTES.products}?sale=true` },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: ROUTES.admin, icon: "LayoutDashboard" },
  { label: "Products", href: ROUTES.adminProducts, icon: "Package" },
  { label: "Orders", href: ROUTES.adminOrders, icon: "ShoppingBag" },
  { label: "Users", href: ROUTES.adminUsers, icon: "Users" },
  { label: "Settings", href: ROUTES.adminSettings, icon: "Settings" },
] as const;
