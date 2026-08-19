"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/stores/useCartStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import {
  ShoppingCart,
  Scale,
  Heart,
  Check,
  Star,
  Zap,
  Box,
  Truck,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addToCompare, isInCompare, removeFromCompare } = useCompareStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const [isAdded, setIsAdded] = React.useState(false);

  const inCompare = isInCompare(product.id);
  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const primaryImage =
    product.images.find((img) => img.isPrimary)?.url ||
    product.images[0]?.url ||
    "https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {/* Top Badges & Actions */}
      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Badge */}
          <div className="flex flex-col gap-1">
            {product.brand.isOfficialDistributor && (
              <Badge variant="distributor" className="text-[10px] uppercase">
                Resmi Distribütör
              </Badge>
            )}
            {product.price.hasDiscount && (
              <Badge variant="campaign" className="text-[10px]">
                %{product.price.discountRatePercentage} İndirim
              </Badge>
            )}
            {product.badge && !product.brand.isOfficialDistributor && (
              <Badge variant="bestseller" className="text-[10px]">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleCompare}
              className={`rounded-full p-2 text-xs transition-colors ${
                inCompare
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              }`}
              title={inCompare ? "Karşılaştırmadan Çıkar" : "Karşılaştır"}
              aria-label="Karşılaştır"
            >
              <Scale className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`rounded-full p-2 text-xs transition-colors ${
                favorite
                  ? "bg-rose-50 text-rose-600"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              }`}
              title={favorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
              aria-label="Favori"
            >
              <Heart
                className={`h-3.5 w-3.5 ${favorite ? "fill-rose-600" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <Link href={`/urun/${product.slug}`} className="block relative overflow-hidden rounded-lg bg-slate-50 aspect-square mb-3">
          <img
            src={primaryImage}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">
              {product.brand.name}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="h-3 w-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/urun/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-primary transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Quick Specs Highlight */}
          {(product.buildVolume || product.maxSpeed) && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] text-slate-600">
              {product.buildVolume && (
                <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-medium">
                  <Box className="h-3 w-3 text-slate-500" />
                  {product.buildVolume}
                </span>
              )}
              {product.maxSpeed && (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.5 font-medium">
                  <Zap className="h-3 w-3" />
                  {product.maxSpeed}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Add to Cart Section */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="mb-3">
            {product.price.hasDiscount && product.price.originalPrice && (
              <span className="text-xs text-slate-400 line-through mr-2">
                {formatPrice(product.price.originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                {formatPrice(product.price.discountedPrice)}
              </span>
              <span className="text-[10px] text-slate-500 font-normal">KDV Dahil</span>
            </div>
            {product.price.monthlyInstallmentPrice && (
              <div className="text-[11px] text-emerald-600 font-medium">
                {formatPrice(product.price.monthlyInstallmentPrice)} x 12 Taksit
              </div>
            )}
          </div>

          {/* Shipping badge */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
            <Truck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{product.stock.estimatedDelivery}</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className={`w-full font-semibold transition-all duration-200 ${
              isAdded
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-primary hover:bg-primary-dark text-white"
            }`}
            size="sm"
          >
            {isAdded ? (
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4" />
                <span>Sepete Eklendi!</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <ShoppingCart className="h-4 w-4" />
                <span>Sepete Ekle</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
