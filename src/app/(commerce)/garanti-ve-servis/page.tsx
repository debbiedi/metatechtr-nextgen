"use client";

import * as React from "react";
import { MOCK_WARRANTY_RECORDS } from "@/data/warranty";
import { WarrantyRecord } from "@/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  FileText,
  Plus,
  PhoneCall,
  Calendar,
  Send,
} from "lucide-react";

export default function WarrantyServicePage() {
  const [serialQuery, setSerialQuery] = React.useState("MTR-BAMBU-99421");
  const [record, setRecord] = React.useState<WarrantyRecord | null>(
    MOCK_WARRANTY_RECORDS["MTR-BAMBU-99421"]
  );
  const [hasSearched, setHasSearched] = React.useState(true);
  const [isRmaModalOpen, setIsRmaModalOpen] = React.useState(false);

  // New RMA Form state
  const [issueType, setIssueType] = React.useState("Hotend / Nozzle Tıkanması");
  const [issueDetails, setIssueDetails] = React.useState("");
  const [createdTicketId, setCreatedTicketId] = React.useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = serialQuery.trim().toUpperCase();
    const found = MOCK_WARRANTY_RECORDS[cleanKey] || null;
    setRecord(found);
    setHasSearched(true);
  };

  const handleCreateRMA = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `RMA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedTicketId(randomTicket);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { name: "Hizmetler & Destek", href: "/garanti-ve-servis" },
          { name: "Garanti & Yetkili Teknik Servis Portalı" },
        ]}
      />

      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-secondary to-slate-800 p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-accent border border-emerald-500/30">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>METATECHTR RESMİ YETKİLİ TEKNİK SERVİS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Cihaz Seri No & Garanti Takip Portalı
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Satın aldığınız Bambu Lab, Original Prusa ve diğer 3D yazıcıların 2 yıllık distribütör garanti durumunu sorgulayabilir, arıza kaydı ve servis talebi oluşturabilirsiniz.
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-4">
        <h3 className="text-base font-bold text-slate-900 text-center">
          Cihazınızın Arkasındaki Seri Numarasını Girin
        </h3>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Örn: MTR-BAMBU-99421 veya MTR-PRUSA-88102"
            value={serialQuery}
            onChange={(e) => setSerialQuery(e.target.value)}
            className="h-12 font-mono text-sm uppercase"
            icon={<Search className="h-4 w-4" />}
          />
          <Button type="submit" size="lg" className="font-bold px-6">
            Sorgula
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>Demo için test edebileceğiniz seri numaraları:</span>
          <button
            type="button"
            onClick={() => {
              setSerialQuery("MTR-BAMBU-99421");
              setRecord(MOCK_WARRANTY_RECORDS["MTR-BAMBU-99421"]);
            }}
            className="font-mono text-primary font-bold hover:underline"
          >
            MTR-BAMBU-99421
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              setSerialQuery("MTR-PRUSA-88102");
              setRecord(MOCK_WARRANTY_RECORDS["MTR-PRUSA-88102"]);
            }}
            className="font-mono text-primary font-bold hover:underline"
          >
            MTR-PRUSA-88102
          </button>
        </div>
      </div>

      {/* Query Result Card */}
      {hasSearched && (
        <div className="max-w-3xl mx-auto">
          {record ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
              {/* Header result */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {record.brand}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    {record.productName}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Seri No: <strong>{record.serialNumber}</strong>
                  </div>
                </div>

                <Badge
                  variant={record.warrantyStatus === "ACTIVE" ? "success" : "danger"}
                  className="text-xs px-3 py-1 font-bold self-start sm:self-auto"
                >
                  {record.warrantyStatus === "ACTIVE"
                    ? "✓ 2 YIL GARANTİ AKTİF"
                    : "GARANTİ SÜRESİ DOLDU"}
                </Badge>
              </div>

              {/* Specs Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>Fatura / Satın Alma Tarihi</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {record.purchaseDate}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Garanti Bitiş Tarihi</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-700">
                    {record.warrantyEndDate}
                  </div>
                </div>
              </div>

              {/* Service & RMA History */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span>Yetkili Servis & Bakım Geçmişi</span>
                  </h4>
                </div>

                {record.serviceHistory.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                    {record.serviceHistory.map((item) => (
                      <div key={item.ticketId} className="p-4 bg-slate-50/50 space-y-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{item.type} ({item.ticketId})</span>
                          <span className="text-emerald-700">{item.status}</span>
                        </div>
                        <p className="text-slate-600">{item.notes}</p>
                        <div className="text-[11px] text-slate-400">{item.date}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    Bu cihaza ait geçmiş arıza veya parça değişim kaydı bulunmamaktadır.
                  </p>
                )}
              </div>

              {/* Action Button: Open RMA Ticket */}
              <div className="pt-2">
                <Button
                  onClick={() => setIsRmaModalOpen(true)}
                  className="w-full font-bold gap-2"
                  size="lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Yeni Yetkili Servis / Arıza Kaydı Aç (RMA)</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center space-y-3">
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">
                Seri Numarası Bulunamadı
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Girdiğiniz seri numarası MetaTechTR distribütör veritabanında eşleşmedi. Lütfen faturanızdaki veya cihazın arkasındaki etiketi kontrol ediniz.
              </p>
            </div>
          )}
        </div>
      )}

      {/* RMA Ticket Modal */}
      <Modal
        isOpen={isRmaModalOpen}
        onClose={() => {
          setIsRmaModalOpen(false);
          setCreatedTicketId(null);
        }}
        title="Yetkili Teknik Servis Arıza Bildirimi (RMA)"
        description="MetaTechTR teknik servis mühendislerimiz cihazınızı inceleyip 24 saat içinde size dönüş yapacaktır."
      >
        {createdTicketId ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">
              Servis Kaydınız Başarıyla Oluşturuldu!
            </h4>
            <div className="rounded-xl bg-slate-100 p-4 font-mono font-bold text-primary text-base">
              Takip No: {createdTicketId}
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Cihazınızı Nurol Plaza teknik servis merkezimize anlaşmalı kargo kodu ile ÜCRETSİZ gönderebilirsiniz.
            </p>
            <Button
              onClick={() => {
                setIsRmaModalOpen(false);
                setCreatedTicketId(null);
              }}
              size="sm"
            >
              Tamam
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCreateRMA} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Cihaz Modeli</label>
              <Input
                value={record?.productName || ""}
                disabled
                className="bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Arıza / Sorun Türü</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800"
              >
                <option value="Hotend / Nozzle Tıkanması">Hotend / Nozzle Tıkanması</option>
                <option value="Yatak Seviyeleme / Kalibrasyon Hatası">Yatak Seviyeleme / Kalibrasyon Hatası</option>
                <option value="Ekstruder Dişli / Motor Arızası">Ekstruder Dişli / Motor Arızası</option>
                <option value="AMS Çoklu Filament Besleme Sorunu">AMS Çoklu Filament Besleme Sorunu</option>
                <option value="Yazılım / Anakart İletişim Hatası">Yazılım / Anakart İletişim Hatası</option>
                <option value="Periyodik Genel Bakım Talebi">Periyodik Genel Bakım Talebi</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Sorun Detayları & Açıklama</label>
              <textarea
                required
                rows={4}
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                placeholder="Karşılaştığınız arızayı, hata kodunu veya parça durumunu detaylıca açıklayınız..."
                className="w-full rounded-md border border-slate-200 bg-white p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full font-bold gap-2" size="lg">
                <Send className="h-4 w-4" />
                <span>Servis Talebini Gönder</span>
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
