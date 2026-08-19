"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { formatPrice } from "@/lib/utils";
import {
  Search,
  ShoppingCart,
  Scale,
  Heart,
  User,
  ShieldCheck,
  Printer,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const { toggleCart, getItemCount, getTotal } = useCartStore();
  const { compareList } = useCompareStore();
  const { favorites } = useFavoritesStore();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  const cartCount = getItemCount();
  const cartTotal = getTotal();

  // Search Results filtering
  const matchingProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const matchingCategories = searchQuery.trim()
    ? CATEGORIES.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const matchingBrands = searchQuery.trim()
    ? BRANDS.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasSearchResults =
    matchingProducts.length > 0 ||
    matchingCategories.length > 0 ||
    matchingBrands.length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Close search on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          aria-label="Menü"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent shadow-md text-white font-extrabold text-xl tracking-wider">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
              METATECH<span className="text-primary">TR</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
              Bambu Lab & Prusa Distribütörü
            </span>
          </div>
        </Link>

        {/* Search Bar with Live Autocomplete */}
        <div ref={searchRef} className="hidden md:block flex-1 max-w-xl relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="3D Yazıcı, filament (PLA, PETG), yedek parça veya marka ara..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full h-11 pl-11 pr-24 rounded-full border border-slate-300 bg-slate-50/70 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-dark transition-colors"
            >
              Ara
            </button>
          </form>

          {/* Autocomplete Dropdown Preview */}
          {isSearchFocused && searchQuery.trim().length > 1 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in-50 zoom-in-95">
              {hasSearchResults ? (
                <div className="space-y-4">
                  {/* Products */}
                  {matchingProducts.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Ürünler ({matchingProducts.length})
                      </div>
                      <div className="divide-y divide-slate-100">
                        {matchingProducts.map((p) => (
                          <Link
                            key={p.id}
                            href={`/urun/${p.slug}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-3 py-2 hover:bg-slate-50 rounded-lg px-2 transition-colors"
                          >
                            <img
                              src={p.images[0]?.url}
                              alt={p.name}
                              className="h-10 w-10 object-cover rounded bg-slate-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">
                                {p.name}
                              </div>
                              <div className="text-[11px] text-slate-500 font-medium">
                                {p.brand.name} • {formatPrice(p.price.discountedPrice)}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories & Brands */}
                  {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      {matchingCategories.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Kategoriler
                          </div>
                          {matchingCategories.map((c) => (
                            <Link
                              key={c.id}
                              href={`/${c.slug}`}
                              onClick={() => setIsSearchFocused(false)}
                              className="block text-xs font-medium text-slate-700 hover:text-primary py-1"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      {matchingBrands.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Markalar
                          </div>
                          {matchingBrands.map((b) => (
                            <Link
                              key={b.id}
                              href={`/${b.slug}`}
                              onClick={() => setIsSearchFocused(false)}
                              className="block text-xs font-medium text-slate-700 hover:text-primary py-1"
                            >
                              {b.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* View all results button */}
                  <Link
                    href={`/arama?q=${encodeURIComponent(searchQuery.trim())}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="block text-center text-xs font-bold text-primary hover:underline pt-2 border-t border-slate-100"
                  >
                    Tüm sonuçları gör &rarr;
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-slate-500">
                  &ldquo;{searchQuery}&rdquo; için sonuç bulunamadı.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* 3D Print Quote CTA */}
          <Link
            href="/3d-baski-teklifi"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
          >
            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            <span>3D Baskı Teklifi Al</span>
          </Link>

          {/* Warranty / RMA Lookup */}
          <Link
            href="/garanti-ve-servis"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Garanti & Servis</span>
          </Link>

          {/* Compare Button */}
          <Link
            href="/karsilastir"
            className="relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Ürün Karşılaştırma"
            aria-label="Karşılaştırma"
          >
            <Scale className="h-5 w-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {compareList.length}
              </span>
            )}
          </Link>

          {/* Favorites Wishlist */}
          <Link
            href="/sepet"
            className="relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
            title="Favorilerim"
            aria-label="Favoriler"
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white shadow-sm transition-all active:scale-95"
            aria-label="Alışveriş Sepeti"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] font-medium text-white/80 leading-none">
                Sepetim
              </span>
              <span className="text-xs font-black leading-tight">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Bar */}
      <nav className="hidden lg:block border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-sm font-semibold text-slate-800">
            <li>
              <Link
                href="/3d-yazicilar"
                className="flex items-center gap-1.5 px-3 py-2.5 hover:text-primary transition-colors hover:bg-slate-50 rounded-md"
              >
                <Printer className="h-4 w-4 text-primary" />
                <span>3D Yazıcılar</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </Link>
            </li>
            <li>
              <Link
                href="/3d-tarayici"
                className="px-3 py-2.5 hover:text-primary transition-colors hover:bg-slate-50 rounded-md inline-block"
              >
                3D Tarayıcı
              </Link>
            </li>
            <li>
              <Link
                href="/filamentler"
                className="px-3 py-2.5 hover:text-primary transition-colors hover:bg-slate-50 rounded-md inline-block"
              >
                Filamentler
              </Link>
            </li>
            <li>
              <Link
                href="/recineler"
                className="px-3 py-2.5 hover:text-primary transition-colors hover:bg-slate-50 rounded-md inline-block"
              >
                Reçineler
              </Link>
            </li>
            <li>
              <Link
                href="/3d-yazici-yedek-parca-ve-aksesuarlari"
                className="px-3 py-2.5 hover:text-primary transition-colors hover:bg-slate-50 rounded-md inline-block"
              >
                Yedek Parça & Aksesuar
              </Link>
            </li>
            <li>
              <Link
                href="/bambu-lab"
                className="px-3 py-2.5 text-emerald-700 hover:text-emerald-800 font-bold hover:bg-emerald-50 rounded-md inline-block"
              >
                Bambu Lab Türkiye
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/karsilastir"
              className="text-slate-600 hover:text-primary transition-colors"
            >
              Model Karşılaştır
            </Link>
            <Link
              href="/3d-baski-teklifi"
              className="text-primary hover:text-primary-dark transition-colors font-bold"
            >
              Online 3D Baskı Fiyatı &rarr;
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Ürün veya kategori ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 bg-slate-50 text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </form>

          {/* Links */}
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800 pt-2">
            <Link
              href="/3d-yazicilar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-md flex justify-between items-center"
            >
              <span>3D Yazıcılar</span>
              <span className="text-xs text-primary font-bold">Bambu Lab & Prusa</span>
            </Link>
            <Link
              href="/3d-tarayici"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-md"
            >
              3D Tarayıcılar
            </Link>
            <Link
              href="/filamentler"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-md"
            >
              Filamentler (PLA, PETG, TPU)
            </Link>
            <Link
              href="/recineler"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-md"
            >
              Reçineler
            </Link>
            <Link
              href="/3d-yazici-yedek-parca-ve-aksesuarlari"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-md"
            >
              Yedek Parça & Aksesuar
            </Link>
            <Link
              href="/3d-baski-teklifi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-amber-50 text-amber-900 font-bold rounded-md flex items-center justify-between"
            >
              <span>3D Baskı Fiyat Teklifi</span>
              <Sparkles className="h-4 w-4 text-amber-600" />
            </Link>
            <Link
              href="/garanti-ve-servis"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-emerald-50 text-emerald-900 font-bold rounded-md flex items-center justify-between"
            >
              <span>Garanti & Teknik Servis Sorgulama</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </Link>
            <Link
              href="/karsilastir"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-md"
            >
              Yazıcıları Karşılaştır ({compareList.length})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
