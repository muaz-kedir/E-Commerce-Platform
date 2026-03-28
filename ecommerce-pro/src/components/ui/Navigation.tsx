import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { clsx } from "clsx";

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, showHome = true, className }: BreadcrumbsProps) {
  const all: BreadcrumbItem[] = showHome ? [{ label: "Home", href: "/" }, ...items] : items;

  return (
    <nav aria-label="Breadcrumb" className={clsx("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {all.map((item, idx) => {
          const isLast = idx === all.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1">
              {idx === 0 && showHome ? (
                <>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                      aria-label="Home"
                    >
                      <Home size={14} />
                    </Link>
                  ) : (
                    <Home size={14} className="text-gray-400" />
                  )}
                </>
              ) : (
                <>
                  <ChevronRight size={14} className="flex-shrink-0 text-gray-300" />
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={clsx(
                        isLast ? "font-semibold text-gray-900" : "text-gray-500"
                      )}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────
export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Max page buttons to show (excluding prev/next) */
  siblingCount?: number;
  className?: string;
}

function getPageRange(current: number, total: number, siblings: number) {
  const delta = siblings + 2;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  if (left > 2) range.push(1, "...");
  else range.push(1);

  for (let i = left; i <= right; i++) range.push(i);

  if (right < total - 1) range.push("...", total);
  else if (total > 1) range.push(total);

  return range;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(page, totalPages, siblingCount);

  const btnBase =
    "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all duration-150";
  const btnActive = "bg-indigo-600 text-white shadow-sm";
  const btnDefault =
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-indigo-300";
  const btnDisabled = "border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed";

  return (
    <nav
      aria-label="Pagination"
      className={clsx("flex items-center justify-center gap-1.5", className)}
    >
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={clsx(btnBase, "gap-1 px-3 w-auto", page === 1 ? btnDisabled : btnDefault)}
      >
        <ChevronRight size={14} className="rotate-180" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Pages */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-gray-400"
          >
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={clsx(btnBase, p === page ? btnActive : btnDefault)}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={clsx(
          btnBase,
          "gap-1 px-3 w-auto",
          page === totalPages ? btnDisabled : btnDefault
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
