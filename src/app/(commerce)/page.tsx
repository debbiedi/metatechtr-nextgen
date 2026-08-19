"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
  CheckCircle2,
  PhoneCall,
  RotateCcw,
  Sliders,
  ChevronRight,
  Star,
  Users,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState<"printers" | "filaments" | "parts">("printers");

  const printers = PRODUCTS.filter((p) => p.category.id === "cat-3d-printers");
  const filaments = PRODUCTS.filter((p) => p.category.id === "cat-filaments");
  const parts = PRODUCTS.filter((p) => p.category.id === "cat-spare-parts");

  const displayProducts =
    activeTab === "printers" ? printers : activeTab === "filaments" ? filaments : parts;

  const heroProduct = PRODUCTS[0]; // Bambu Lab X1-Carbon Combo

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary-dark via-secondary to-slate-900 text-white py-16 lg:py-24 border-b border-slate-800">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 -z-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 -z-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary-light border border-primary/30 backdrop-blur-xs">
                <Award className="h-4 w-4 text-accent" />
                <span>Bambu Lab & Original Prusa Türkiye Resmi Distribütörü</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Geleceğin 3D Baskı Teknolojisi,{" "}
                <span className="bg-gradient-to-r from-primary-light via-white to-accent bg-clip-text text-transparent">
                  MetaTechTR Güvencesiyle
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Yapay zeka destekli yüksek hızlı 3D yazıcılar, endüstriyel 3D tarayıcılar, yüksek toleranslı filamentler ve 2 yıl yetkili teknik servis garantisi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/3d-yazicilar">
                  <Button size="lg" className="font-bold gap-2 text-base px-6 shadow-lg shadow-primary/30">
                    <span>3D Yazıcıları Keşfet</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/3d-baski-teklifi">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-bold gap-2 bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 text-base"
                  >
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>3D Baskı Fiyat Teklifi Al</span>
                  </Button>
                </Link>
              </div>

              {/* Micro stats banner */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-slate-300">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">20.000+</div>
                  <div className="text-xs text-slate-400">Mutlu Müşteri</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">%100 Orijinal</div>
                  <div className="text-xs text-slate-400">Resmi Distribütör</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">Aynı Gün</div>
                  <div className="text-xs text-slate-400">Hızlı Kargo Garantisi</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-6 border border-slate-700/80 shadow-2xl backdrop-blur-md">
                <div className="absolute -top-3 left-6">
                  <Badge variant="distributor" className="shadow-md">
                    HAFTANIN ÖNE ÇIKAN AMİRAL GEMİSİ
                  </Badge>
                </div>

                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-950 mb-4 mt-2">
                  <img
                    src={heroProduct.images[0]?.url}
                    alt={heroProduct.name}
                    className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-bold text-accent backdrop-blur-xs flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span>500 mm/s Hız</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-primary uppercase">
                    {heroProduct.brand.name}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {heroProduct.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {heroProduct.shortDescription}
                  </p>

                  <div className="flex items-baseline justify-between pt-3 border-t border-slate-700">
                    <div>
                      <div className="text-xs text-slate-400 line-through">
                        {formatPrice(heroProduct.price.originalPrice || 74500)}
                      </div>
                      <div className="text-2xl font-extrabold text-white">
                        {formatPrice(heroProduct.price.discountedPrice)}
                      </div>
                    </div>
                    <Link href={`/urun/${heroProduct.slug}`}>
                      <Button size="sm" className="font-bold gap-1">
                        <span>İncele & Satın Al</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL BRANDS GRID */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Yetkili Distribütörlükler & Markalar
          </h2>
          <p className="text-2xl font-extrabold text-slate-900">
            Dünya Lideri 3D Ekosistemi Tek Çatı Altında
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/${brand.slug}`}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:shadow-md transition-all text-center group"
            >
              <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-slate-800 text-sm mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                {brand.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                {brand.name}
              </span>
              {brand.isOfficialDistributor && (
                <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  Resmi Distribütör
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE TILES */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Kategorilere Göre Keşfedin</h2>
            <p className="text-xs text-slate-500">İhtiyacınıza uygun ürün grubunu seçin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-lg bg-primary/10 p-2.5 text-primary font-bold text-xs">
                  {cat.productCount}+ Ürün
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-primary transition-all" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (TABS) */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-xs text-slate-500">
              En çok tercih edilen yazıcılar, sarf malzemeleri ve yedek parçalar
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab("printers")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "printers"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              3D Yazıcılar ({printers.length})
            </button>
            <button
              onClick={() => setActiveTab("filaments")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "filaments"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Filamentler ({filaments.length})
            </button>
            <button
              onClick={() => setActiveTab("parts")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "parts"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Yedek Parça & AMS ({parts.length})
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. 3D PRINT QUOTE & COMPARISON BANNER */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: 3D Print Quote */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-xl flex flex-col justify-between">
            <div className="space-y-3 relative z-10 max-w-md">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>ONLINE 3D BASKI MERKEZİ</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                CAD / STL Dosyanızı Yükleyin, Anında Fiyat Alın
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                FDM, SLA Reçine ve Endüstriyel SLS teknolojileriyle prototip ve seri üretim parçalarınızı en uygun fiyata basıp adresinize gönderelim.
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <Link href="/3d-baski-teklifi">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-bold gap-2">
                  <span>Hemen 3D Teklifi Hesapla</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Warranty & RMA Service */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark p-8 text-white shadow-xl flex flex-col justify-between border border-slate-800">
            <div className="space-y-3 relative z-10 max-w-md">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-accent backdrop-blur-xs border border-emerald-500/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>RESMİ TEKNİK SERVİS PORTALI</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                Cihaz Seri No ile Garanti ve Arıza Takibi
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                MetaTechTR garantili 3D yazıcınızın garanti durumunu sorgulayın, yetkili servis randevusu ve RMA arıza kaydı oluşturun.
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <Link href="/garanti-ve-servis">
                <Button size="lg" className="bg-accent hover:bg-accent-dark text-white font-bold gap-2">
                  <span>Garanti & Servis Sorgula</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY METATECHTR? TRUST SECTION */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
              Neden MetaTechTR?
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              Türkiye&apos;nin En Güvenilir 3D Yazıcı Distribütörü
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Resmi İthalat & Distribütörlük</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bambu Lab ve Prusa ile doğrudan üretici anlaşmalı orijinal kutulu ve garantili ürünler.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">2 Yıl Yetkili Servis</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kendi bünyemizdeki sertifikalı teknik servis ekibimiz ve orijinal yedek parça stoğumuz.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                <PhoneCall className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">444 3387 Çağrı Merkezi</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kurulumdan dilimleme ayarlarına kadar telefon ve WhatsApp üzerinden birebir mühendislik desteği.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Zap className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Stoktan Hızlı Teslimat</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                İstanbul Nurol Plaza ve Arnavutköy ana depomuzdan aynı gün kargo imkanı.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
