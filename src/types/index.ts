export type Currency = 'TRY' | 'USD' | 'EUR';

export interface ProductPrice {
  currency: Currency;
  rawPrice: number;              // KDV Hariç
  discountedPrice: number;       // Satış Fiyatı (İndirimli veya Normal)
  originalPrice?: number;        // Çizili Fiyat (varsa)
  hasDiscount: boolean;
  discountRatePercentage: number;
  vatIncluded: boolean;
  vatRate: number;               // 20 (%20 KDV)
  monthlyInstallmentPrice?: number; // 6 veya 12 taksit aylık tutarı
}

export interface TechnicalSpecification {
  group: 'Genel' | 'Baskı Özellikleri' | 'Ekstruder & Sıcaklık' | 'Tabla & Isıtma' | 'Filament & Malzeme' | 'Yazılım & Bağlantı';
  name: string;
  value: string;
}

export interface ProductVariantOption {
  id: string;
  name: string; // e.g. "Standart" | "Combo (AMS Dahil)" | "0.4mm Hardened" | "1kg Siyah"
  sku: string;
  priceDiff: number;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  title: string;
  comment: string;
}

export interface Product {
  id: string;
  sku: string;
  barcode?: string;
  name: string;
  slug: string;
  brand: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    isOfficialDistributor: boolean;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    parentSlug?: string;
  };
  badge?: 'RESMİ DİSTRİBÜTÖR' | 'ÇOK SATAN' | 'YENİ NESİL' | 'KAMPANYA' | 'TÜKENDİ' | 'ÖN SİPARİŞ' | 'PREMİUM SEÇİM';
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  images: {
    url: string;
    alt: string;
    isPrimary: boolean;
  }[];
  price: ProductPrice;
  stock: {
    inStock: boolean;
    quantity: number;
    lowStockThreshold?: number;
    estimatedDelivery: string;
  };
  specifications: TechnicalSpecification[];
  variantOptions?: ProductVariantOption[];
  compatibleAccessories?: string[];
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  warrantyMonths: number;
  isComboAMS?: boolean;
  buildVolume?: string;
  maxSpeed?: string;
  maxTemp?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  imageUrl: string;
  productCount: number;
  featuredBrands?: string[];
  subcategories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  isOfficialDistributor: boolean;
  productCount: number;
  originCountry: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariantOption;
  quantity: number;
  unitPrice: number;
}

export interface WarrantyRecord {
  serialNumber: string;
  productName: string;
  brand: string;
  model: string;
  purchaseDate: string;
  warrantyStatus: 'ACTIVE' | 'EXPIRED' | 'VOID';
  warrantyEndDate: string;
  distributor: 'MetaTechTR Resmi Distribütör Garantili';
  registeredOwner: string;
  serviceHistory: {
    ticketId: string;
    date: string;
    type: string;
    status: string;
    notes: string;
  }[];
}

export interface PrintQuoteParams {
  technology: 'FDM' | 'SLA' | 'SLS';
  material: string;
  color: string;
  infillPercent: number;
  layerHeightMm: number;
  quantity: number;
  file?: {
    name: string;
    sizeBytes: number;
    volumeCm3: number;
    weightGrams: number;
  };
}
