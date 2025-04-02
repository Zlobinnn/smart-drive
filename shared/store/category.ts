import { create } from 'zustand';

interface State {
    activeId: number;
    setActiveId: (activeId: number) => void;

    sortType: string;
    setSortType: (sortType: string) => void;
}

export const useCategoryStore = create<State>()((set) => ({
    activeId: 1,
    setActiveId: (activeId: number) => set({ activeId }),

    sortType: 'По категориям',
    setSortType: (sortType: string) => set({ sortType }),
}));
