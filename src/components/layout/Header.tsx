"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import { Search, User, ShoppingCart, X, Menu } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleCart, getItemCount } = useCartStore();
  const cartCount = getItemCount();

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "3D Yazıcılar", href: "/3d-yazicilar" },
    { name: "Filamentler", href: "/filamentler" },
    { name: "Reçineler", href: "/recineler" },
    { name: "Yedek Parça", href: "/3d-yazici-yedek-parca-ve-aksesuarlari" },
    { name: "Servisler", href: "/3d-baski-teklifi" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Left: Official MetaTechTR Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="https://store.metatechtr.com/Data/EditorFiles/catalog/metatechtr/logo/metatechtr.png"
            alt="MetaTechTR Inspiration to Reality"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Center: Clean Stitch Navigation Bar with Blue Underline Indicator */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/3d-yazicilar" &&
                (pathname === "/" || pathname.startsWith("/urun/")));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-6 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#1877f2] font-semibold"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1877f2] rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Minimalist Icons (Search, User, Cart) */}
        <div className="flex items-center space-x-5 text-slate-700">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 hover:text-[#1877f2] transition-colors rounded-full hover:bg-slate-50"
            aria-label="Arama"
          >
            <Search className="h-5 w-5 stroke-[2]" />
          </button>

          {/* User Account Link */}
          <Link
            href="/hesabim"
            className="p-1.5 hover:text-[#1877f2] transition-colors rounded-full hover:bg-slate-50"
            aria-label="Hesabım"
          >
            <User className="h-5 w-5 stroke-[2]" />
          </Link>

          {/* Cart Icon with Numeric Badge */}
          <button
            onClick={toggleCart}
            className="relative p-1.5 hover:text-[#1877f2] transition-colors rounded-full hover:bg-slate-50"
            aria-label="Alışveriş Sepeti"
          >
            <ShoppingCart className="h-5 w-5 stroke-[2]" />
            <span className="absolute -top-0.5 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#1877f2] text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:bg-slate-50 rounded-md"
            aria-label="Menü"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Slide-down Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-md animate-in slide-in-from-top duration-200">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Ürün, marka veya kategori ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-12 rounded-full border border-slate-200 bg-slate-50/70 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1877f2] transition-all"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#1877f2]"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/karsilastir"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#1877f2]"
            >
              Model Karşılaştır
            </Link>
            <Link
              href="/garanti-ve-servis"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#1877f2]"
            >
              Garanti & Teknik Servis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
