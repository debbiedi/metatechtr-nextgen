import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  CreditCard,
  Lock,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary-dark text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/* 4 Pillar Assurances Bar */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-secondary/60 border border-slate-800">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Resmi Distribütör Garantisi
              </h4>
              <p className="text-xs text-slate-400">
                Bambu Lab, Prusa ve tüm cihazlarda 2 yıl yetkili servis ve orijinal yedek parça güvencesi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-accent/10 p-3 text-accent shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Aynı Gün Hızlı Kargo
              </h4>
              <p className="text-xs text-slate-400">
                Hafta içi 16:00&apos;a kadar verilen siparişler aynı gün korumalı ambalajla kargolanır.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400 shrink-0">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Uzman Teknik Destek
              </h4>
              <p className="text-xs text-slate-400">
                Mühendislerimiz tarafından ücretsiz ilk kurulum, dilimleme ayarları ve arıza desteği.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 shrink-0">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                14 Gün Koşulsuz İade
              </h4>
              <p className="text-xs text-slate-400">
                Açılmamış orijinal kutulu ürünlerde 14 gün içinde hızlı ve sorunsuz iade imkanı.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-extrabold text-lg">
              M
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              METATECH<span className="text-primary">TR</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            MetaTechTR, Türkiye&apos;nin lider 3D yazıcı, 3D tarayıcı, mühendislik filamentleri ve profesyonel 3D baskı servisleri sağlayıcısıdır. Bambu Lab ve Original Prusa Türkiye Resmi Distribütörüdür.
          </p>

          <div className="space-y-2 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>Maslak Mah. Büyükdere Cad. Nurol Plaza No: 255 Sarıyer / İstanbul</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>444 3387 / +90 850 532 5363</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>destek@metatechtr.com / info@metatechtr.com</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-white">
            Kategoriler
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/3d-yazicilar" className="hover:text-white transition-colors">
                3D Yazıcılar
              </Link>
            </li>
            <li>
              <Link href="/3d-tarayici" className="hover:text-white transition-colors">
                3D Tarayıcılar
              </Link>
            </li>
            <li>
              <Link href="/filamentler" className="hover:text-white transition-colors">
                Filamentler (PLA, PETG, TPU)
              </Link>
            </li>
            <li>
              <Link href="/recineler" className="hover:text-white transition-colors">
                Reçineler
              </Link>
            </li>
            <li>
              <Link href="/3d-yazici-yedek-parca-ve-aksesuarlari" className="hover:text-white transition-colors">
                Yedek Parça & Nozzle
              </Link>
            </li>
            <li>
              <Link href="/bambu-lab" className="hover:text-white transition-colors text-emerald-400 font-semibold">
                Bambu Lab Türkiye
              </Link>
            </li>
          </ul>
        </div>

        {/* Services & Ecosystem */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-white">
            Hizmetler & Ekosistem
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/3d-baski-teklifi" className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-amber-400">
                <span>3D Baskı Fiyat Teklifi</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </li>
            <li>
              <Link href="/garanti-ve-servis" className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-emerald-400">
                <span>Garanti & RMA Sorgulama</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </li>
            <li>
              <Link href="/karsilastir" className="hover:text-white transition-colors">
                Yazıcı Karşılaştırma Matrisi
              </Link>
            </li>
            <li>
              <Link href="/hesabim" className="hover:text-white transition-colors">
                Cihazlarım & Servis Kayıtlarım
              </Link>
            </li>
            <li>
              <Link href="/sepet" className="hover:text-white transition-colors">
                Sipariş Takibi
              </Link>
            </li>
          </ul>
        </div>

        {/* Corporate & Legal */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-white">
            Kurumsal
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Banka Hesap Numaralarımız
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                KVKK ve Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Mesafeli Satış Sözleşmesi
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                İletişim & Randevu
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Security Bar */}
      <div className="container mx-auto px-4 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} MetaTechTR E-Ticaret ve Bilişim A.Ş. Tüm hakları saklıdır.
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Lock className="h-3.5 w-3.5 text-emerald-500" />
            <span>256-Bit SSL Sertifikalı Güvenli Ödeme</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
              3D Secure
            </span>
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
              MasterCard
            </span>
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
              Visa
            </span>
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
              Troy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
