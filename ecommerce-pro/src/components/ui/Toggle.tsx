"use client";
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import { clsx } from "clsx";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const trackSizes = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-14",
};

const thumbSizes = {
  sm: "h-3.5 w-3.5 peer-checked:translate-x-4",
  md: "h-4.5 w-4.5 peer-checked:translate-x-5",
  lg: "h-5 w-5 peer-checked:translate-x-7",
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, size = "md", id: propId, className, ...props }, ref) => {
    const autoId = useId();
    const id = propId ?? autoId;

    return (
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center justify-between gap-4"
      >
        {(label || description) && (
          <div>
            {label && (
              <span className="block text-sm font-medium text-gray-800">{label}</span>
            )}
            {description && (
              <span className="mt-0.5 block text-xs text-gray-500">{description}</span>
            )}
          </div>
        )}
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            {...props}
          />
          {/* Track */}
          <div
            className={clsx(
              "rounded-full bg-gray-200 transition-colors duration-200",
              "peer-checked:bg-indigo-600",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-300 peer-focus-visible:ring-offset-2",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              trackSizes[size]
            )}
          />
          {/* Thumb */}
          <div
            className={clsx(
              "absolute left-0.5 top-0.5 rounded-full bg-white shadow-sm",
              "transition-transform duration-200",
              thumbSizes[size]
            )}
          />
        </div>
      </label>
    );
  }
);
Toggle.displayName = "Toggle";
