"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Star, Heart, Scale, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addToCompare, isInCompare, removeFromCompare } = useCompareStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const inCompare = isInCompare(product.id);
  const favorite = isFavorite(product.id);

  const primaryImage =
    product.images.find((img) => img.isPrimary)?.url ||
    product.images[0]?.url ||
    "https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=600&q=80";

  // Determine badge type matching Stitch visual
  const isOutOfStock = !product.stock.inStock;
  const isPreOrder = product.badge === "ÖN SİPARİŞ";
  const isBestSeller = product.badge === "ÇOK SATAN";
  const isNew = product.badge === "YENİ NESİL";
  const isPremium = product.price.discountedPrice >= 50000;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-5 border border-slate-100 hover:border-slate-200 transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <div>
        {/* Top Image Container with Badges */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#fafafa] flex items-center justify-center p-3 mb-4">
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isOutOfStock ? (
              <span className="rounded-full bg-slate-400 text-white text-[9.5px] font-bold px-2.5 py-0.5 tracking-wide">
                TÜKENDİ
              </span>
            ) : isPreOrder ? (
              <span className="rounded-full bg-[#f97316] text-white text-[9.5px] font-bold px-2.5 py-0.5 tracking-wide">
                ÖN SİPARİŞ
              </span>
            ) : (
              <span className="rounded-full bg-[#10b981] text-white text-[9.5px] font-bold px-2.5 py-0.5 tracking-wide">
                STOKTA
              </span>
            )}

            {isBestSeller && (
              <span className="rounded-full bg-[#1877f2] text-white text-[9.5px] font-bold px-2.5 py-0.5 tracking-wide">
                ÇOK SATAN
              </span>
            )}

            {isPremium && !isBestSeller && (
              <span className="rounded-full bg-[#0f172a] text-white text-[9.5px] font-bold px-2.5 py-0.5 tracking-wide">
                PREMİUM SEÇİM
              </span>
            )}

            {isNew && !isBestSeller && !isPremium && (
              <span className="rounded-full bg-[#1877f2] text-white text-[9.5px] font-bold px-2.5 py-0.5 tracking-wide">
                YENİ
              </span>
            )}
          </div>

          {/* Wishlist Heart Icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-rose-600 transition-colors shadow-2xs z-10"
            aria-label="Favorilere ekle"
          >
            <Heart
              className={`h-4 w-4 ${favorite ? "fill-rose-600 text-rose-600" : ""}`}
            />
          </button>

          {/* Product Photo */}
          <Link href={`/urun/${product.slug}`} className="w-full h-full flex items-center justify-center">
            <img
              src={primaryImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Brand */}
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          {product.brand.name}
        </div>

        {/* Product Title */}
        <Link href={`/urun/${product.slug}`}>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-[#1877f2] transition-colors leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
          ))}
          <span className="text-[11px] font-medium text-slate-400 ml-1">
            ({product.reviewCount || 42})
          </span>
        </div>
      </div>

      {/* Price & Action Row */}
      <div className="pt-2 border-t border-slate-50 flex items-center justify-between mt-1">
        <div>
          {product.price.hasDiscount && product.price.originalPrice && (
            <div className="text-[11px] text-slate-400 line-through">
              {formatPrice(product.price.originalPrice)}
            </div>
          )}
          <div className={`text-base font-black ${product.price.hasDiscount ? "text-[#1877f2]" : "text-slate-900"}`}>
            {formatPrice(product.price.discountedPrice)}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product);
          }}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-[#1877f2] text-white transition-colors shadow-xs"
          title="Sepete Ekle"
          aria-label="Sepete Ekle"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
