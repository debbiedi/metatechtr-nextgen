"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  RotateCcw,
  Sparkles,
  Award,
} from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  // Determine if it's a category or a brand
  const categoryInfo = CATEGORIES.find((c) => c.slug === categorySlug);
  const brandInfo = BRANDS.find((b) => b.slug === categorySlug);

  const title = categoryInfo?.name || brandInfo?.name || "Tüm Ürünler";
  const description =
    categoryInfo?.description ||
    brandInfo?.description ||
    "MetaTechTR resmi distribütör garantili 3D yazıcı ve teknoloji ürünleri.";

  // Filter state
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(
    brandInfo ? [brandInfo.name] : []
  );
  const [onlyInStock, setOnlyInStock] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [maxPrice, setMaxPrice] = React.useState<number>(100000);

  // Available brands in current scope
  const allBrands = Array.from(new Set(PRODUCTS.map((p) => p.brand.name)));

  // Filter products
  let filtered = PRODUCTS.filter((product) => {
    // If on a specific category page
    if (categoryInfo && product.category.slug !== categorySlug && product.category.parentSlug !== categorySlug) {
      return false;
    }
    // If on a specific brand page
    if (brandInfo && product.brand.slug !== categorySlug) {
      return false;
    }
    // Brand facet filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.name)) {
      return false;
    }
    // In stock filter
    if (onlyInStock && !product.stock.inStock) {
      return false;
    }
    // Price filter
    if (product.price.discountedPrice > maxPrice) {
      return false;
    }
    return true;
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price.discountedPrice - b.price.discountedPrice;
    }
    if (sortBy === "price-desc") {
      return b.price.discountedPrice - a.price.discountedPrice;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // default order
  });

  const toggleBrand = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const resetFilters = () => {
    setSelectedBrands(brandInfo ? [brandInfo.name] : []);
    setOnlyInStock(false);
    setMaxPrice(100000);
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          {
            name: categoryInfo ? "Kategoriler" : "Markalar",
            href: "/3d-yazicilar",
          },
          { name: title },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-secondary to-slate-800 p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              {brandInfo ? "Yetkili Marka Sayfası" : "Katalog"}
            </span>
            {brandInfo?.isOfficialDistributor && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                <Award className="h-3 w-3" />
                Türkiye Resmi Distribütörü
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{title}</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <span>Filtreler</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Sıfırla</span>
              </button>
            </div>

            {/* In Stock Toggle */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                />
                <span>Yalnızca Stoktaki Ürünler</span>
              </label>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Marka
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {allBrands.map((brandName) => (
                  <label
                    key={brandName}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brandName)}
                        onChange={() => toggleBrand(brandName)}
                        className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>{brandName}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500 uppercase tracking-wider">
                  Maksimum Fiyat
                </span>
                <span className="text-primary font-bold">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl bg-white p-4 border border-slate-200">
            <div className="text-xs font-semibold text-slate-600">
              Toplam <strong>{filtered.length}</strong> ürün listeleniyor
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sıralama:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="rating">En Yüksek Puanlılar</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Seçilen kriterlere uygun ürün bulunamadı.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Filtreleri temizleyerek diğer 3D yazıcı ve filament modellerini inceleyebilirsiniz.
              </p>
              <Button onClick={resetFilters} size="sm" variant="outline">
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
