"use client";

import * as React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
    getItemCount,
    applyCoupon,
    couponCode,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState(false);
  const [couponSuccess, setCouponSuccess] = React.useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotal();
  const count = getItemCount();

  const freeShippingThreshold = 1500;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal
  );
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponSuccess(true);
      setCouponError(false);
      setCouponInput("");
    } else {
      setCouponError(true);
      setCouponSuccess(false);
    }
  };

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      width="max-w-md"
      title={
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span>Alışveriş Sepeti</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
            {count}
          </span>
        </div>
      }
      footer={
        items.length > 0 ? (
          <div className="space-y-4">
            {/* Coupon Section */}
            {!couponCode ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <Input
                  placeholder="İndirim Kodu (Örn: METATECH10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button type="submit" size="sm" variant="outline">
                  Uygula
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-800 border border-emerald-200">
                <div className="flex items-center gap-1.5 font-medium">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Kupon Uygulandı: <strong>{couponCode}</strong></span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-700 underline font-semibold hover:text-emerald-900"
                >
                  Kaldır
                </button>
              </div>
            )}

            {couponError && (
              <p className="text-xs text-red-500">
                Geçersiz kupon kodu. (Demo kod: <strong>METATECH10</strong>)
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
              <div className="flex justify-between">
                <span>Ara Toplam (KDV Dahil)</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Kupon İndirimi</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Kargo Bedeli</span>
                <span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-emerald-600">
                      ÜCRETSİZ
                    </span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-extrabold text-slate-900">
                <span>Toplam Tutar</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/sepet" onClick={closeCart} className="w-full">
                <Button variant="outline" className="w-full font-semibold" size="sm">
                  Sepete Git
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart} className="w-full">
                <Button className="w-full font-semibold gap-1" size="sm">
                  <span>Siparişi Tamamla</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>256-Bit SSL & 3D Secure Güvenli Ödeme</span>
            </div>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-slate-100 p-6 mb-4 text-slate-400">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            Sepetinizde Henüz Ürün Yok
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mb-6">
            Bambu Lab ve Prusa resmi distribütör garantili 3D yazıcıları ve filamentleri hemen keşfedin.
          </p>
          <Button onClick={closeCart} size="sm">
            Alışverişe Başla
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Free Shipping Progress Bar */}
          <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-700 mb-1.5">
              <Truck className="h-4 w-4 text-primary" />
              {remainingForFreeShipping === 0 ? (
                <span className="font-semibold text-emerald-700">
                  Tebrikler! Kargo Ücretsiz Avantajını Kazandınız!
                </span>
              ) : (
                <span>
                  Ücretsiz kargo için <strong>{formatPrice(remainingForFreeShipping)}</strong> daha ekleyin!
                </span>
              )}
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="divide-y divide-slate-100">
            {items.map((item, index) => {
              const img =
                item.product.images[0]?.url ||
                "https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=300&q=80";

              return (
                <div key={`${item.product.id}-${index}`} className="py-3 flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-50 border border-slate-100">
                    <img
                      src={img}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedVariant?.id
                            )
                          }
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Ürünü Sil"
                          aria-label="Sil"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-slate-500">
                          {item.selectedVariant.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors rounded-l-md"
                          aria-label="Azalt"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">
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
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors rounded-r-md"
                          aria-label="Artır"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-slate-900">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Drawer>
  );
}
