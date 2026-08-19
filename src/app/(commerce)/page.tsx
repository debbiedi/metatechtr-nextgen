"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/commerce/ProductCard";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Wrench,
  RotateCcw,
  Lock,
  CheckCircle2,
} from "lucide-react";

/* ─── Real MetaTechTR Product Images (T-Soft CDN) ─── */
const IMG = {
  // Bambu Lab 3D Printers
  x1c: "https://cdn.shopify.com/s/files/1/0569/0281/1815/products/x1-carbon-combo_800x.png",
  p1s: "https://cdn.shopify.com/s/files/1/0569/0281/1815/files/P1S-Combo_800x.png",
  p2s: "https://store.metatechtr.com/bambu-lab-p2s-combo-3d-printer-bambu-lab-bambu-lab-9777-68-K.webp",
  a1: "https://cdn.shopify.com/s/files/1/0569/0281/1815/files/A1-combo-1_800x.png",
  h2s: "https://store.metatechtr.com/bambu-lab-h2s-combo-3d-printer-bambu-lab-bambu-lab-9668-68-K.webp",
  // Filament
  filament: "https://store.metatechtr.com/uzy-pro-pla-1-75mm-graphene-black-1000g-uzy-uzy-7111-56-K.webp",
  // Resin placeholder (from T-Soft)
  resin: "https://store.metatechtr.com/elegoo-abs-like-resin-2-0-1kg-clear-blue-elegoo-elegoo-8613-60-K.webp",
  // 3D Scanner
  einstar: "https://store.metatechtr.com/einstar-3d-scanner-shining-3d-shining3d-6997-54-K.webp",
  // Accessories
  hotend: "https://store.metatechtr.com/complete-hotend-assembly-x1-p1-bambu-lab-bambu-lab-4733-20-K.jpg",
  ams: "https://store.metatechtr.com/bambu-lab-ams-2-bambu-lab-bambu-lab-9641-68-K.webp",
  // PEI Plate
  peiPlate: "https://store.metatechtr.com/bambu-lab-dual-sided-textured-pei-plate-bambu-lab-bambu-lab-4795-20-K.jpg",
  // Prusa
  prusa: "https://store.metatechtr.com/original-prusa-mk4s-3d-printer-assembled-prusa-research-prusa-research-9559-68-K.webp",
  // Logo
  logo: "https://store.metatechtr.com/Data/EditorFiles/catalog/metatechtr/logo/metatechtr.png",
};

