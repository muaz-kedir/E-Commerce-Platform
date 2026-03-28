import { TextareaHTMLAttributes, forwardRef, useId } from "react";
import { clsx } from "clsx";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  /** Show remaining character count when maxLength is set */
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, showCount, id: propId, className, maxLength, value, ...props }, ref) => {
    const autoId = useId();
    const id = propId ?? autoId;
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          maxLength={maxLength}
          value={value}
          rows={4}
          className={clsx(
            "block w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900",
            "placeholder:text-gray-400 outline-none transition-all duration-150 resize-y",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100",
            className
          )}
          {...props}
        />
        <div className="flex items-start justify-between gap-2">
          <div>
            {error && <p className="text-xs font-medium text-red-500">{error}</p>}
            {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
          </div>
          {showCount && maxLength && (
            <p className="ml-auto flex-shrink-0 text-xs text-gray-400">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
