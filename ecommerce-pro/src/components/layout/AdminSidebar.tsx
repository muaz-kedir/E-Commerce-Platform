"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { clsx } from "clsx";
import { useAuthStore } from "@/store";
import { ADMIN_NAV_LINKS, ROUTES } from "@/constants";

const iconMap = {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
} as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore((s) => ({
    user: s.user,
    logout: s.logout,
  }));

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
        <Link href={ROUTES.home} className="flex items-center gap-1.5">
          <ChevronLeft className="h-4 w-4 text-gray-400" />
          <span className="text-lg font-extrabold tracking-tight text-indigo-600">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Management
        </p>
        <ul className="space-y-0.5">
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            const active =
              pathname === link.href ||
              (link.href !== ROUTES.admin && pathname.startsWith(link.href));

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={clsx(
                        "h-4 w-4 flex-shrink-0",
                        active ? "text-indigo-600" : "text-gray-400"
                      )}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="border-t border-gray-100 p-4">
        {user && (
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
              {user.firstName[0]}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
