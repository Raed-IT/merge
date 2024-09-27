import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { cookieStorage } from "./cookieStorage";

interface AuthStoreType {
    isAuthenticated: boolean
    signIn: () => void;
    signOut: () => void;

    ready: boolean;
    setReady: (status: boolean) => void;
}

export const useAuthStore = create<AuthStoreType>()(
    persist(
        (set, get) => ({
            isAuthenticated: true,
            signIn: async () => {
                set(() => ({ isAuthenticated: true }));
            },
            signOut: async () => {
                set(() => ({ isAuthenticated: false }));
            },
            ready: false,
            setReady: (status) => {
                set(() => ({ ready: status }));
            },
        }),
        {
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.log("an error happened during hydration auth store", error);
                    } else {
                        state?.setReady(true);
                    }
                };
            },
            name: "auth-store",
            storage: createJSONStorage(() => cookieStorage),
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);
