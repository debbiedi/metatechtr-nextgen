import * as React from "react";
import { ShieldCheck, Truck, Phone, MessageSquare, Award } from "lucide-react";

export function TopAnnouncementBar() {
  return (
    <div className="bg-secondary-dark text-slate-300 text-xs py-2 border-b border-slate-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4">
        {/* Left: Distributor Statement */}
        <div className="flex items-center gap-2">
          <Award className="h-3.5 w-3.5 text-accent" />
          <span className="font-semibold text-white">
            Türkiye&apos;nin Bambu Lab & Original Prusa Resmi Distribütörü
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-slate-400">
            2 Yıl Distribütör Garantisi & Yetkili Teknik Servis
          </span>
        </div>

        {/* Right: Hotline & Fast Shipping */}
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1 text-slate-300">
            <Truck className="h-3.5 w-3.5 text-accent" />
            <span className="hidden sm:inline">16:00&apos;a kadar</span>
            <span className="font-semibold text-white">Aynı Gün Kargo</span>
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=908505325363&text=Merhaba%2C%20MetaTechTR%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-accent hover:text-accent-light transition-colors font-medium"
          >
            <MessageSquare className="h-3 w-3" />
            <span>WhatsApp Destek (0850 532 5363)</span>
          </a>

          <a
            href="tel:4443387"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span>444 3387</span>
          </a>
        </div>
      </div>
    </div>
  );
}
