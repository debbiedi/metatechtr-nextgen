"use client";

import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import {
  UploadCloud,
  FileCode,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ShoppingCart,
  RotateCw,
  Box,
  Scale,
  Clock,
  Printer,
  ChevronRight,
} from "lucide-react";

interface SampleFile {
  name: string;
  size: string;
  volumeCm3: number;
  weightGrams: number;
}

const SAMPLE_FILES: SampleFile[] = [
  { name: "3DBenchy_HighSpeed.stl", size: "4.2 MB", volumeCm3: 15.5, weightGrams: 18.2 },
  { name: "AMS_Feeder_Gear_Reinforced.step", size: "8.7 MB", volumeCm3: 8.4, weightGrams: 11.5 },
  { name: "Industrial_Turbine_Housing.stl", size: "14.1 MB", volumeCm3: 65.0, weightGrams: 82.0 },
];

export default function ThreeDQuotePage() {
  const { addItem } = useCartStore();

  const [selectedFile, setSelectedFile] = React.useState<SampleFile>(SAMPLE_FILES[0]);
  const [technology, setTechnology] = React.useState<"FDM" | "SLA" | "SLS">("FDM");
  const [material, setMaterial] = React.useState("PLA");
  const [color, setColor] = React.useState("Siyah");
  const [infill, setInfill] = React.useState(20);
  const [layerHeight, setLayerHeight] = React.useState(0.20);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdded, setIsAdded] = React.useState(false);
  const [wireframe, setWireframe] = React.useState(false);
  const [rotationAngle, setRotationAngle] = React.useState(0);

  // Materials map
  const materialsByTech = {
    FDM: [
      { name: "Uzy Premium PLA", id: "PLA", priceMultiplier: 1.0 },
      { name: "PETG Endüstriyel", id: "PETG", priceMultiplier: 1.2 },
      { name: "ABS / ASA Dayanıklı", id: "ABS", priceMultiplier: 1.4 },
      { name: "Bambu Lab PA-CF (Karbon Fiber)", id: "PA-CF", priceMultiplier: 2.4 },
      { name: "TPU / FLEX Esnek", id: "TPU", priceMultiplier: 1.8 },
    ],
    SLA: [
      { name: "Elegoo 8K Standart Reçine", id: "SLA-STD", priceMultiplier: 1.8 },
      { name: "Prusa Tough Mühendislik Reçinesi", id: "SLA-TOUGH", priceMultiplier: 2.6 },
      { name: "Yüksek Sıcaklık Reçinesi", id: "SLA-HT", priceMultiplier: 3.5 },
    ],
    SLS: [
      { name: "PA12 Endüstriyel Naylon Toz", id: "SLS-PA12", priceMultiplier: 3.8 },
      { name: "PA11 Karbon Elyaf Kompozit", id: "SLS-PA11CF", priceMultiplier: 4.8 },
    ],
  };

  const currentMaterials = materialsByTech[technology];

  // Auto select valid material when technology changes
  React.useEffect(() => {
    setMaterial(currentMaterials[0].id);
  }, [technology]);

  // Pricing calculation formulas
  const activeMaterialObj = currentMaterials.find((m) => m.id === material) || currentMaterials[0];
  const basePricePerCm3 = technology === "FDM" ? 3.5 : technology === "SLA" ? 6.0 : 9.5;
  const infillMultiplier = 0.7 + (infill / 100) * 0.6;
  const layerMultiplier = layerHeight <= 0.12 ? 1.3 : layerHeight <= 0.20 ? 1.0 : 0.85;

  const unitPrice = Math.max(
    85, // minimum setup fee
    selectedFile.volumeCm3 *
      basePricePerCm3 *
      activeMaterialObj.priceMultiplier *
      infillMultiplier *
      layerMultiplier
  );

  const totalPrice = unitPrice * quantity;
  const estimatedHours = Math.max(1, Math.round((selectedFile.volumeCm3 / 10) * layerMultiplier * 1.5));

  const handleAddQuoteToCart = () => {
    // Dynamically create a custom 3D Print Quote product
    const quoteProduct: any = {
      id: `quote-${Date.now()}`,
      sku: `MTR-3D-QUOTE-${technology}`,
      name: `Özel 3D Baskı: ${selectedFile.name} (${activeMaterialObj.name})`,
      slug: "3d-baski-teklifi",
      brand: {
        id: "metatechtr-service",
        name: "MetaTechTR 3D Baskı Servisi",
        slug: "metatechtr",
        isOfficialDistributor: true,
      },
      category: {
        id: "cat-services",
        name: "3D Baskı Hizmeti",
        slug: "3d-baski-hizmeti",
      },
      badge: "ÖZEL ÜRETİM",
      shortDescription: `${technology} Teknolojisi, %${infill} Doluluk, ${layerHeight}mm Katman, Renk: ${color}`,
      fullDescription: "",
      keyFeatures: [],
      images: [
        {
          url: "https://cdn1.bambulab.com/bambu-lab/product/x1/x1-carbon-combo.png",
          alt: selectedFile.name,
          isPrimary: true,
        },
      ],
      price: {
        currency: "TRY",
        rawPrice: unitPrice / 1.2,
        discountedPrice: unitPrice,
        hasDiscount: false,
        discountRatePercentage: 0,
        vatIncluded: true,
        vatRate: 20,
      },
      stock: {
        inStock: true,
        quantity: 999,
        estimatedDelivery: "2-3 İş Gününde Kargoda",
      },
      specifications: [],
      rating: 5.0,
      reviewCount: 1,
      warrantyMonths: 1,
    };

    addItem(quoteProduct, undefined, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { name: "Hizmetler", href: "/3d-baski-teklifi" },
          { name: "3D Baskı Anlık Fiyatlandırma & Dilimleme" },
        ]}
      />

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-secondary to-slate-800 p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Endüstriyel 3D Baskı & Prototipleme Çözümleri</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            3D CAD / STL Yükleyin, Anında Fiyat Hesaplayın
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Bambu Lab ve Prusa 3D yazıcı filomuz ile prototip ve seri üretim parçalarınızı mikrometre hassasiyetinde üretip aynı hafta içinde kargoluyoruz.
          </p>
        </div>
      </div>

      {/* Main Quoting Engine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 3D Visualizer & File Picker (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3D Model Canvas Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3D Model Önizleme
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {wireframe ? "Katı Mod" : "Tel Kafes (Wireframe)"}
              </button>
            </div>

            {/* Interactive 3D Model Display (CSS 3D simulation) */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-950 flex flex-col items-center justify-center p-6 text-white border border-slate-800">
              <div
                className="transition-transform duration-300"
                style={{ transform: `rotate(${rotationAngle}deg)` }}
              >
                <div
                  className={`h-36 w-36 rounded-2xl flex items-center justify-center border-4 ${
                    wireframe
                      ? "border-dashed border-accent bg-transparent"
                      : "border-primary bg-gradient-to-tr from-primary/80 to-accent/80 shadow-2xl shadow-primary/40"
                  }`}
                >
                  <Box className="h-16 w-16 text-white animate-pulse" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                <span>{selectedFile.name}</span>
                <span>{selectedFile.size}</span>
              </div>

              <button
                onClick={() => setRotationAngle((r) => r + 45)}
                className="absolute top-3 right-3 rounded-full bg-slate-800/80 p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Döndür"
              >
                <RotateCw className="h-4 w-4" />
              </button>
            </div>

            {/* Sample STL Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Örnek STL / CAD Dosyası Seçin:
              </label>
              <div className="space-y-1.5">
                {SAMPLE_FILES.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file)}
                    className={`flex items-center justify-between w-full p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                      selectedFile.name === file.name
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{file.name}</span>
                    <span className="text-slate-400 text-[11px] shrink-0 ml-2">
                      {file.volumeCm3} cm³
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Upload Dropzone Simulation */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer bg-slate-50">
              <UploadCloud className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                Kendi STL, STEP veya OBJ Dosyanızı Yükleyin
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Maksimum 50 MB (CAD dosyaları şifrelenerek korunur)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Parameters & Realtime Price (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Üretim Parametreleri & Malzeme Seçimi
            </h3>

            {/* 1. Technology Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Baskı Teknolojisi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "FDM", title: "FDM (Filament)", desc: "Mühendislik & Prototip" },
                  { id: "SLA", title: "SLA (Reçine)", desc: "Yüksek Yüzey Pürüzsüzlüğü" },
                  { id: "SLS", title: "SLS (Naylon)", desc: "Endüstriyel Seri Üretim" },
                ].map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setTechnology(tech.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      technology === tech.id
                        ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="text-xs font-extrabold">{tech.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{tech.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Material Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Malzeme Türü
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentMaterials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setMaterial(mat.id)}
                    className={`p-2.5 rounded-lg border text-xs font-bold text-left transition-all ${
                      material === mat.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Infill & Layer Height Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Infill */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">İç Doluluk Oranı (Infill)</span>
                  <span className="text-primary font-extrabold">%{infill}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={infill}
                  onChange={(e) => setInfill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-[10px] text-slate-400">
                  Önerilen: Standart parçalar için %20, dayanıklı parçalar için %50+
                </span>
              </div>

              {/* Layer Height */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Katman Kalınlığı</span>
                  <span className="text-primary font-extrabold">{layerHeight} mm</span>
                </div>
                <input
                  type="range"
                  min="0.08"
                  max="0.28"
                  step="0.04"
                  value={layerHeight}
                  onChange={(e) => setLayerHeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-[10px] text-slate-400">
                  Düşük katman: Yüksek pürüzsüzlük | Yüksek katman: Hızlı baskı
                </span>
              </div>
            </div>

            {/* 4. Color & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Baskı Rengi
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs font-bold text-slate-800"
                >
                  <option value="Siyah">Mat Siyah</option>
                  <option value="Beyaz">Saf Beyaz</option>
                  <option value="Gri">Titanyum Gri</option>
                  <option value="Mavi">MetaTech Mavisi</option>
                  <option value="Kırmızı">Endüstriyel Kırmızı</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Üretim Adedi
                </label>
                <div className="flex items-center border border-slate-300 rounded-lg h-10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-slate-600 hover:bg-slate-100 h-full rounded-l-lg font-bold"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-bold text-slate-900">
                    {quantity} Adet
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-slate-600 hover:bg-slate-100 h-full rounded-r-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Live Calculation Summary Box */}
            <div className="rounded-xl bg-slate-900 text-white p-5 space-y-4 shadow-lg">
              <div className="grid grid-cols-3 gap-2 text-center border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Hacim</div>
                  <div className="text-sm font-bold text-white">{selectedFile.volumeCm3} cm³</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Tahmini Gramaj</div>
                  <div className="text-sm font-bold text-white">{selectedFile.weightGrams} g</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Baskı Süresi</div>
                  <div className="text-sm font-bold text-white">~{estimatedHours} Saat</div>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xs text-slate-400">Birim Fiyat: </span>
                  <span className="text-sm font-bold text-slate-200">{formatPrice(unitPrice)}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Toplam Teklif (KDV Dahil)</div>
                  <div className="text-2xl font-black text-accent">{formatPrice(totalPrice)}</div>
                </div>
              </div>

              {/* Add Quote To Cart Button */}
              <Button
                onClick={handleAddQuoteToCart}
                size="lg"
                className={`w-full font-bold text-base gap-2 transition-all ${
                  isAdded
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-primary hover:bg-primary-dark text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Teklif Sepete Eklendi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>3D Baskı Teklifini Sepete Ekle</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
