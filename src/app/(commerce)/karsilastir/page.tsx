"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { Check, X } from "lucide-react";

export default function ComparePage() {
  const { addItem } = useCartStore();

  const comparisonPrinters = [
    {
      id: "comp-1",
      name: "Bambu Lab X2D Combo",
      subtitle: "Yüksek hızlı endüstriyel baskı çözümü.",
      image: "https://cdn1.bambulab.com/bambu-lab/product/x1/x1-carbon-combo.png",
      badge: "Popüler",
      price: "₺42.999",
      buildVolume: "256 × 256 × 256 mm",
      maxSpeed: "500 mm/s",
      nozzle: "0.4mm Hardened Steel",
      autoCalibration: "Tam Otomatik",
      amsSupport: "Dahili (Combo)",
      rawProduct: PRODUCTS[0],
    },
    {
      id: "comp-2",
      name: "Original Prusa CORE One",
      subtitle: "Açık kaynaklı güvenilirlik ve hassasiyet.",
      image: "https://cdn1.bambulab.com/bambu-lab/product/x1/x1-carbon-combo.png",
      price: "₺35.499",
      priceHighlight: true,
      buildVolume: "220 × 220 × 250 mm",
      maxSpeed: "300 mm/s",
      nozzle: "0.4mm Nextruder",
      nozzleHighlight: true,
      autoCalibration: "Yarı Otomatik",
      amsSupport: "Yok",
      rawProduct: PRODUCTS[3],
    },
    {
      id: "comp-3",
      name: "Bambu Lab P2S",
      subtitle: "Maliyet odaklı, güçlü performans.",
      image: "https://cdn1.bambulab.com/bambu-lab/product/x1/x1-carbon-combo.png",
      price: "₺28.999",
      buildVolume: "256 × 256 × 256 mm",
      maxSpeed: "500 mm/s",
      nozzle: "0.4mm Stainless Steel",
      autoCalibration: "Tam Otomatik",
      amsSupport: "Uyumlu (Opsiyonel)",
      rawProduct: PRODUCTS[1],
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Heading */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950">
          Model Karşılaştırması
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          İhtiyaçlarınıza en uygun endüstriyel 3D yazıcıyı bulmak için teknik özellikleri karşılaştırın.
        </p>
      </div>

      {/* 3-Column Comparison Grid (Exact Stitch Image 5 Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisonPrinters.map((printer) => (
          <div
            key={printer.id}
            className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Product Image Card */}
              <div className="relative aspect-square rounded-2xl bg-[#fafafa] p-4 flex items-center justify-center">
                {printer.badge && (
                  <span className="absolute top-3 right-3 rounded-full bg-[#10b981] text-white text-[9.5px] font-bold px-2.5 py-0.5">
                    {printer.badge}
                  </span>
                )}
                <img
                  src={printer.image}
                  alt={printer.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {printer.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{printer.subtitle}</p>
              </div>

              {/* Rows List (Alternating light blue/slate rows) */}
              <div className="space-y-1 text-xs pt-2">
                {/* Fiyat */}
                <div className="flex justify-between items-center p-2.5 rounded-lg">
                  <span className="text-slate-500 font-medium">Fiyat</span>
                  <span
                    className={`font-black ${
                      printer.priceHighlight ? "text-[#1877f2]" : "text-slate-900"
                    }`}
                  >
                    {printer.price}
                  </span>
                </div>

                {/* Baskı Hacmi */}
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#f0f7ff]/70">
                  <span className="text-slate-500 font-medium">Baskı Hacmi</span>
                  <span className="font-bold text-[#1877f2]">
                    {printer.buildVolume}
                  </span>
                </div>

                {/* Maksimum Hız */}
                <div className="flex justify-between items-center p-2.5 rounded-lg">
                  <span className="text-slate-500 font-medium">Maksimum Hız</span>
                  <span className="font-bold text-[#1877f2]">
                    {printer.maxSpeed}
                  </span>
                </div>

                {/* Nozzle */}
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#f0f7ff]/70">
                  <span className="text-slate-500 font-medium">Nozzle</span>
                  <span
                    className={`font-bold ${
                      printer.nozzleHighlight ? "text-[#1877f2]" : "text-slate-800"
                    }`}
                  >
                    {printer.nozzle}
                  </span>
                </div>

                {/* Oto Kalibrasyon */}
                <div className="flex justify-between items-center p-2.5 rounded-lg">
                  <span className="text-slate-500 font-medium">Oto Kalibrasyon</span>
                  <span className="font-bold text-[#1877f2] flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>{printer.autoCalibration}</span>
                  </span>
                </div>

                {/* AMS Desteği */}
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#f0f7ff]/70">
                  <span className="text-slate-500 font-medium">AMS Desteği</span>
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      printer.amsSupport === "Yok"
                        ? "text-slate-500"
                        : "text-[#1877f2]"
                    }`}
                  >
                    {printer.amsSupport === "Yok" ? (
                      <>
                        <X className="h-3.5 w-3.5" />
                        <span>Yok</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>{printer.amsSupport}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart Button */}
            <button
              onClick={() => addItem(printer.rawProduct)}
              className="w-full h-11 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
