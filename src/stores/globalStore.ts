import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GlobalStoreType {
    openedMenus: string[],
    isExpandedAsideMenu: boolean;
    triggerExpandedAsideMenu: (status?: boolean) => void;
    setOpenedMenus: (menuId: string) => void;
    deleteMenuId: (menuId: string) => void;
    checkMenuIfOpen: (menuId: string) => boolean;
    ready: boolean;
    setReady: (status: boolean) => void;
}

export const useGlobalStore = create<GlobalStoreType>()(
    persist(
        (set, get) => ({
            openedMenus: [],
            isExpandedAsideMenu: false,
            ready: false,
            checkMenuIfOpen: (menuId: string) => {
                return get().openedMenus.includes(menuId);
            },
            triggerExpandedAsideMenu: (status?: boolean) => {
                set((state) => ({ isExpandedAsideMenu: status ?? !state.isExpandedAsideMenu }));
            },
            setOpenedMenus: (menuId) => set((state) => {
                if (!state.openedMenus.includes(menuId)) {
                    return { openedMenus: [...state.openedMenus, menuId] };
                }
                return state;
            }),
            deleteMenuId: (menuId: string) => set((state) => {
                const index = state.openedMenus.indexOf(menuId);
                if (index > -1) {
                    const newMenus = [...state.openedMenus];
                    newMenus.splice(index, 1);
                    return { openedMenus: newMenus };
                }
                return state;
            }),
            setReady: (status) => {
                set(() => ({ ready: status }));
            },
        }),
        {
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.log("an error happened during hydration global store", error);
                    } else {
                        state?.setReady(true);
                    }
                };
            },
            name: "global-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

