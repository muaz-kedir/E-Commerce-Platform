import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Badge, DiscountBadge, NewBadge, OutOfStockBadge, LowStockBadge } from "./Badge";
import { Button } from "./Button";
import type { Product, Category, Order } from "@/types";
import { formatPrice, calcDiscount } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
  isAddingToCart?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  isAddingToCart = false,
  className,
}: ProductCardProps) {
  const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? calcDiscount(product.compareAtPrice!, product.price)
    : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = !isOutOfStock && product.stock <= 5;
  const isNew =
    (Date.now() - new Date(product.createdAt).getTime()) / 86_400_000 < 14;

  return (
    <div
      className={clsx(
        "group relative flex flex-col rounded-2xl border border-gray-200 bg-white",
        "shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-gray-50"
      >
        {product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}

        {/* Badges overlay */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {isNew && <NewBadge />}
          {hasDiscount && <DiscountBadge>-{discountPct}%</DiscountBadge>}
          {isOutOfStock && <OutOfStockBadge />}
          {isLowStock && <LowStockBadge count={product.stock} />}
        </div>

        {/* Wishlist button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist(product);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={clsx(
              "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full",
              "bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-150",
              "opacity-0 group-hover:opacity-100",
              "hover:scale-110"
            )}
          >
            <Heart
              size={15}
              className={clsx(
                "transition-colors",
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
              )}
            />
          </button>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
          {product.category.name}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={clsx(
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        {onAddToCart && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            isLoading={isAddingToCart}
            disabled={isOutOfStock}
            leftIcon={<ShoppingCart size={14} />}
            onClick={() => onAddToCart(product)}
            className="mt-1"
          >
            {isOutOfStock ? "Out of stock" : "Add to cart"}
          </Button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY CARD
// ─────────────────────────────────────────────────────────────────────────────
export interface CategoryCardProps {
  category: Category;
  productCount?: number;
  className?: string;
}

export function CategoryCard({ category, productCount, className }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={clsx(
        "group relative flex flex-col items-center justify-center overflow-hidden",
        "rounded-2xl border border-gray-200 bg-white p-6 text-center",
        "shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200",
        className
      )}
    >
      {category.imageUrl && (
        <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-2xl bg-indigo-50">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      {!category.imageUrl && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
          🛍️
        </div>
      )}
      <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
        {category.name}
      </p>
      {productCount !== undefined && (
        <p className="mt-1 text-xs text-gray-400">{productCount} products</p>
      )}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT CARD (generic)
// ─────────────────────────────────────────────────────────────────────────────
export interface ContentCardProps {
  title?: string;
  description?: string;
  image?: string;
  badge?: string;
  footer?: ReactNode;
  href?: string;
  className?: string;
  children?: ReactNode;
}

export function ContentCard({
  title,
  description,
  image,
  badge,
  footer,
  href,
  className,
  children,
}: ContentCardProps) {
  const Wrapper = (href ? Link : "div") as any;

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={clsx(
        "group flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden",
        "shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      {image && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title ?? ""}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {badge && (
            <div className="absolute left-3 top-3">
              <Badge variant="primary">{badge}</Badge>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {title && (
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
        )}
        {children}
        {footer && <div className="mt-auto pt-4">{footer}</div>}
      </div>
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDER SUMMARY CARD
// ─────────────────────────────────────────────────────────────────────────────
const orderStatusVariant = {
  pending:    "warning",
  processing: "info",
  shipped:    "primary",
  delivered:  "success",
  cancelled:  "danger",
  refunded:   "default",
} as const;

export interface OrderSummaryCardProps {
  order: Order;
  onViewDetails?: (id: string) => void;
  className?: string;
}

export function OrderSummaryCard({ order, onViewDetails, className }: OrderSummaryCardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400">Order ID</p>
          <p className="font-semibold text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <Badge variant={orderStatusVariant[order.status]} dot>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      {/* Items preview */}
      <div className="mb-4 space-y-2">
        {order.items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {item.product.name}
              </p>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
        {order.items.length > 3 && (
          <p className="text-xs text-gray-400">
            +{order.items.length - 3} more item{order.items.length - 3 > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total</span>
          <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
        </div>
      </div>

      {onViewDetails && (
        <Button
          variant="outline"
          size="sm"
          fullWidth
          className="mt-4"
          onClick={() => onViewDetails(order.id)}
        >
          View order details
        </Button>
      )}
    </div>
  );
}
