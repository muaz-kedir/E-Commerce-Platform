import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-outline"
  | "success";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  /** Icon rendered before the label */
  leftIcon?: ReactNode;
  /** Icon rendered after the label */
  rightIcon?: ReactNode;
  /** Renders a square icon-only button — pass a single icon as children */
  iconOnly?: boolean;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 focus-visible:outline-indigo-600",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:outline-gray-400",
  outline:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-gray-400",
  ghost:
    "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-gray-400",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-500 active:bg-red-700 focus-visible:outline-red-600",
  "danger-outline":
    "border border-red-300 bg-white text-red-600 hover:bg-red-50 active:bg-red-100 focus-visible:outline-red-400",
  success:
    "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700 focus-visible:outline-emerald-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs gap-1 rounded-lg",
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-11 px-5 text-sm gap-2 rounded-xl",
  xl: "h-12 px-6 text-base gap-2.5 rounded-xl",
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  xs: "h-7 w-7 rounded-lg",
  sm: "h-8 w-8 rounded-lg",
  md: "h-10 w-10 rounded-xl",
  lg: "h-11 w-11 rounded-xl",
  xl: "h-12 w-12 rounded-xl",
};

// ─── Component ───────────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          // Base
          "inline-flex items-center justify-center font-semibold",
          "transition-all duration-150",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Variant
          variantStyles[variant],
          // Size
          iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
          // Width
          fullWidth && !iconOnly && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={size === "xs" || size === "sm" ? 14 : 16} />
        ) : (
          leftIcon
        )}
        {!iconOnly && children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";
