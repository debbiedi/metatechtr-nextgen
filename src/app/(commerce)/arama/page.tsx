"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [sortBy, setSortBy] = React.useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const matchingProducts = PRODUCTS.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.name.toLowerCase().includes(q) ||
      p.category.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  });

  const matchingCategories = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const matchingBrands = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

  const sortedProducts = [...matchingProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price.discountedPrice - b.price.discountedPrice;
    if (sortBy === "price-desc") return b.price.discountedPrice - a.price.discountedPrice;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" />
          <span>&ldquo;{query}&rdquo; İçin Arama Sonuçları</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Toplam <strong>{sortedProducts.length}</strong> ürün bulundu.
        </p>
      </div>

      {/* Matching Category/Brand Badges if any */}
      {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">İlgili Kategoriler & Markalar:</span>
          {matchingCategories.map((c) => (
            <Link
              key={c.id}
              href={`/${c.slug}`}
              className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              {c.name}
            </Link>
          ))}
          {matchingBrands.map((b) => (
            <Link
              key={b.id}
              href={`/${b.slug}`}
              className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              {b.name}
            </Link>
          ))}
        </div>
      )}

      {/* Sorting bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <span className="text-xs font-semibold text-slate-600">
          Sonuçlar listeleniyor
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800"
        >
          <option value="featured">Öne Çıkanlar</option>
          <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
          <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
          <option value="rating">En Yüksek Puanlılar</option>
        </select>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
          <Search className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            Aramanızla eşleşen ürün bulunamadı.
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Farklı bir anahtar kelime deneyebilir veya kategorilerimize göz atabilirsiniz.
          </p>
          <Link href="/3d-yazicilar">
            <Button size="sm">Tüm 3D Yazıcılara Göz At</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Breadcrumbs items={[{ name: "Arama Sonuçları" }]} />
      <React.Suspense
        fallback={
          <div className="py-12 text-center text-xs text-slate-500">
            Arama sonuçları yükleniyor...
          </div>
        }
      >
        <SearchResultsContent />
      </React.Suspense>
    </div>
  );
}
