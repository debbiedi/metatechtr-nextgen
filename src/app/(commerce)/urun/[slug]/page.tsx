"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useCartStore } from "@/stores/useCartStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import {
  Star,
  Heart,
  Scale,
  ShoppingCart,
  Zap,
  Box,
  Truck,
  ShieldCheck,
  Wrench,
  Lock,
  Plus,
  Minus,
  Sparkles,
  Layers,
  Cpu,
  RotateCw,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const { addItem } = useCartStore();
  const { addToCompare, isInCompare } = useCompareStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState<"overview" | "specs" | "reviews">("overview");

  const inCompare = isInCompare(product.id);
  const favorite = isFavorite(product.id);

  const images = product.images.length > 0 ? product.images : [
    { url: "https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=900&q=80", alt: product.name, isPrimary: true },
    { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80", alt: "AMS Unit", isPrimary: false },
    { url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80", alt: "Hotend", isPrimary: false },
    { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80", alt: "Enclosure", isPrimary: false },
  ];

  // Recommended accessories
  const recommendedAccessories = [
    {
      id: "rec-1",
      name: "Bambu PLA Matte Filament 1kg - Gri",
      brand: "BAMBU LAB",
      price: 950.0,
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "rec-2",
      name: "Complete Hotend Assembly with Hardened Steel Nozzle",
      brand: "BAMBU LAB",
      price: 1650.0,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "rec-3",
      name: "Textured PEI Plate - 256x256mm",
      brand: "BAMBU LAB",
      price: 1200.0,
      image: "https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "rec-4",
      name: "Bambu PETG-CF Filament 1kg - Siyah",
      brand: "BAMBU LAB",
      price: 1850.0,
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { name: "Anasayfa", href: "/" },
          { name: "3D Yazıcılar", href: "/3d-yazicilar" },
          { name: product.name },
        ]}
      />

      {/* Main Product Section (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Media (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl bg-white border border-slate-100 p-8 shadow-xs flex flex-col items-center justify-center">
            {/* Wishlist Heart */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
              aria-label="Favori"
            >
              <Heart
                className={`h-5 w-5 ${favorite ? "fill-rose-600 text-rose-600" : ""}`}
              />
            </button>

            {/* Main Centered Product Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={images[selectedImageIndex]?.url}
                alt={product.name}
                className="max-h-[380px] max-w-full object-contain"
              />
            </div>

            <div className="text-[11px] text-slate-400 mt-2">
              *The filaments in the picture are sold separately
            </div>

            {/* 3D Model View button */}
            <div className="absolute bottom-6 left-6">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors">
                <Box className="h-3.5 w-3.5" />
                <span>3D Model View</span>
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`aspect-square rounded-xl bg-white border-2 p-2 flex items-center justify-center transition-all ${
                  selectedImageIndex === idx
                    ? "border-[#1877f2] shadow-xs"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <img
                  src={img.url}
                  alt="Thumbnail"
                  className="max-h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info & Commerce Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Top Brand & Stokta Pill */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {product.brand.name}
              </span>
              <span className="rounded-full bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-0.5">
                STOKTA
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Stars & Review count & Stock Code */}
            <div className="flex items-center gap-3 text-xs mt-2 text-slate-500">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-[#1877f2] font-semibold hover:underline cursor-pointer">
                24 Değerlendirme
              </span>
              <span className="text-slate-300">|</span>
              <span>Stok Kodu: <strong className="text-slate-700">BL-X2D-C</strong></span>
            </div>
          </div>

          {/* Price Block (Light lavender/slate box matching Stitch Image 2) */}
          <div className="rounded-2xl bg-[#f8fafc] p-6 border border-slate-100 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {formatPrice(product.price.discountedPrice)}
              </span>
              <span className="text-xs font-semibold text-slate-500">+ KDV (%20)</span>
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
              <span>💳</span>
              <span>Axess, World ve Bonus kartlara <strong>6 aya varan taksit</strong> imkanı.</span>
            </p>
          </div>

          {/* 4 Technical Highlight Metric Cards (2x2 Grid matching Stitch) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-[#1877f2]">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">BASKI HIZI</div>
                <div className="text-xs font-extrabold text-slate-900">500 mm/s</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-[#1877f2]">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">RENK KAPASİTESİ</div>
                <div className="text-xs font-extrabold text-slate-900">16 Renge Kadar (AMS)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-[#1877f2]">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">LİDAR SENSÖRÜ</div>
                <div className="text-xs font-extrabold text-slate-900">Çift Mikro Lidar</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-[#1877f2]">
                <Box className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">BASKI HACMİ</div>
                <div className="text-xs font-extrabold text-slate-900">256 × 256 × 256 mm</div>
              </div>
            </div>
          </div>

          {/* Stepper + Primary Blue "SEPETE EKLE" Button */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center border border-slate-200 rounded-xl h-12 bg-white px-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 text-slate-600 hover:text-slate-900 font-bold"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 text-slate-600 hover:text-slate-900 font-bold"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={() => addItem(product, undefined, quantity)}
              className="flex-1 h-12 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>SEPETE EKLE</span>
            </button>
          </div>

          {/* Secondary Row: "HEMEN AL" + "KARŞILAŞTIR" */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/checkout" onClick={() => addItem(product, undefined, quantity)}>
              <button className="w-full h-11 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs transition-colors">
                HEMEN AL
              </button>
            </Link>

            <button
              onClick={() => addToCompare(product)}
              className={`w-full h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                inCompare
                  ? "border-[#1877f2] text-[#1877f2] bg-blue-50/50"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Scale className="h-4 w-4" />
              <span>KARŞILAŞTIR</span>
            </button>
          </div>

          {/* 4 Value Props Row */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-600 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-4 w-4 text-slate-500" />
              <span>Ücretsiz Kargo</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-slate-500" />
              <span>2 Yıl Garanti</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Wrench className="h-4 w-4 text-slate-500" />
              <span>Teknik Servis</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Lock className="h-4 w-4 text-slate-500" />
              <span>Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content Sections (GENEL BAKIŞ, TEKNİK ÖZELLİKLER, YORUMLAR) */}
      <div className="space-y-8 pt-8 border-t border-slate-100">
        <div className="flex items-center space-x-8 border-b border-slate-200 text-sm font-bold text-slate-700">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 relative transition-colors ${
              activeTab === "overview"
                ? "text-[#1877f2]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>GENEL BAKIŞ</span>
            {activeTab === "overview" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1877f2] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-4 relative transition-colors ${
              activeTab === "specs"
                ? "text-[#1877f2]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>TEKNİK ÖZELLİKLER</span>
            {activeTab === "specs" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1877f2] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 relative transition-colors ${
              activeTab === "reviews"
                ? "text-[#1877f2]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>YORUMLAR (24)</span>
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1877f2] rounded-t-full" />
            )}
          </button>
        </div>

        {/* GENEL BAKIŞ (Editorial Bento Grid matching Stitch Image 2) */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 1: AMS Dark Banner (8 cols) */}
              <div className="lg:col-span-8 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 relative overflow-hidden flex flex-col justify-end min-h-[300px]">
                <div className="relative z-10 max-w-lg space-y-2">
                  <h3 className="text-2xl font-black text-white">Çok Renkli Baskıda Devrim</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Yeni nesil Otomatik Materyal Sistemi (AMS) ile 16 farklı renge kadar pürüzsüz ve atıksız baskı deneyimi yaşayın. RFID teknolojisi ile filamentlerinizi otomatik tanır ve ayarları kendi yapar.
                  </p>
                </div>
              </div>

              {/* Card 2: Ultra Yüksek Hız (Solid Blue Box, 4 cols) */}
              <div className="lg:col-span-4 rounded-3xl bg-[#1877f2] text-white p-8 sm:p-10 flex flex-col justify-between">
                <div className="space-y-3">
                  <Zap className="h-6 w-6 text-amber-300" />
                  <h4 className="text-xl font-black">Ultra Yüksek Hız</h4>
                  <p className="text-xs text-white/90 leading-relaxed">
                    CoreXY mekaniği ve karbon fiber X ekseni sayesinde kaliteyi bozmadan 500mm/s hızlara ulaşın. Titreşim kompanzasyonu ile kusursuz yüzeyler.
                  </p>
                </div>
                <div className="text-4xl font-black tracking-tight pt-6">
                  500 <span className="text-lg font-medium text-white/80">mm/s</span>
                </div>
              </div>

              {/* Card 3: Yapay Zeka Destekli Kalibrasyon (4 cols) */}
              <div className="lg:col-span-4 rounded-3xl bg-white p-8 border border-slate-100 space-y-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#1877f2] w-fit">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Yapay Zeka Destekli Kalibrasyon</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Çift Mikro Lidar sensörü ilk katmanı milimetrik inceler. Spagetti dedektörü hata anında baskıyı durdurarak malzeme israfını önler.
                </p>
              </div>

              {/* Card 4: Tam Kapalı Endüstriyel Tasarım (8 cols) */}
              <div className="lg:col-span-8 rounded-3xl bg-white p-8 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-3 max-w-md">
                  <h4 className="text-lg font-bold text-slate-900">Tam Kapalı Endüstriyel Tasarım</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aktif karbon filtreleme sistemi ile ABS, ASA ve PC gibi mühendislik filamentlerini kokusuz ve güvenli bir şekilde basın. Gelişmiş soğutma sistemi stabil sıcaklık sağlar.
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-700 font-semibold pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#10b981]">✔</span> 60°C Oda Isıtması
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#10b981]">✔</span> HEPA Filtre
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#10b981]">✔</span> 300°C Hotend
                    </div>
                  </div>
                </div>
                <div className="w-48 h-40 flex items-center justify-center shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80"
                    alt="Chamber"
                    className="max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEKNİK ÖZELLİKLER TABLOSU */}
        {activeTab === "specs" && (
          <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-2xs">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Teknik Özellikler</h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { label: "Baskı Hacmi (G x D x Y)", val: "256 × 256 × 256 mm" },
                { label: "Maksimum Baskı Hızı", val: "500 mm/s" },
                { label: "Maksimum Hızlanma", val: "20.000 mm/s²" },
                { label: "Hotend Maksimum Sıcaklığı", val: "300 °C" },
                { label: "Tabla Maksimum Sıcaklığı", val: "110 °C (220V) / 120 °C (110V)" },
                { label: "Desteklenen Filamentler", val: "PLA, PETG, TPU, ABS, ASA, PVA, PET, PA, PC, Carbon/Glass Fiber takviyeli polimerler" },
                { label: "Sensörler & Kalibrasyon", val: "Otomatik Yatak Seviyeleme, Çift Mikro Lidar, Titreşim Kompanzasyonu, Filament Bitiş Sensörü, Spagetti Dedektörü" },
                { label: "Bağlantı", val: "Wi-Fi, Bluetooth, Bambu Bus" },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50">
                  <div className="font-bold text-slate-700">{row.label}</div>
                  <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">{row.val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YORUMLAR */}
        {activeTab === "reviews" && (
          <div className="p-6 rounded-2xl bg-white border border-slate-100 space-y-4 text-xs">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black text-slate-900">4.9</div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-slate-400 mt-0.5">24 müşteri değerlendirmesi</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Önerilen Ürünler & Aksesuarlar (Grid matching Stitch Image 2) */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Önerilen Ürünler & Aksesuarlar</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedAccessories.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col justify-between space-y-3"
            >
              <div className="aspect-square bg-[#fafafa] rounded-xl p-3 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full object-contain"
                />
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">{item.brand}</div>
                <div className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">
                  {item.name}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="text-xs font-extrabold text-slate-900">
                  {formatPrice(item.price)}
                </div>
                <button
                  onClick={() => {
                    addItem({
                      id: item.id,
                      name: item.name,
                      sku: item.id,
                      slug: "aksesuar",
                      brand: { id: "bambu", name: item.brand, slug: "bambu", isOfficialDistributor: true },
                      category: { id: "cat-acc", name: "Aksesuar", slug: "aksesuar" },
                      price: { currency: "TRY", rawPrice: item.price, discountedPrice: item.price, hasDiscount: false, discountRatePercentage: 0, vatIncluded: true, vatRate: 20 },
                      stock: { inStock: true, quantity: 50, estimatedDelivery: "Bugün Kargoda" },
                      images: [{ url: item.image, alt: item.name, isPrimary: true }],
                      shortDescription: "",
                      fullDescription: "",
                      keyFeatures: [],
                      specifications: [],
                      rating: 5,
                      reviewCount: 1,
                      warrantyMonths: 12,
                    } as any);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700"
                  aria-label="Sepete Ekle"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
