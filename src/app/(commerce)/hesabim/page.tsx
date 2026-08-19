"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  Package,
  ShieldCheck,
  Wrench,
  Heart,
  Settings,
  Building2,
  Calendar,
  Truck,
  ExternalLink,
} from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = React.useState<"devices" | "orders" | "tickets" | "profile">("devices");

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Breadcrumbs items={[{ name: "Müşteri Portalı & Hesabım" }]} />

      {/* Profile Header Card */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-secondary to-slate-800 p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center font-black text-2xl text-white shadow-md">
            AY
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Ahmet Yılmaz</h1>
              <Badge variant="distributor" className="text-[10px]">
                KURUMSAL ÜYE
              </Badge>
            </div>
            <p className="text-xs text-slate-400">Teknoloji A.Ş. • ahmet.yilmaz@example.com</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              MetaTechTR Doğrulanmış Müşteri Hesabı
            </p>
          </div>
        </div>

        <Link href="/garanti-ve-servis">
          <Button size="sm" className="font-bold bg-accent hover:bg-accent-dark text-white">
            Yeni Cihaz Kaydet & Garanti Sorgula
          </Button>
        </Link>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1 shadow-xs text-xs font-bold">
            <button
              onClick={() => setActiveTab("devices")}
              className={`flex items-center gap-2.5 w-full p-3 rounded-lg text-left transition-all ${
                activeTab === "devices"
                  ? "bg-primary text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Kayıtlı Cihazlarım (2)</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2.5 w-full p-3 rounded-lg text-left transition-all ${
                activeTab === "orders"
                  ? "bg-primary text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Sipariş Geçmişim (3)</span>
            </button>

            <button
              onClick={() => setActiveTab("tickets")}
              className={`flex items-center gap-2.5 w-full p-3 rounded-lg text-left transition-all ${
                activeTab === "tickets"
                  ? "bg-primary text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Wrench className="h-4 w-4" />
              <span>Teknik Servis & RMA (1)</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2.5 w-full p-3 rounded-lg text-left transition-all ${
                activeTab === "profile"
                  ? "bg-primary text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Firma & Fatura Bilgileri</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: REGISTERED DEVICES */}
          {activeTab === "devices" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                MetaTechTR Garantili Kayıtlı 3D Yazıcılarım
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Device 1 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase">Bambu Lab</span>
                      <h4 className="text-sm font-bold text-slate-900">X1-Carbon Combo 256</h4>
                      <p className="text-xs text-slate-500 font-mono">SN: MTR-BAMBU-99421</p>
                    </div>
                    <Badge variant="success" className="text-[10px]">GARANTİ AKTİF</Badge>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex justify-between">
                      <span>Satın Alma:</span>
                      <span className="font-semibold text-slate-800">14.02.2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Garanti Bitiş:</span>
                      <span className="font-semibold text-emerald-700">14.02.2027</span>
                    </div>
                  </div>

                  <Link href="/garanti-ve-servis" className="block">
                    <Button size="sm" variant="outline" className="w-full text-xs font-semibold">
                      Servis Geçmişi & Arıza Bildir
                    </Button>
                  </Link>
                </div>

                {/* Device 2 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase">Original Prusa</span>
                      <h4 className="text-sm font-bold text-slate-900">Original Prusa MK4S</h4>
                      <p className="text-xs text-slate-500 font-mono">SN: MTR-PRUSA-88102</p>
                    </div>
                    <Badge variant="success" className="text-[10px]">GARANTİ AKTİF</Badge>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex justify-between">
                      <span>Satın Alma:</span>
                      <span className="font-semibold text-slate-800">10.01.2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Garanti Bitiş:</span>
                      <span className="font-semibold text-emerald-700">10.01.2027</span>
                    </div>
                  </div>

                  <Link href="/garanti-ve-servis" className="block">
                    <Button size="sm" variant="outline" className="w-full text-xs font-semibold">
                      Servis Geçmişi & Arıza Bildir
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Geçmiş Siparişlerim
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  {
                    id: "MTR-2026-98124",
                    date: "Bugün",
                    total: 69990.0,
                    status: "Hazırlanıyor & Bugün Kargoda",
                    carrier: "Yurtiçi Kargo",
                  },
                  {
                    id: "MTR-2025-11048",
                    date: "14.02.2025",
                    total: 1950.0,
                    status: "Teslim Edildi",
                    carrier: "Yurtiçi Kargo",
                  },
                ].map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary">{ord.id}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{ord.date}</span>
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {formatPrice(ord.total)}
                      </div>
                      <div className="text-emerald-700 font-semibold mt-0.5">
                        {ord.status} ({ord.carrier})
                      </div>
                    </div>

                    <Button size="sm" variant="outline">
                      Fatura & Detay
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TICKETS */}
          {activeTab === "tickets" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Yetkili Servis (RMA) Kayıtlarım
              </h3>

              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-primary">RMA-2025-0842</span>
                  <Badge variant="success">TAMAMLANDI</Badge>
                </div>
                <h4 className="font-bold text-slate-900">Bambu Lab X1-Carbon - Periyodik Bakım & Kalibrasyon</h4>
                <p className="text-slate-600">X/Y Karbon çubuklar temizlendi, firmware güncellendi ve test baskısı onaylandı.</p>
                <div className="text-[11px] text-slate-400 pt-1">İşlem Tarihi: 20.06.2025</div>
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === "profile" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Kayıtlı Kurumsal Bilgiler
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 font-medium">Firma Ünvanı:</span>
                  <div className="font-bold text-slate-900 mt-0.5">Teknoloji Tasarım ve Bilişim A.Ş.</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Vergi Kimlik No / Daire:</span>
                  <div className="font-bold text-slate-900 mt-0.5">9840291823 / Maslak V.D.</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 font-medium">Kayıtlı Fatura Adresi:</span>
                  <div className="font-bold text-slate-900 mt-0.5">Maslak Mah. Büyükdere Cad. Nurol Plaza No: 255 Sarıyer / İstanbul</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
