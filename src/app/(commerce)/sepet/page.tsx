"use client";

import * as React from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
    applyCoupon,
    couponCode,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotal();

  const freeShippingThreshold = 1500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponError(false);
      setCouponInput("");
    } else {
      setCouponError(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <div className="rounded-full bg-slate-100 p-6 w-20 h-20 mx-auto flex items-center justify-center text-slate-400">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Sepetiniz Boş</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          MetaTechTR mağazasındaki 3D yazıcıları ve filamentleri hemen keşfedin.
        </p>
        <Link href="/3d-yazicilar">
          <Button size="lg" className="font-bold">
            Alışverişe Başla
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Breadcrumbs items={[{ name: "Alışveriş Sepeti" }]} />

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
        Alışveriş Sepetim ({items.length} Farklı Ürün)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Tracker */}
          <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Truck className="h-4 w-4 text-primary" />
              {remainingForFreeShipping === 0 ? (
                <span className="font-bold text-emerald-700">
                  Tebrikler! Ücretsiz Kargo Avantajından Faydalanıyorsunuz.
                </span>
              ) : (
                <span>
                  Ücretsiz kargo için sepetinize <strong>{formatPrice(remainingForFreeShipping)}</strong> değerinde ürün ekleyin!
                </span>
              )}
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Table */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-1">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {item.product.brand.name}
                      </span>
                      <Link href={`/urun/${item.product.slug}`}>
                        <h4 className="text-sm font-bold text-slate-900 hover:text-primary transition-colors line-clamp-2">
                          {item.product.name}
                        </h4>
                      </Link>
                      {item.selectedVariant && (
                        <div className="text-xs text-slate-500 font-medium">
                          {item.selectedVariant.name}
                        </div>
                      )}
                      <div className="text-xs font-bold text-slate-900 sm:hidden">
                        {formatPrice(item.unitPrice)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-300 rounded-lg h-9">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedVariant?.id
                          )
                        }
                        className="px-2.5 text-slate-600 hover:bg-slate-100 h-full rounded-l-lg font-bold"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">
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
                        className="px-2.5 text-slate-600 hover:bg-slate-100 h-full rounded-r-lg font-bold"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-right min-w-[100px]">
                      <div className="text-sm font-black text-slate-900">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Adet: {formatPrice(item.unitPrice)}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() =>
                        removeItem(item.product.id, item.selectedVariant?.id)
                      }
                      className="text-slate-400 hover:text-red-600 p-2 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/3d-yazicilar"
                className="text-xs font-bold text-slate-600 hover:text-primary flex items-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Alışverişe Devam Et</span>
              </Link>
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Sepeti Boşalt
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Sipariş Özeti
            </h3>

            {/* Coupon Code Input */}
            <div className="space-y-2">
              {!couponCode ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    placeholder="İndirim Kodu (METATECH10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="h-10 text-xs"
                  />
                  <Button type="submit" size="sm" variant="outline">
                    Uygula
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="h-4 w-4" />
                    <span>Kupon: {couponCode}</span>
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
                <p className="text-xs text-red-500">Geçersiz kupon kodu.</p>
              )}
            </div>

            {/* Pricing breakdown */}
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span>Ara Toplam (KDV Dahil)</span>
                <span className="font-bold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Kupon İndirimi</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Kargo Bedeli</span>
                <span className="font-bold">
                  {shipping === 0 ? (
                    <span className="text-emerald-600">ÜCRETSİZ</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t border-slate-200 text-lg font-black text-slate-900">
                <span>Ödenecek Tutar</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full font-bold text-base gap-2">
                <span>Ödeme Adımına Geç</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>256-Bit SSL & 3D Secure Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
