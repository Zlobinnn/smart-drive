import { create } from "zustand";

interface Order {
    car: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
    };
    totalPrice: number;
}

interface OrderStore {
    order: Order | null;
    setOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
    order: null,
    setOrder: (order) => set({ order }),
}));
