"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Star, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const favorite = isFavorite(product.id);

  const primaryImage =
    product.images.find((img) => img.isPrimary)?.url ||
    product.images[0]?.url ||
    "https://cdn.shopify.com/s/files/1/0569/0281/1815/products/x1-carbon-combo_800x.png";

  const isOutOfStock = !product.stock.inStock;
  const isPreOrder = product.badge === "ÖN SİPARİŞ";
  const isBestSeller = product.badge === "ÇOK SATAN";
  const isNew = product.badge === "YENİ NESİL";
  const isPremium = product.badge === "PREMİUM SEÇİM" || product.price.discountedPrice >= 50000;
  const isCampaign = product.badge === "KAMPANYA";

  return (
    <div className="group flex flex-col justify-between rounded-3xl bg-white p-4 sm:p-5 border border-slate-100 hover:border-slate-200 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div>
        {/* Top Image Container with Badges */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-[#fafafa] mb-5 p-2">
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isOutOfStock ? (
              <span className="rounded-full bg-slate-300 text-slate-700 text-[10px] font-bold px-3 py-1 tracking-wide border border-slate-300/50">
                TÜKENDİ
              </span>
            ) : isPreOrder ? (
              <span className="rounded-full bg-[#f97316] text-white text-[10px] font-bold px-3 py-1 tracking-wide">
                ÖN SİPARİŞ
              </span>
            ) : (
              <span className="rounded-full bg-[#10b981] text-white text-[10px] font-bold px-3 py-1 tracking-wide">
                STOKTA
              </span>
            )}

            {isBestSeller && (
              <span className="rounded-full bg-[#1877f2] text-white text-[10px] font-bold px-3 py-1 tracking-wide">
                ÇOK SATAN
              </span>
            )}

            {isPremium && !isBestSeller && (
              <span className="rounded-full bg-[#0f172a] text-white text-[10px] font-bold px-3 py-1 tracking-wide">
                PREMİUM SEÇİM
              </span>
            )}

            {isNew && !isBestSeller && !isPremium && (
              <span className="rounded-full bg-[#1877f2] text-white text-[10px] font-bold px-3 py-1 tracking-wide">
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
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white text-slate-400 hover:text-rose-600 transition-colors z-10"
            aria-label="Favorilere ekle"
          >
            <Heart
              className={`h-5 w-5 ${favorite ? "fill-rose-600 text-rose-600" : ""}`}
            />
          </button>

          {/* Product Photo */}
          <Link href={`/urun/${product.slug}`} className="w-full h-full block">
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Brand */}
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
          {product.brand.name}
        </div>

        {/* Product Title */}
        <Link href={`/urun/${product.slug}`} className="px-1 block">
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-[#1877f2] transition-colors leading-[1.4] mb-3">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-400 text-xs mb-4 px-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
          ))}
          <span className="text-[11px] font-medium text-slate-400 ml-1">
            ({product.reviewCount || Math.floor(Math.random() * 100) + 10})
          </span>
        </div>
      </div>

      {/* Price Row (No Cart Button matching Stitch Image 1) */}
      <div className="px-1">
        {product.price.hasDiscount && product.price.originalPrice ? (
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 line-through mb-0.5">
              {formatPrice(product.price.originalPrice)}
            </span>
            <span className="text-lg font-black text-[#1877f2]">
              {formatPrice(product.price.discountedPrice)}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 mt-4">
              {formatPrice(product.price.discountedPrice)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
