import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  updateUserFields: (fields) => set((state) => ({
    user: state.user ? { ...state.user, ...fields } : null
  }))
}));