import { clsx } from "clsx";
import { ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "discount"
  | "new"
  | "outOfStock"
  | "lowStock";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const variantStyles: Record<BadgeVariant, string> = {
  default:     "bg-gray-100 text-gray-700",
  primary:     "bg-indigo-100 text-indigo-700",
  success:     "bg-emerald-100 text-emerald-700",
  warning:     "bg-amber-100 text-amber-700",
  danger:      "bg-red-100 text-red-600",
  info:        "bg-sky-100 text-sky-700",
  purple:      "bg-violet-100 text-violet-700",
  discount:    "bg-rose-500 text-white font-bold",
  new:         "bg-indigo-600 text-white font-bold",
  outOfStock:  "bg-gray-200 text-gray-500",
  lowStock:    "bg-amber-500 text-white font-bold",
};

const dotColors: Record<BadgeVariant, string> = {
  default:     "bg-gray-400",
  primary:     "bg-indigo-500",
  success:     "bg-emerald-500",
  warning:     "bg-amber-500",
  danger:      "bg-red-500",
  info:        "bg-sky-500",
  purple:      "bg-violet-500",
  discount:    "bg-white",
  new:         "bg-white",
  outOfStock:  "bg-gray-400",
  lowStock:    "bg-white",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

// ─── Component ───────────────────────────────────────────────────────────────
export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx("h-1.5 w-1.5 rounded-full", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}

// ─── Convenience exports ──────────────────────────────────────────────────────
export const DiscountBadge = ({ children }: { children: ReactNode }) => (
  <Badge variant="discount" size="sm">
    {children}
  </Badge>
);

export const NewBadge = () => (
  <Badge variant="new" size="sm">
    NEW
  </Badge>
);

export const OutOfStockBadge = () => (
  <Badge variant="outOfStock" size="sm">
    Out of stock
  </Badge>
);

export const LowStockBadge = ({ count }: { count: number }) => (
  <Badge variant="lowStock" size="sm">
    Only {count} left!
  </Badge>
);
