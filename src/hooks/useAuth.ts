import { useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/client';
import { ENDPOINTS } from '../constants/endpoints';
import type { User, AuthTokens } from '../types';

export function useAuth() {
  const queryClient = useQueryClient();
  const {
    user,
    isAuthenticated,
    isLoading: storeLoading,
    setUser,
    setTokens,
    setAuthenticated,
    setLoading,
    clear,
  } = useAuthStore();

  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (email: string, employeeId: string, password: string) => {
      try {
        setLoginLoading(true);
        setError(null);

        const { data } = await apiClient.post<{
          user: User;
          tokens: AuthTokens;
        }>(ENDPOINTS.LOGIN, { email, employeeId, password });

        // Store tokens securely
        await SecureStore.setItemAsync('access_token', data.tokens.accessToken);
        await SecureStore.setItemAsync('refresh_token', data.tokens.refreshToken);
        await SecureStore.setItemAsync('user', JSON.stringify(data.user));

        // Update store
        setUser(data.user);
        setTokens(data.tokens);
        setAuthenticated(true);

        // Navigate to main app
        router.replace('/(tabs)');
      } catch (e: any) {
        const message =
          e.response?.data?.message || 'Login failed. Please try again.';
        setError(message);
        throw new Error(message);
      } finally {
        setLoginLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      // Try to call logout endpoint
      await apiClient.post(ENDPOINTS.LOGOUT).catch(() => {});
    } finally {
      // Always clear local state
      await clear();
      queryClient.clear();
      router.replace('/(auth)');
    }
  }, [queryClient]);

  return {
    user,
    isAuthenticated,
    isLoading: storeLoading || loginLoading,
    error,
    login,
    logout,
  };
}
