import { create } from "zustand";

interface Car {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface Order {
    car: Car;
    totalPrice: number;
}

interface SelectedRange {
    start: Date | null;
    end: Date | null;
    days: number;
}

interface OrderStore {
    order: Order | null;
    selectedRange: SelectedRange;
    setOrder: (order: Order) => void;
    setSelectedRange: (range: SelectedRange) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
    order: null,
    selectedRange: { start: null, end: null, days: 0 },
    setOrder: (order) => set({ order }),
    setSelectedRange: (range) => {

        const days = range.start && range.end ? 
            Math.ceil((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24)) : 
            0;

        set({ selectedRange: { ...range, days } });
    },
}));