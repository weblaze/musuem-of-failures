import { create } from 'zustand';
import api from '../lib/api';

export const useStore = create((set, get) => ({
    modalOpen: false,
    activeItem: null,
    exhibits: [],
    loading: false,
    mode: 'public', // 'public' | 'attic'

    setMode: (mode) => set({ mode }),
    openModal: (item) => set({ modalOpen: true, activeItem: item }),
    closeModal: () => set({ modalOpen: false, activeItem: null }),

    // Helper to format raw post data
    formatPost: (post) => {
        let color = '#d4af37';
        try {
            const di = JSON.parse(post.displayItem);
            color = di.color || color;
        } catch (e) { }

        return {
            id: post.id,
            title: post.title,
            description: post.content,
            author: post.author?.username || 'Anonymous',
            date: new Date(post.createdAt).getFullYear().toString(),
            color: color,
            isPublic: post.isPublic
        };
    },

    fetchExhibits: async () => {
        const { mode, formatPost } = get();
        set({ loading: true });

        try {
            // Determine endpoint based on mode
            const endpoint = mode === 'attic' ? '/posts/mine' : '/posts';
            const res = await api.get(endpoint);

            const formatted = res.data.map(formatPost);
            set({ exhibits: formatted, loading: false });
        } catch (error) {
            console.error(`Failed to load ${mode} museum:`, error);
            set({ loading: false });
        }
    },

    togglePrivacy: async (id) => {
        try {
            const res = await api.patch(`/posts/${id}/privacy`);
            // Update local state to reflect change
            set((state) => ({
                exhibits: state.exhibits.map(ex =>
                    ex.id === id ? { ...ex, isPublic: res.data.isPublic } : ex
                ),
                // If displaying detail modal, update it too
                activeItem: state.activeItem?.id === id ? { ...state.activeItem, isPublic: res.data.isPublic } : state.activeItem
            }));
        } catch (error) {
            console.error("Failed to toggle privacy", error);
        }
    },

    addExhibit: (newExhibit) => set((state) => ({ exhibits: [newExhibit, ...state.exhibits] }))
}));
