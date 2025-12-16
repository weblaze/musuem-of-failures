import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            authModalOpen: false,

            setAuthModalOpen: (isOpen) => set({ authModalOpen: isOpen }),

            login: async (email, password) => {
                try {
                    const res = await api.post('/auth/login', { email, password });
                    set({
                        user: res.data.user,
                        token: res.data.token,
                        isAuthenticated: true,
                        authModalOpen: false
                    });
                    return { success: true };
                } catch (error) {
                    return { success: false, error: error.response?.data?.message || 'Login failed' };
                }
            },

            register: async (email, username, password) => {
                try {
                    const res = await api.post('/auth/register', { email, username, password });
                    set({
                        user: res.data.user,
                        token: res.data.token,
                        isAuthenticated: true,
                        authModalOpen: false
                    });
                    return { success: true };
                } catch (error) {
                    return { success: false, error: error.response?.data?.message || 'Registration failed' };
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage', // unique name
            partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }), // persist only these
        }
    )
);
