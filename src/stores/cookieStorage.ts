import { StateStorage } from "zustand/middleware"
import Cookies from 'js-cookie';
interface CustomStorage extends StateStorage {
    clearCookie: () => void;
}

export const cookieStorage: CustomStorage = {
    getItem: (name: string): string | null => {
        return Cookies.get(name) || null
    },
    setItem: (name: string, value: string): void => {
        Cookies.set(name, value, { path: "/", expires: 1 })
    },
    removeItem: (name: string): void => {
        Cookies.remove(name, { path: "/" });
    },
    clearCookie:  (): void => {
         document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }
};