export default function HomePage() {
  const featuredPrinters = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Editorial CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                <span className="text-slate-950 block">Fikrinizi</span>
                <span className="text-[#1877f2] block">Gerçeğe Dönüştürün.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-lg font-normal leading-relaxed">
                Profesyonel 3D yazıcılar, filamentler ve üretim çözümleri. Yüksek hassasiyet, güvenilirlik ve endüstriyel kalite tek bir yerde.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/3d-yazicilar">
                  <button className="h-12 px-7 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md active:scale-98">
                    3D Yazıcıları Keşfet
                  </button>
                </Link>

                <Link href="/3d-yazicilar">
                  <button className="h-12 px-7 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 transition-all active:scale-98">
                    En Yeni Modeller
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column: Premium Flagship 3D Printer Floating Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-white p-8 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col items-center">
                <div className="relative w-full aspect-4/3 flex items-center justify-center">
                  <img
                    src={IMG.x1c}
                    alt="Bambu Lab X1-Carbon Combo 3D Printer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-center mt-3">
                  <div className="text-sm font-bold text-slate-900">Bambu Lab X1-Carbon Combo 3D Printer</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    *Filamentler ayrı satılmaktadır
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS HORIZONTAL BAR */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-6 border-y border-slate-100 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#1877f2] shrink-0" />
            <span>Orijinal Ürün / Distribütör Garantisi</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Truck className="h-4 w-4 text-[#1877f2] shrink-0" />
            <span>Aynı Gün Kargo</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Wrench className="h-4 w-4 text-[#1877f2] shrink-0" />
            <span>Yetkili Teknik Servis</span>
          </div>

          <div className="flex items-center gap-2.5">
            <RotateCcw className="h-4 w-4 text-[#1877f2] shrink-0" />
            <span>14 Gün Koşulsuz İade</span>
          </div>

          <div className="flex items-center gap-2.5 col-span-2 md:col-span-1">
            <Lock className="h-4 w-4 text-[#1877f2] shrink-0" />
            <span>Güvenli Ödeme</span>
          </div>
        </div>
      </section>

      {/* 3. KATEGORİLER (Bento Grid Layout) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Kategoriler</h2>
          <p className="text-xs text-slate-500 mt-0.5">İhtiyacınıza uygun çözümü bulun</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Big Left Box: 3D Yazıcılar (Span 7 cols) */}
          <Link
            href="/3d-yazicilar"
            className="md:col-span-7 group relative overflow-hidden rounded-3xl bg-white p-8 border border-slate-100 hover:border-slate-200 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1877f2] transition-colors">
                3D Yazıcılar
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                FDM, Reçine ve Endüstriyel seviye üretim araçları.
              </p>
              <div className="mt-4 text-[#1877f2] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            <div className="relative w-full h-44 flex items-end justify-end mt-4">
              <img
                src={IMG.p1s}
                alt="3D Yazıcılar"
                className="max-h-full object-contain"
              />
            </div>
          </Link>

          {/* Right Column: 2 Stacked Cards (Span 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Filamentler Card */}
            <Link
              href="/filamentler"
              className="group relative overflow-hidden rounded-3xl bg-white p-6 border border-slate-100 hover:border-slate-200 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between flex-1"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1877f2] transition-colors">
                  Filamentler
                </h3>
                <div className="mt-2 text-[#1877f2] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div className="w-28 h-24 flex items-center justify-center">
                <img
                  src={IMG.filament}
                  alt="Filamentler"
                  className="max-h-full object-contain"
                />
              </div>
            </Link>

            {/* Reçineler Card */}
            <Link
              href="/recineler"
              className="group relative overflow-hidden rounded-3xl bg-white p-6 border border-slate-100 hover:border-slate-200 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between flex-1"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1877f2] transition-colors">
                  Reçineler
                </h3>
                <div className="mt-2 text-[#1877f2] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div className="w-28 h-24 flex items-center justify-center">
                <img
                  src={IMG.resin}
                  alt="Reçineler"
                  className="max-h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Bottom Row: 3 equal cards */}
          {/* 3D Tarayıcılar */}
          <Link
            href="/3d-tarayici"
            className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-white p-6 border border-slate-100 hover:border-slate-200 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1877f2] transition-colors">
                3D Tarayıcılar
              </h3>
              <div className="mt-2 text-[#1877f2] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            <div className="w-24 h-20 flex items-center justify-center">
              <img
                src={IMG.einstar}
                alt="3D Tarayıcılar"
                className="max-h-full object-contain"
              />
            </div>
          </Link>

          {/* Yedek Parça & Aksesuar */}
          <Link
            href="/3d-yazici-yedek-parca-ve-aksesuarlari"
            className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-white p-6 border border-slate-100 hover:border-slate-200 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1877f2] transition-colors">
                Yedek Parça & Aksesuar
              </h3>
              <div className="mt-2 text-[#1877f2] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            <div className="w-24 h-20 flex items-center justify-center">
              <img
                src={IMG.ams}
                alt="Yedek Parça ve Aksesuarlar"
                className="max-h-full object-contain"
              />
            </div>
          </Link>

          {/* Teknik Servis */}
          <Link
            href="/garanti-ve-servis"
            className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-[#0f172a] p-6 border border-slate-700 hover:border-slate-600 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-[#60a5fa] transition-colors">
                Teknik Servis
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Yetkili garanti & onarım</p>
              <div className="mt-2 text-[#60a5fa] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-[#60a5fa]" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. ÖNE ÇIKAN ÜRÜNLER (4 Cards Grid) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Öne Çıkan Ürünler</h2>
            <p className="text-xs text-slate-500 mt-0.5">Profesyonellerin tercihi.</p>
          </div>
          <Link
            href="/3d-yazicilar"
            className="text-xs font-bold text-[#1877f2] hover:underline flex items-center gap-1"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrinters.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. BAMBU LAB SPOTLIGHT (Dark Navy Banner) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0f172a] text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: White Card with 3D Printer Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white p-6 shadow-md flex flex-col items-center justify-center">
                <img
                  src={IMG.h2s}
                  alt="Bambu Lab H2S Combo"
                  className="max-h-72 object-contain"
                />
                <span className="text-[10px] text-slate-400 mt-2">
                  *Filamentler ayrı satılmaktadır
                </span>
              </div>
            </div>

            {/* Right: Technical Details & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block text-[11px] font-bold tracking-widest text-[#1877f2] uppercase">
                ÖNE ÇIKAN MARKA
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Bambu Lab ile Üretimin Yeni Nesli
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Yapay zeka destekli hata tespiti, çoklu renk baskı kapasitesi (AMS) ve inanılmaz hızlar. Endüstriyel performansı masaüstünüze getiren yenilikçi teknoloji ile tanışın.
              </p>

              {/* Two Big Stats */}
              <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-800/80 max-w-md">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">500 mm/s</div>
                  <div className="text-xs text-slate-400 mt-0.5">Maksimum Hız</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">AI Lidar</div>
                  <div className="text-xs text-slate-400 mt-0.5">Mikro Metre Hassasiyet</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link href="/bambu-lab">
                  <button className="h-11 px-6 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-xs transition-colors shadow-md">
                    Bambu Lab Serisini İncele
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. YETKİLİ MARKALAR BAR */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          YETKİLİ MARKALAR
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 text-lg sm:text-xl font-bold text-slate-800 opacity-80">
          <Link href="/bambu-lab" className="hover:text-[#1877f2] transition-colors">
            Bambu Lab
          </Link>
          <Link href="/original-prusa" className="hover:text-[#1877f2] transition-colors">
            Prusa
          </Link>
          <Link href="/3d-yazicilar" className="hover:text-[#1877f2] transition-colors">
            UltiMaker
          </Link>
          <Link href="/3d-yazicilar" className="hover:text-[#1877f2] transition-colors">
            Creality
          </Link>
        </div>
      </section>

      {/* 7. MÜKEMMEL BASKI İÇİN MÜKEMMEL ZEMİN (PEI Plate Banner) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            {/* Left: Text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                MALZEME LABORATUVARI
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Mükemmel Baskı İçin Mükemmel Zemin
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                Yüksek kaliteli PEI tablalar ve gelişmiş filament çeşitleriyle baskılarınızın ilk katmanından son katmanına kadar kusursuz olmasını sağlayın. Her uygulama için doğru materyal.
              </p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1877f2]" />
                  <span>Çift taraflı dokulu PEI yüzey</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1877f2]" />
                  <span>Mükemmel yapışma ve kolay ayrılma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1877f2]" />
                  <span>Yüksek sıcaklık dayanımı</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/3d-yazici-yedek-parca-ve-aksesuarlari">
                  <button className="h-10 px-5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs transition-colors">
                    Özel Malzemeleri Görüntüle
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: PEI Plate Image */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative rounded-2xl bg-white p-6 shadow-sm border border-slate-100 max-w-xs">
                <img
                  src={IMG.peiPlate}
                  alt="Textured PEI Build Plate"
                  className="max-h-60 object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
