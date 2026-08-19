"use client";

import * as React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, X } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      width="max-w-md"
      title={
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">Sepetim</span>
          <span className="h-2 w-2 rounded-full bg-[#10b981]" />
        </div>
      }
      footer={
        items.length > 0 ? (
          <div className="space-y-4">
            {/* Calculations Breakdown matching Stitch Image 4 */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Kargo</span>
                <span className="font-bold text-[#10b981]">Ücretsiz</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-100 text-lg font-black text-slate-900">
                <span>Toplam</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <button className="w-full h-12 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <span>Siparişi Tamamla</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>

              <Link href="/sepet" onClick={closeCart} className="block w-full">
                <button className="w-full h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors">
                  Sepete Git
                </button>
              </Link>
            </div>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <p className="text-sm font-bold text-slate-900">Sepetinizde ürün bulunmuyor.</p>
          <button
            onClick={closeCart}
            className="text-xs font-bold text-[#1877f2] hover:underline"
          >
            Alışverişe Devam Et &rarr;
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {items.map((item, index) => (
            <div key={`${item.product.id}-${index}`} className="py-4 flex gap-3">
              {/* Product Thumbnail */}
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.product.name}
                    </h5>
                    <button
                      onClick={() =>
                        removeItem(item.product.id, item.selectedVariant?.id)
                      }
                      className="text-slate-400 hover:text-red-600 transition-colors p-0.5"
                      title="Sil"
                      aria-label="Sil"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    {item.selectedVariant?.name || "Endüstriyel Sınıf"}
                  </p>
                </div>

                {/* Stepper + Price */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-slate-200 rounded-lg h-7 bg-white">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                          item.selectedVariant?.id
                        )
                      }
                      className="px-2 text-slate-600 hover:text-slate-900 font-bold"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                          item.selectedVariant?.id
                        )
                      }
                      className="px-2 text-slate-600 hover:text-slate-900 font-bold"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <span className="text-xs font-black text-slate-900">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}
