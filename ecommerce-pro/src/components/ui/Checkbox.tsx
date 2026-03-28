import { InputHTMLAttributes, forwardRef, useId, ReactNode } from "react";
import { clsx } from "clsx";

// ─── Checkbox ─────────────────────────────────────────────────────────────────
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, id: propId, className, ...props }, ref) => {
    const autoId = useId();
    const id = propId ?? autoId;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            {/* Custom checkbox box */}
            <div
              className={clsx(
                "h-5 w-5 rounded-md border-2 bg-white transition-all duration-150",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-300 peer-focus-visible:ring-offset-1",
                "peer-checked:border-indigo-600 peer-checked:bg-indigo-600",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                error ? "border-red-400" : "border-gray-300"
              )}
            />
            {/* Checkmark */}
            <svg
              className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13 4.5L6.5 11L3 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            {label && (
              <span className="block text-sm font-medium text-gray-800">
                {label}
              </span>
            )}
            {description && (
              <span className="mt-0.5 block text-xs text-gray-500">
                {description}
              </span>
            )}
          </div>
        </label>
        {error && <p className="ml-8 text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

// ─── Radio ────────────────────────────────────────────────────────────────────
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, id: propId, className, ...props }, ref) => {
    const autoId = useId();
    const id = propId ?? autoId;

    return (
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <div className="relative mt-0.5 flex-shrink-0">
          <input ref={ref} id={id} type="radio" className="peer sr-only" {...props} />
          {/* Custom radio outer */}
          <div
            className={clsx(
              "h-5 w-5 rounded-full border-2 border-gray-300 bg-white transition-all duration-150",
              "peer-checked:border-indigo-600",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-300 peer-focus-visible:ring-offset-1",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            )}
          />
          {/* Inner dot */}
          <div className="pointer-events-none absolute left-1 top-1 h-3 w-3 rounded-full bg-indigo-600 opacity-0 transition-opacity peer-checked:opacity-100" />
        </div>
        <div>
          {label && <span className="block text-sm font-medium text-gray-800">{label}</span>}
          {description && (
            <span className="mt-0.5 block text-xs text-gray-500">{description}</span>
          )}
        </div>
      </label>
    );
  }
);
Radio.displayName = "Radio";
