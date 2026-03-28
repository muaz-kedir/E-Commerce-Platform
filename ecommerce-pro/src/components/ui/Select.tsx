import { SelectHTMLAttributes, forwardRef, useId } from "react";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, placeholder, options, id: propId, className, ...props }, ref) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={clsx(
              "block w-full appearance-none rounded-xl border bg-white px-4 py-2.5 pr-10 text-sm text-gray-900",
              "outline-none transition-all duration-150",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
