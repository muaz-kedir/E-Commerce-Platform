"use client";
import Link from "next/link";
import { ShoppingCart, Heart, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useCartStore, useAuthStore } from "@/store";
import { useScrollPosition } from "@/hooks";
import { STORE_NAV_LINKS, ROUTES } from "@/constants";

export function StoreHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { isScrolled } = useScrollPosition();

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        isScrolled
          ? "border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-white",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={ROUTES.home}
          className="text-xl font-extrabold tracking-tight text-indigo-600"
        >
          EcommercePro
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {STORE_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Link
            href={ROUTES.search}
            aria-label="Search"
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Wishlist */}
          <Link
            href={ROUTES.wishlist}
            aria-label="Wishlist"
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Cart */}
          <Link
            href={ROUTES.cart}
            aria-label={`Cart (${itemCount} items)`}
            className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* User */}
          {isAuthenticated ? (
            <Link
              href={ROUTES.profile}
              aria-label="Profile"
              className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href={ROUTES.login}
              className="hidden rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors sm:block"
            >
              Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition-colors md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {STORE_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                href={ROUTES.login}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
