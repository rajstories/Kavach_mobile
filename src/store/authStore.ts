import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import type { User, AuthTokens } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tokens: AuthTokens | null;

  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  hydrate: () => Promise<void>;
  clear: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  tokens: null,

  setUser: (user) => set({ user }),
  setTokens: (tokens) => set({ tokens }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoading: (value) => set({ isLoading: value }),

  hydrate: async () => {
    try {
      set({ isLoading: true });
      const token = await SecureStore.getItemAsync('access_token');
      const userJson = await SecureStore.getItemAsync('user');

      if (token && userJson) {
        const user = JSON.parse(userJson) as User;
        set({
          user,
          isAuthenticated: true,
          tokens: { accessToken: token, refreshToken: '', expiresAt: '' },
        });
      }
    } catch (e) {
      console.error('[Auth] hydrate error:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  clear: async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user');
    } catch {
      // ignore
    }
    set({
      user: null,
      isAuthenticated: false,
      tokens: null,
    });
  },
}));
