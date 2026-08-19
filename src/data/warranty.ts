import { WarrantyRecord } from "@/types";

export const MOCK_WARRANTY_RECORDS: Record<string, WarrantyRecord> = {
  "MTR-BAMBU-99421": {
    serialNumber: "MTR-BAMBU-99421",
    productName: "Bambu Lab X1-Carbon Combo 3D Yazıcı",
    brand: "Bambu Lab",
    model: "X1-Carbon 256 Combo",
    purchaseDate: "14.02.2025",
    warrantyStatus: "ACTIVE",
    warrantyEndDate: "14.02.2027",
    distributor: "MetaTechTR Resmi Distribütör Garantili",
    registeredOwner: "Ahmet Y**** (Teknoloji A.Ş.)",
    serviceHistory: [
      {
        ticketId: "RMA-2025-0842",
        date: "20.06.2025",
        type: "Periyodik Bakım & Kalibrasyon",
        status: "TAMAMLANDI",
        notes: "X ve Y karbon çubukları temizlendi, hotend termal macunu yenilendi. Test baskısı başarıyla tamamlandı.",
      },
    ],
  },
  "MTR-PRUSA-88102": {
    serialNumber: "MTR-PRUSA-88102",
    productName: "Original Prusa MK4S 3D Yazıcı",
    brand: "Original Prusa",
    model: "MK4S Assembled",
    purchaseDate: "10.01.2025",
    warrantyStatus: "ACTIVE",
    warrantyEndDate: "10.01.2027",
    distributor: "MetaTechTR Resmi Distribütör Garantili",
    registeredOwner: "Mehmet K**** (3D Mühendislik)",
    serviceHistory: [],
  },
  "MTR-EXPIRED-11002": {
    serialNumber: "MTR-EXPIRED-11002",
    productName: "Bambu Lab P1P 3D Yazıcı",
    brand: "Bambu Lab",
    model: "P1P",
    purchaseDate: "05.03.2023",
    warrantyStatus: "EXPIRED",
    warrantyEndDate: "05.03.2025",
    distributor: "MetaTechTR Resmi Distribütör Garantili",
    registeredOwner: "Caner D****",
    serviceHistory: [
      {
        ticketId: "RMA-2023-1102",
        date: "12.11.2023",
        type: "Ekstruder Dişli Değişimi",
        status: "TAMAMLANDI",
        notes: "Sertleştirilmiş çelik dişli montajı yapıldı.",
      },
    ],
  },
};
