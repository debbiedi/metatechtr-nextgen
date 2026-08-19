"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Lock, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">
                MetaTech<span className="text-[#1877f2]">TR</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Endüstriyel seviye 3D baskı çözümleri, yüksek performanslı materyaller ve profesyonel teknik destek merkezi.
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              HIZLI LİNKLER
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/bambu-lab" className="hover:text-white transition-colors">
                  Markalar
                </Link>
              </li>
              <li>
                <Link href="/garanti-ve-servis" className="hover:text-white transition-colors">
                  Teknik Destek
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Kurumsal
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              MÜŞTERİ HİZMETLERİ
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/hesabim" className="hover:text-white transition-colors">
                  Kargo Takip
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  İade Koşulları
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              BÜLTENE KAYIT OLUN
            </h5>
            <p className="text-xs text-slate-400">
              Yeni ürünlerimiz ve kampanyalarımızdan haberdar olun.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full bg-slate-800/80 border border-slate-700 text-xs text-white px-3.5 py-2.5 rounded-l-lg focus:outline-none focus:border-[#1877f2] placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="bg-[#1877f2] hover:bg-[#166fe5] text-white px-4 py-2.5 rounded-r-lg font-bold transition-colors shrink-0"
                aria-label="Gönder"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MetaTechTR. Endüstriyel 3D Yazıcı Teknolojileri. Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <CreditCard className="h-4 w-4" />
            <Lock className="h-4 w-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
