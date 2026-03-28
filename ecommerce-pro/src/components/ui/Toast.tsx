"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { clsx } from "clsx";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
  // Convenience
  success: (title: string, message?: string) => string;
  error: (title: string, message?: string) => string;
  warning: (title: string, message?: string) => string;
  info: (title: string, message?: string) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Icons & styles ──────────────────────────────────────────────────────────
const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle; iconClass: string; borderClass: string }
> = {
  success: { icon: CheckCircle,   iconClass: "text-emerald-500", borderClass: "border-l-emerald-500" },
  error:   { icon: XCircle,       iconClass: "text-red-500",     borderClass: "border-l-red-500" },
  warning: { icon: AlertTriangle, iconClass: "text-amber-500",   borderClass: "border-l-amber-500" },
  info:    { icon: Info,          iconClass: "text-sky-500",      borderClass: "border-l-sky-500" },
};

// ─── Single Toast item ────────────────────────────────────────────────────────
function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { icon: Icon, iconClass, borderClass } = variantConfig[toast.variant];

  useEffect(() => {
    // Enter animation
    requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss
    const duration = toast.duration ?? 4000;
    timer.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, duration);

    return () => clearTimeout(timer.current);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(
        "flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4",
        "shadow-lg shadow-gray-200/60 border-l-4 w-80 pointer-events-auto",
        "transition-all duration-300",
        borderClass,
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      <Icon size={20} className={clsx("flex-shrink-0 mt-0.5", iconClass)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
        {toast.message && (
          <p className="mt-0.5 text-xs text-gray-500">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        aria-label="Dismiss notification"
        className="flex-shrink-0 rounded-md p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ variant, title, message, duration }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, variant, title, message, duration }]);
      return id;
    },
    []
  );

  const value: ToastContextValue = {
    toasts,
    toast,
    dismiss,
    success: (title, message) => toast({ variant: "success", title, message }),
    error:   (title, message) => toast({ variant: "error",   title, message }),
    warning: (title, message) => toast({ variant: "warning", title, message }),
    info:    (title, message) => toast({ variant: "info",    title, message }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast viewport */}
      <div
        aria-label="Notifications"
        className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-3"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
