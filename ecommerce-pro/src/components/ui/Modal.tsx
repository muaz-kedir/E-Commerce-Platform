"use client";
import { ReactNode, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { X } from "lucide-react";
import { Button } from "./Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Prevent closing on backdrop click */
  disableClose?: boolean;
}

const sizeStyles = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-5xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  disableClose = false,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !disableClose) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, disableClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!disableClose ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={clsx(
          "relative z-10 w-full rounded-2xl bg-white shadow-2xl",
          "flex flex-col max-h-[90vh]",
          sizeStyles[size]
        )}
      >
        {/* Header */}
        {(title || !disableClose) && (
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-4">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-0.5 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {!disableClose && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="flex-shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-100 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}

// ─── Confirmation Modal ────────────────────────────────────────────────────────
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <p className="text-sm text-gray-600">{message}</p>
    </Modal>
  );
}
