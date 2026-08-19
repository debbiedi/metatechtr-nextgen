import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface CompareState {
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

const MAX_COMPARE_ITEMS = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],

      addToCompare: (product: Product) => {
        const { compareList } = get();
        if (compareList.some((p) => p.id === product.id)) {
          return true;
        }
        if (compareList.length >= MAX_COMPARE_ITEMS) {
          return false;
        }
        set({ compareList: [...compareList, product] });
        return true;
      },

      removeFromCompare: (productId: string) => {
        set((state) => ({
          compareList: state.compareList.filter((p) => p.id !== productId),
        }));
      },

      clearCompare: () => set({ compareList: [] }),

      isInCompare: (productId: string) => {
        return get().compareList.some((p) => p.id === productId);
      },
    }),
    {
      name: "metatechtr-compare-storage",
    }
  )
);
