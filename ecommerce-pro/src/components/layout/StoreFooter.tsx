import Link from "next/link";
import { ROUTES } from "@/constants";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: ROUTES.products },
      { label: "Deals", href: `${ROUTES.products}?sale=true` },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My Orders", href: ROUTES.orders },
      { label: "Wishlist", href: ROUTES.wishlist },
      { label: "Profile", href: ROUTES.profile },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export function StoreFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={ROUTES.home}
              className="text-xl font-extrabold tracking-tight text-indigo-600"
            >
              EcommercePro
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Discover thousands of products at unbeatable prices.
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} EcommercePro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
