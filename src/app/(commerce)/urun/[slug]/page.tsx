"use client";

import * as React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductVariantOption } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/stores/useCartStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { ProductCard } from "@/components/commerce/ProductCard";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
  Scale,
  Heart,
  ShoppingCart,
  Zap,
  Box,
  MessageSquare,
  FileText,
  HelpCircle,
  Package,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">Ürün Bulunamadı</h1>
        <p className="text-xs text-slate-500">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/3d-yazicilar">
          <Button size="sm">Tüm 3D Yazıcılara Dön</Button>
        </Link>
      </div>
    );
  }

  const { addItem } = useCartStore();
  const { addToCompare, isInCompare } = useCompareStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariantOption | undefined>(
    product.variantOptions?.[0]
  );
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState<"specs" | "box" | "software" | "faq">("specs");
  const [isAdded, setIsAdded] = React.useState(false);

  const inCompare = isInCompare(product.id);
  const favorite = isFavorite(product.id);

  const currentPrice =
    product.price.discountedPrice + (selectedVariant?.priceDiff || 0);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const images = product.images.length > 0 ? product.images : [
    { url: "https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=900&q=80", alt: product.name, isPrimary: true }
  ];

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-6 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: product.category.name, href: `/${product.category.slug}` },
          { name: product.brand.name, href: `/${product.brand.slug}` },
          { name: product.name },
        ]}
      />

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
            <img
              src={images[selectedImageIndex]?.url || images[0].url}
              alt={images[selectedImageIndex]?.alt || product.name}
              className="h-full w-full object-cover object-center"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge variant="distributor">{product.badge}</Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-50 transition-all ${
                    selectedImageIndex === idx
                      ? "border-primary shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Commerce Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Brand & Distributor Trust Tag */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <Link
                href={`/${product.brand.slug}`}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                {product.brand.name}
              </Link>
              {product.brand.isOfficialDistributor && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  MetaTechTR Resmi Distribütör Garantili
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* SKU & Rating */}
            <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
              <span>SKU: <strong className="text-slate-700">{product.sku}</strong></span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} Değerlendirme)</span>
              </div>
            </div>
          </div>

          {/* Price Block */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 space-y-1">
            {product.price.hasDiscount && product.price.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                {formatPrice(product.price.originalPrice)}
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {formatPrice(currentPrice)}
              </span>
              <span className="text-xs text-slate-500 font-medium">KDV Dahil</span>
              {product.price.hasDiscount && (
                <Badge variant="campaign" className="text-xs">
                  %{product.price.discountRatePercentage} İndirim
                </Badge>
              )}
            </div>
            <p className="text-xs text-emerald-700 font-semibold pt-1">
              Kredi kartına {formatPrice(currentPrice / 12)} x 12 Taksit İmkanı
            </p>
          </div>

          {/* Variant Selector (e.g. Standart vs Combo) */}
          {product.variantOptions && product.variantOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Paket / Varyant Seçeneği:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variantOptions.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left text-xs font-bold transition-all ${
                      selectedVariant?.id === variant.id
                        ? "border-primary bg-primary/5 text-primary shadow-xs"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span>{variant.name}</span>
                    {variant.priceDiff !== 0 && (
                      <span className="text-[11px] font-normal text-slate-500">
                        {variant.priceDiff > 0 ? `+${formatPrice(variant.priceDiff)}` : formatPrice(variant.priceDiff)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Features Bullet List */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Öne Çıkan Özellikler:
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-600">
              {product.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stock & Delivery Guarantee */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200/80">
            <Truck className="h-4 w-4 text-emerald-600" />
            <span>Stokta Var — Hafta içi 16:00&apos;a kadar AYNI GÜN kargo!</span>
          </div>

          {/* Action Row: Quantity + Add to Cart + Compare + Favorite */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-slate-300 rounded-lg h-11">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 text-slate-600 hover:bg-slate-100 h-full rounded-l-lg transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 text-slate-600 hover:bg-slate-100 h-full rounded-r-lg transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className={`flex-1 font-bold text-base gap-2 transition-all ${
                  isAdded
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-primary hover:bg-primary-dark text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Sepete Eklendi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Sepete Ekle</span>
                  </>
                )}
              </Button>

              {/* Compare & Favorite buttons */}
              <button
                onClick={() => addToCompare(product)}
                className={`p-3 rounded-lg border text-xs transition-colors ${
                  inCompare
                    ? "bg-primary text-white border-primary"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
                title="Karşılaştır"
              >
                <Scale className="h-5 w-5" />
              </button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className={`p-3 rounded-lg border text-xs transition-colors ${
                  favorite
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
                title="Favorilere Ekle"
              >
                <Heart className={`h-5 w-5 ${favorite ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            {/* Direct WhatsApp Quote / Question */}
            <a
              href={`https://api.whatsapp.com/send?phone=908505325363&text=Merhaba%2C%20${encodeURIComponent(
                product.name
              )}%20(SKU%3A%20${product.sku})%20hakkında%20bilgi%20ve%20kurumsal%20fiyat%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp ile Kurumsal Fiyat & Stok Sor</span>
            </a>
          </div>
        </div>
      </div>

      {/* Product Details Tabs (Specs, Box Content, FAQ) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex border-b border-slate-200 space-x-4 overflow-x-auto text-sm font-bold text-slate-700">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "specs"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Teknik Özellikler
          </button>
          <button
            onClick={() => setActiveTab("box")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "box"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Kutu İçeriği & Garanti
          </button>
          <button
            onClick={() => setActiveTab("software")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "software"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Yazılım & Uyumluluk
          </button>
        </div>

        {/* Tab 1: Technical Specs */}
        {activeTab === "specs" && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Resmi Üretici Teknik Parametreleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <span className="font-semibold text-slate-600">{spec.name}</span>
                  <span className="font-bold text-slate-900 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Box Content */}
        {activeTab === "box" && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900">
              Kutu İçeriği
            </h3>
            <p>
              Tüm ürünlerimiz üretici fabrika mühürlü orijinal kutusunda, MetaTechTR garanti belgesi ve Türkçe kullanım kılavuzu ile sevk edilir.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>1x {product.name} Ana Gövde</li>
              <li>1x Güç Kablosu ve Aksesuar Kutusu</li>
              <li>1x Başlangıç Filament Numunesi</li>
              <li>1x Yedek Nozzle ve Montaj Alet Seti</li>
              <li>1x MetaTechTR 2 Yıl Resmi Distribütör Garanti Belgesi</li>
            </ul>
          </div>
        )}

        {/* Tab 3: Software */}
        {activeTab === "software" && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900">
              Desteklenen Dilimleme ve Kontrol Yazılımları
            </h3>
            <p>
              Bambu Studio, Bambu Handy (iOS & Android), PrusaSlicer, OrcaSlicer ve Cura yazılımları ile %100 uyumludur. Hazır MetaTechTR Türkçe dilimleme profilleri müşterilerimize ücretsiz sunulmaktadır.
            </p>
          </div>
        )}
      </div>

      {/* Related / Cross-sell Products */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900">
          Uyumlu Aksesuar ve Diğer Ürünler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
