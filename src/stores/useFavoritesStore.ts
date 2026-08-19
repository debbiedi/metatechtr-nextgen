import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // Product IDs
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: ["prod-bambu-x1c", "prod-uzy-pla-black"],

      toggleFavorite: (productId: string) => {
        const { favorites } = get();
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter((id) => id !== productId) });
        } else {
          set({ favorites: [...favorites, productId] });
        }
      },

      isFavorite: (productId: string) => {
        return get().favorites.includes(productId);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "metatechtr-favorites-storage",
    }
  )
);
