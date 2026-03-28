import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthTokens } from "@/types";
import { authConfig } from "@/config";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Actions
  setUser: (user: User, tokens: AuthTokens) => void;
  updateUser: (partial: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user, tokens) => {
        // Store refresh token in httpOnly cookie via API; keep access token in memory
        set({
          user,
          accessToken: tokens.accessToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      updateUser: (partial) => {
        set((state) =>
          state.user ? { user: { ...state.user, ...partial } } : {}
        );
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
        // Clear persisted storage
        if (typeof window !== "undefined") {
          localStorage.removeItem(authConfig.accessTokenKey);
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "ecp-auth",
      // Never persist the access token — security best practice
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
