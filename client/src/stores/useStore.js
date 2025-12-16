import { create } from 'zustand';

export const useStore = create((set) => ({
    modalOpen: false,
    activeItem: null,
    openModal: (item) => set({ modalOpen: true, activeItem: item }),
    closeModal: () => set({ modalOpen: false, activeItem: null }),
}));
