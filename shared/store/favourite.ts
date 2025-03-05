import { Vehicle } from "@prisma/client";
import { create } from "zustand";
import { Api } from "../services/api-client";
import { getFavouriteDetails } from "../lib";

export interface FavouriteState {
    loading: boolean;
    error: boolean;
    favouriteCars: Vehicle[];
    fetchFavouriteCars: () => void;
    toggleFavouriteCars: (id: number) => void;
}

export const useFavouriteStore = create<FavouriteState>()((set, get) => ({
    loading: false,
    error: false,
    favouriteCars: [],

    fetchFavouriteCars: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.favouriteCars.fetchFavouriteCars();
            set({favouriteCars: data.items});
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    toggleFavouriteCars: async (id: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.favouriteCars.toggleFavouriteCars(id);
            set({favouriteCars: data.items});
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));