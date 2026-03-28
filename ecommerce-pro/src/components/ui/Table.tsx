import { ReactNode } from "react";
import { clsx } from "clsx";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  /** Width hint, e.g. "w-12" or "min-w-[140px]" */
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (row: T, idx: number) => ReactNode;
}

export type SortDirection = "asc" | "desc" | null;

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  sortKey?: string;
  sortDir?: SortDirection;
  onSort?: (key: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  /** Renders extra content per expanded row */
  rowActions?: (row: T) => ReactNode;
  onRowClick?: (row: T) => void;
  striped?: boolean;
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────
function SortIcon({ dir }: { dir: SortDirection }) {
  if (dir === "asc") return <ChevronUp size={14} className="text-indigo-600" />;
  if (dir === "desc") return <ChevronDown size={14} className="text-indigo-600" />;
  return <ChevronsUpDown size={14} className="text-gray-300" />;
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function TableSkeleton({ rows, cols }: { rows: number; cols: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-gray-100">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-4 py-3">
              <div className="h-4 rounded-lg bg-gray-100 animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────
export function Table<T = Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  sortKey,
  sortDir,
  onSort,
  isLoading = false,
  emptyMessage = "No results found.",
  className,
  rowActions,
  onRowClick,
  striped = false,
}: TableProps<T>) {
  return (
    <div
      className={clsx(
        "w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm",
        className
      )}
    >
      <table className="min-w-full divide-y divide-gray-100">
        {/* Header */}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={clsx(
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  !col.align && "text-left",
                  col.width,
                  col.sortable && "cursor-pointer select-none hover:bg-gray-100 transition-colors"
                )}
                onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <SortIcon dir={sortKey === col.key ? sortDir ?? null : null} />
                  )}
                </span>
              </th>
            ))}
            {rowActions && (
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100 bg-white">
          {isLoading ? (
            <TableSkeleton rows={5} cols={columns.length + (rowActions ? 1 : 0)} />
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (rowActions ? 1 : 0)}
                className="px-4 py-12 text-center text-sm text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={keyExtractor(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={clsx(
                  "transition-colors duration-100",
                  onRowClick && "cursor-pointer hover:bg-indigo-50/50",
                  striped && idx % 2 !== 0 && "bg-gray-50/50"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx(
                      "px-4 py-3 text-sm text-gray-800 whitespace-nowrap",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right"
                    )}
                  >
                    {col.render
                      ? col.render(row, idx)
                      : String((row as Record<string, unknown>)[col.key] ?? "—")}
                  </td>
                ))}
                {rowActions && (
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center justify-end gap-1">
                      {rowActions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
