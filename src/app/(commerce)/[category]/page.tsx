"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const categoryInfo = CATEGORIES.find((c) => c.slug === categorySlug);
  const brandInfo = BRANDS.find((b) => b.slug === categorySlug);

  const title = categoryInfo?.name || brandInfo?.name || "3D Yazıcılar";
  const subtitle =
    categoryInfo?.description ||
    brandInfo?.description ||
    "Profesyonel ve hobi amaçlı 3D baskı çözümleri.";

  // Filter state
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([
    "Bambu Lab",
  ]);
  const [selectedTech, setSelectedTech] = React.useState<string>("FDM");
  const [minPrice, setMinPrice] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<string>("featured");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const brandOptions = [
    { name: "Bambu Lab", count: 18 },
    { name: "Prusa Research", count: 8 },
    { name: "Creality", count: 12 },
    { name: "Elegoo", count: 4 },
  ];

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedTech("");
    setMinPrice("");
    setMaxPrice("");
  };

  // Filter products
  let filtered = PRODUCTS.filter((product) => {
    if (selectedBrands.length > 0) {
      const match = selectedBrands.some(
        (b) =>
          product.brand.name.toLowerCase().includes(b.toLowerCase()) ||
          b.toLowerCase().includes(product.brand.name.toLowerCase())
      );
      if (!match) return false;
    }
    if (minPrice && product.price.discountedPrice < Number(minPrice)) {
      return false;
    }
    if (maxPrice && product.price.discountedPrice > Number(maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", href: "/" },
          { name: title },
        ]}
      />

      {/* Page Title & Count / Sort Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-xs">
          <span className="text-slate-500 font-medium">
            <strong className="text-slate-900 font-bold">42</strong> Ürün listeleniyor
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1877f2]"
            >
              <option value="featured">Sırala: Önerilen</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="rating">En Çok Değerlendirilen</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filter (3 cols) */}
        <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-sm font-bold text-slate-900">Filtreler</span>
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#1877f2] hover:underline"
            >
              Temizle
            </button>
          </div>

          {/* MARKA */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              MARKA
            </div>
            <div className="space-y-2">
              {brandOptions.map((brand) => (
                <label
                  key={brand.name}
                  className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => toggleBrand(brand.name)}
                      className="rounded border-slate-300 text-[#1877f2] focus:ring-[#1877f2] h-4 w-4"
                    />
                    <span>{brand.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">({brand.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* FİYAT ARALIĞI */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              FİYAT ARALIĞI
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#1877f2]"
              />
              <span className="text-slate-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#1877f2]"
              />
            </div>
            <button className="w-full py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors">
              Uygula
            </button>
          </div>

          {/* BASKI TEKNOLOJİSİ */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              BASKI TEKNOLOJİSİ
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTech === "FDM"}
                  onChange={() => setSelectedTech(selectedTech === "FDM" ? "" : "FDM")}
                  className="rounded border-slate-300 text-[#1877f2] focus:ring-[#1877f2] h-4 w-4"
                />
                <span>FDM (Fused Deposition)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTech === "SLA"}
                  onChange={() => setSelectedTech(selectedTech === "SLA" ? "" : "SLA")}
                  className="rounded border-slate-300 text-[#1877f2] focus:ring-[#1877f2] h-4 w-4"
                />
                <span>SLA (Stereolithography)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTech === "SLS"}
                  onChange={() => setSelectedTech(selectedTech === "SLS" ? "" : "SLS")}
                  className="rounded border-slate-300 text-[#1877f2] focus:ring-[#1877f2] h-4 w-4"
                />
                <span>SLS (Selective Laser)</span>
              </label>
            </div>
          </div>

          {/* BASKI HACMİ */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              BASKI HACMİ
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="volume"
                  className="text-[#1877f2] focus:ring-[#1877f2] h-4 w-4"
                />
                <span>Küçük (&lt; 200mm³)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-900">
                <input
                  type="radio"
                  name="volume"
                  defaultChecked
                  className="text-[#1877f2] focus:ring-[#1877f2] h-4 w-4"
                />
                <span>Orta (200 - 300mm³)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="volume"
                  className="text-[#1877f2] focus:ring-[#1877f2] h-4 w-4"
                />
                <span>Büyük (&gt; 300mm³)</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Product Grid Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Active Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedBrands.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 font-medium"
              >
                <span>Marka: {b}</span>
                <button
                  onClick={() => toggleBrand(b)}
                  className="hover:text-slate-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}

            {selectedTech && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 font-medium">
                <span>Teknoloji: {selectedTech}</span>
                <button
                  onClick={() => setSelectedTech("")}
                  className="hover:text-slate-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>

          {/* 3-Column Product Cards Grid (Matching Stitch Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pt-6">
            <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 text-xs">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-lg bg-[#1877f2] text-white font-bold text-xs">
              1
            </button>
            <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 text-xs font-semibold">
              2
            </button>
            <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 text-xs font-semibold">
              3
            </button>
            <span className="px-2 text-slate-400 text-xs">...</span>
            <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 text-xs font-semibold">
              8
            </button>
            <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 text-xs">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
