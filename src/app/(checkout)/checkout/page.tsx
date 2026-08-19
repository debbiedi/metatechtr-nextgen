"use client";

import * as React from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  MapPin,
  CheckCircle2,
  Lock,
  Building2,
  User,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotal, getSubtotal, getDiscountAmount, getShippingFee, clearCart } = useCartStore();

  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  // Step 1: Address State
  const [invoiceType, setInvoiceType] = React.useState<"individual" | "corporate">("individual");
  const [fullName, setFullName] = React.useState("Ahmet Yılmaz");
  const [email, setEmail] = React.useState("ahmet.yilmaz@example.com");
  const [phone, setPhone] = React.useState("0532 123 45 67");
  const [city, setCity] = React.useState("İstanbul");
  const [district, setDistrict] = React.useState("Sarıyer");
  const [address, setAddress] = React.useState("Maslak Mah. Büyükdere Cad. No: 255");
  const [companyName, setCompanyName] = React.useState("Yılmaz 3D Tasarım Ltd. Şti.");
  const [taxOffice, setTaxOffice] = React.useState("Maslak");
  const [taxNumber, setTaxNumber] = React.useState("9840291823");

  // Step 2: Shipping
  const [shippingCarrier, setShippingCarrier] = React.useState("yurtici");

  // Step 3: Payment
  const [cardNumber, setCardNumber] = React.useState("5421 8492 1029 4812");
  const [cardExpiry, setCardExpiry] = React.useState("08/29");
  const [cardCvv, setCardCvv] = React.useState("842");
  const [cardHolder, setCardHolder] = React.useState("AHMET YILMAZ");
  const [installments, setInstallments] = React.useState(1);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const total = getTotal();
  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();

  const handleFinishPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      clearCart();
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {}
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        {/* Top Minimal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-extrabold text-lg">
              M
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              METATECH<span className="text-primary">TR</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <Lock className="h-4 w-4 text-emerald-600" />
            <span>256-Bit SSL 3D Secure Güvenli Ödeme</span>
          </div>
        </div>

        {/* Step Indicator Bar */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs font-bold">
            <div
              className={`flex items-center gap-1.5 ${
                step >= 1 ? "text-primary font-black" : "text-slate-400"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                1
              </div>
              <span>Teslimat & Fatura</span>
            </div>

            <div className="h-0.5 w-6 sm:w-12 bg-slate-200" />

            <div
              className={`flex items-center gap-1.5 ${
                step >= 2 ? "text-primary font-black" : "text-slate-400"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                2
              </div>
              <span>Kargo Seçimi</span>
            </div>

            <div className="h-0.5 w-6 sm:w-12 bg-slate-200" />

            <div
              className={`flex items-center gap-1.5 ${
                step >= 3 ? "text-primary font-black" : "text-slate-400"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 3
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                3
              </div>
              <span>Banka 3D Secure Ödeme</span>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER CONFIRMED CELEBRATION */}
        {step === 4 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-lg max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
            <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Siparişiniz Başarıyla Alındı
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Tebrikler! Siparişiniz Onaylandı.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Sipariş detaylarınız ve kargo takip bağlantısı <strong>{email}</strong> adresinize ve <strong>{phone}</strong> numaranıza SMS olarak iletildi.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2 font-mono">
                <span className="text-slate-500">Sipariş Takip No:</span>
                <span className="font-bold text-primary text-sm">MTR-2026-98124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Teslim Edilecek Kişi / Firma:</span>
                <span className="font-bold text-slate-800">
                  {invoiceType === "corporate" ? companyName : fullName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Teslimat Adresi:</span>
                <span className="font-bold text-slate-800 text-right">
                  {address}, {district} / {city}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kargo Durumu:</span>
                <span className="font-bold text-emerald-700">
                  Bugün 16:00&apos;da Yurtiçi Kargo&apos;ya Teslim Edilecek
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold">
                <span>Ödenen Tutar (3D Secure Onaylı):</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/" className="w-full sm:w-auto">
                <Button size="lg" className="w-full font-bold">
                  Ana Sayfaya Dön
                </Button>
              </Link>
              <Link href="/garanti-ve-servis" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full font-bold">
                  Garanti & Cihazlarımı Yönet
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* MAIN CHECKOUT FORM & SUMMARY (STEPS 1, 2, 3) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 cols): Step Forms */}
            <div className="lg:col-span-8 space-y-6">
              {/* STEP 1: Address & Invoicing Form */}
              {step === 1 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Teslimat ve Fatura Bilgileri</span>
                  </h3>

                  {/* Individual vs Corporate Invoicing Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setInvoiceType("individual")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        invoiceType === "individual"
                          ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      <span>Bireysel Fatura (Şahıs)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInvoiceType("corporate")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        invoiceType === "corporate"
                          ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Building2 className="h-4 w-4" />
                      <span>Kurumsal Fatura (Şirket)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Ad Soyad / Yetkili</label>
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Adınız ve Soyadınız"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">E-Posta Adresi</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@sirket.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Telefon Numarası</label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">İl / Şehir</label>
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="İstanbul, Ankara, İzmir..."
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Açık Teslimat Adresi</label>
                      <textarea
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Mahalle, Cadde, Sokak, Bina No, Daire..."
                        className="w-full rounded-md border border-slate-200 bg-white p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Corporate Specific Fields */}
                  {invoiceType === "corporate" && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-in fade-in">
                      <div className="sm:col-span-3 space-y-1">
                        <label className="font-bold text-slate-700">Firma Resmi Ünvanı</label>
                        <Input
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Vergi Dairesi</label>
                        <Input
                          value={taxOffice}
                          onChange={(e) => setTaxOffice(e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-700">Vergi Kimlik Numarası (VKN)</label>
                        <Input
                          value={taxNumber}
                          onChange={(e) => setTaxNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <Button onClick={() => setStep(2)} size="lg" className="font-bold gap-2">
                      <span>Kargo Seçimine Devam Et</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Shipping Carrier Choice */}
              {step === 2 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Kargo & Teslimat Yöntemi</span>
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        id: "yurtici",
                        name: "Yurtiçi Kargo (Önerilen)",
                        desc: "16:00'a kadar verilen siparişler aynı gün kargoda.",
                        price: "ÜCRETSİZ",
                      },
                      {
                        id: "kolaygelsin",
                        name: "Kolay Gelsin Randevulu Teslimat",
                        desc: "İstanbul içi kapıda teslimat ve canlı kurye takibi.",
                        price: "ÜCRETSİZ",
                      },
                      {
                        id: "vip",
                        name: "İstanbul VIP Motorlu Kurye",
                        desc: "Aynı gün 3 saat içinde adrese teslimat.",
                        price: "+₺350.00",
                      },
                    ].map((carrier) => (
                      <label
                        key={carrier.id}
                        onClick={() => setShippingCarrier(carrier.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          shippingCarrier === carrier.id
                            ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="carrier"
                            checked={shippingCarrier === carrier.id}
                            onChange={() => setShippingCarrier(carrier.id)}
                            className="text-primary focus:ring-primary h-4 w-4"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">
                              {carrier.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {carrier.desc}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-emerald-700">
                          {carrier.price}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between">
                    <Button onClick={() => setStep(1)} variant="outline" size="lg">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Geri
                    </Button>
                    <Button onClick={() => setStep(3)} size="lg" className="font-bold gap-2">
                      <span>Ödeme Adımına Geç</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Virtual POS 3D Secure Payment */}
              {step === 3 && (
                <form onSubmit={handleFinishPayment} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>Banka Sanal POS & Taksit Seçimi</span>
                    </h3>
                    <Badge variant="distributor" className="text-[10px]">
                      3D SECURE GÜVENCESİ
                    </Badge>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Kart Sahibi Ad Soyad</label>
                      <Input
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Kart Numarası</label>
                      <Input
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Son Kullanma Tarihi</label>
                        <Input
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="AA/YY"
                          className="font-mono text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">CVV / Güvenlik Kodu</label>
                        <Input
                          required
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Installments Table */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Taksit Seçenekleri
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { inst: 1, label: "Tek Çekim", monthly: total },
                        { inst: 3, label: "3 Taksit", monthly: total / 3 },
                        { inst: 6, label: "6 Taksit", monthly: total / 6 },
                        { inst: 12, label: "12 Taksit", monthly: total / 12 },
                      ].map((item) => (
                        <button
                          key={item.inst}
                          type="button"
                          onClick={() => setInstallments(item.inst)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            installments === item.inst
                              ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-extrabold">{item.label}</div>
                          <div className="text-[11px] font-medium text-slate-500 mt-1">
                            {formatPrice(item.monthly)}/ay
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <Button onClick={() => setStep(2)} type="button" variant="outline" size="lg">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Geri
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      isLoading={isProcessing}
                      className="font-extrabold text-base px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                    >
                      <span>{formatPrice(total)} — 3D Secure ile Öde</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column (4 cols): Mini Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Sipariş Özeti ({items.length} Ürün)
                </h4>

                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 max-w-[180px]">
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.name}
                          className="h-9 w-9 rounded object-cover bg-slate-100 shrink-0"
                        />
                        <div className="truncate">
                          <div className="font-bold text-slate-900 truncate">
                            {item.product.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.quantity} Adet
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>İndirim</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span className="text-emerald-700 font-bold">
                      {shipping === 0 ? "ÜCRETSİZ" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                    <span>Toplam</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
