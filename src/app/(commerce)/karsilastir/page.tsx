"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { useCompareStore } from "@/stores/useCompareStore";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Scale,
  Trash2,
  Plus,
  ShoppingCart,
  Check,
  X,
  Zap,
  Box,
  Thermometer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompareStore();
  const { addItem } = useCartStore();

  // If compareList is empty, seed it with 2 top printers for demonstration
  React.useEffect(() => {
    if (compareList.length === 0) {
      addToCompare(PRODUCTS[0]); // Bambu Lab X1C Combo
      addToCompare(PRODUCTS[1]); // Bambu Lab P1S Combo
      addToCompare(PRODUCTS[3]); // Original Prusa MK4S
    }
  }, [compareList.length, addToCompare]);

  const availablePrinters = PRODUCTS.filter(
    (p) => !compareList.some((c) => c.id === p.id) && p.category.id === "cat-3d-printers"
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { name: "3D Yazıcılar", href: "/3d-yazicilar" },
          { name: "Model Karşılaştırma Matrisi" },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Scale className="h-4 w-4" />
            <span>Teknik Özellik Kıyaslama Aracı</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            3D Yazıcı Karşılaştırma Matrisi
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bambu Lab ve Prusa amiral gemisi yazıcıların tüm teknik parametrelerini yan yana inceleyin.
          </p>
        </div>

        {compareList.length > 0 && (
          <Button
            onClick={clearCompare}
            variant="outline"
            size="sm"
            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Karşılaştırmayı Temizle
          </Button>
        )}
      </div>

      {/* Comparison Grid Table */}
      {compareList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
          <Scale className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            Karşılaştırma listeniz boş
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Ürün kartlarındaki terazi simgesine tıklayarak 4 adede kadar 3D yazıcı ekleyebilirsiniz.
          </p>
          <Link href="/3d-yazicilar">
            <Button size="sm">3D Yazıcıları İncele</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse min-w-[750px]">
            {/* Header: Product Cards */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-4 w-48 text-xs font-bold uppercase tracking-wider text-slate-500 align-top">
                  Model & Fiyat
                </th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 w-64 align-top border-l border-slate-200">
                    <div className="relative space-y-2">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-1 -right-1 text-slate-400 hover:text-red-600 p-1"
                        title="Kaldır"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="h-32 w-full overflow-hidden rounded-lg bg-white border border-slate-100 flex items-center justify-center p-2">
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="h-full object-contain"
                        />
                      </div>

                      <div className="text-[11px] font-bold text-primary uppercase">
                        {product.brand.name}
                      </div>

                      <Link href={`/urun/${product.slug}`}>
                        <h4 className="text-xs font-bold text-slate-900 hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>

                      <div className="text-base font-extrabold text-slate-900">
                        {formatPrice(product.price.discountedPrice)}
                      </div>

                      <Button
                        onClick={() => addItem(product)}
                        size="sm"
                        className="w-full text-xs font-bold gap-1"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>Sepete Ekle</span>
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec Rows */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Row: Baskı Hacmi */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30 flex items-center gap-1.5">
                  <Box className="h-4 w-4 text-primary" />
                  <span>Baskı Hacmi</span>
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-semibold text-slate-900">
                    {p.buildVolume || "256 × 256 × 256 mm"}
                  </td>
                ))}
              </tr>

              {/* Row: Maksimum Hız */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30 flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-emerald-600" />
                  <span>Maksimum Hız</span>
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-semibold text-emerald-700">
                    {p.maxSpeed || "500 mm/s"}
                  </td>
                ))}
              </tr>

              {/* Row: Nozzle Sıcaklığı */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30 flex items-center gap-1.5">
                  <Thermometer className="h-4 w-4 text-amber-500" />
                  <span>Maksimum Sıcaklık</span>
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-semibold text-slate-900">
                    {p.maxTemp || "300 °C"}
                  </td>
                ))}
              </tr>

              {/* Row: AMS Çoklu Renk Desteği */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">
                  Çok Renk Desteği
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200">
                    {p.isComboAMS ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        <Check className="h-3.5 w-3.5" />
                        AMS ile 16 Renk
                      </span>
                    ) : (
                      <span className="text-slate-500">Tek Renk (Opsiyonel Eklenebilir)</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Karbon Fiber Uyumluluğu */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">
                  Karbon Fiber (CF) Baskı
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200">
                    {p.sku.includes("X1C") || p.sku.includes("MK4S") ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        Sertleştirilmiş Çelik Uç ile Tam Uyumlu
                      </span>
                    ) : (
                      <span className="text-slate-500">Ek Nozzle Yükseltmesi Gerektirir</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Garanti */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Garanti Kapsamı</span>
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 font-medium text-slate-700">
                    2 Yıl MetaTechTR Distribütör Garantisi
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Add More Items Drawer / Quick Picker */}
      {availablePrinters.length > 0 && compareList.length < 4 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="text-xs font-bold text-slate-700">
            Karşılaştırmaya Başka Bir Yazıcı Ekleyin:
          </div>
          <div className="flex flex-wrap gap-2">
            {availablePrinters.map((printer) => (
              <button
                key={printer.id}
                onClick={() => addToCompare(printer)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 hover:border-primary transition-all shadow-2xs"
              >
                <Plus className="h-3 w-3 text-primary" />
                <span>{printer.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
