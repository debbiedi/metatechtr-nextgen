import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductVariantOption } from "@/types";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  couponCode: string | null;
  discountPercentage: number;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, selectedVariant?: ProductVariantOption, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Computations
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
}

const FREE_SHIPPING_THRESHOLD = 1500;
const STANDARD_SHIPPING_FEE = 79.90;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Default realistic cart item for showcase demo
        {
          product: {
            id: "prod-bambu-x1c",
            sku: "MTR-BL-X1C-COMBO",
            name: "Bambu Lab X1-Carbon Combo 3D Yazıcı (AMS Dahil)",
            slug: "bambu-lab-x1-carbon-combo-3d-yazici",
            brand: {
              id: "bambu-lab",
              name: "Bambu Lab",
              slug: "bambu-lab",
              isOfficialDistributor: true,
            },
            category: {
              id: "cat-3d-printers",
              name: "3D Yazıcılar",
              slug: "3d-yazicilar",
            },
            shortDescription: "Yapay zeka destekli amiral gemisi 3D yazıcı",
            fullDescription: "",
            keyFeatures: [],
            images: [
              {
                url: "https://cdn1.bambulab.com/bambu-lab/product/x1/x1-carbon-combo.png",
                alt: "Bambu Lab X1-Carbon Combo",
                isPrimary: true,
              },
            ],
            price: {
              currency: "TRY",
              rawPrice: 58325,
              discountedPrice: 69990,
              hasDiscount: true,
              discountRatePercentage: 6,
              vatIncluded: true,
              vatRate: 20,
            },
            stock: {
              inStock: true,
              quantity: 14,
              estimatedDelivery: "Bugün Kargoda",
            },
            specifications: [],
            rating: 4.9,
            reviewCount: 48,
            warrantyMonths: 24,
          },
          quantity: 1,
          unitPrice: 69990,
        },
      ],
      isCartOpen: false,
      couponCode: null,
      discountPercentage: 0,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (product, selectedVariant, quantity = 1) => {
        const { items } = get();
        const variantId = selectedVariant?.id;
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedVariant?.id === variantId
        );

        const unitPrice =
          product.price.discountedPrice + (selectedVariant?.priceDiff || 0);

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems, isCartOpen: true });
        } else {
          set({
            items: [
              ...items,
              {
                product,
                selectedVariant,
                quantity,
                unitPrice,
              },
            ],
            isCartOpen: true,
          });
        }
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedVariant?.id === variantId
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedVariant?.id === variantId
            ) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, discountPercentage: 0 }),

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === "METATECH10" || cleanCode === "BAMBU10") {
          set({ couponCode: cleanCode, discountPercentage: 10 });
          return true;
        }
        if (cleanCode === "DISTRIBUTOR15") {
          set({ couponCode: cleanCode, discountPercentage: 15 });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ couponCode: null, discountPercentage: 0 }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const rate = get().discountPercentage;
        return (subtotal * rate) / 100;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
          return 0;
        }
        return STANDARD_SHIPPING_FEE;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: "metatechtr-cart-storage",
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discountPercentage: state.discountPercentage,
      }),
    }
  )
);
