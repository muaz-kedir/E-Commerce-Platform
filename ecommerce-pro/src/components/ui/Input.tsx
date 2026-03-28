import { InputHTMLAttributes, ReactNode, forwardRef, useId } from "react";
import { clsx } from "clsx";
import { Eye, EyeOff, Search, X } from "lucide-react";
import { useState } from "react";

// ─── Base Input ───────────────────────────────────────────────────────────────
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

const baseInput = clsx(
  "block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900",
  "placeholder:text-gray-400 outline-none transition-all duration-150",
  "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
);

const inputState = {
  normal: "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100",
  error: "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftAddon, rightAddon, id: propId, className, ...props }, ref) => {
    const autoId = useId();
    const id = propId ?? autoId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="pointer-events-none absolute left-3 text-gray-400">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={clsx(
              baseInput,
              error ? inputState.error : inputState.normal,
              leftAddon && "pl-9",
              rightAddon && "pr-9",
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 text-gray-400">{rightAddon}</div>
          )}
        </div>
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// ─── Password Input ────────────────────────────────────────────────────────────
export interface PasswordInputProps extends Omit<InputProps, "type" | "rightAddon"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [show, setShow] = useState(false);
    return (
      <Input
        ref={ref}
        type={show ? "text" : "password"}
        rightAddon={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="pointer-events-auto text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// ─── Search Input ──────────────────────────────────────────────────────────────
export interface SearchInputProps extends Omit<InputProps, "type" | "leftAddon"> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, value, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        leftAddon={<Search size={16} />}
        rightAddon={
          onClear && value ? (
            <button
              type="button"
              onClick={onClear}
              className="pointer-events-auto text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : null
        }
        value={value}
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";
