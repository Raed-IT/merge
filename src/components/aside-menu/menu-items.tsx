import { Badge, Box, Collapse } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { MenuDto, MenuType } from "@/lib/data/axios-client";
import { useAppsGETQuery, useMenusGETQuery } from "@/lib/data/axios-client/Query";
import { useGlobalStore } from "@/stores/globalStore";
 import LoadingMenuItem from "./menu-item/loading-menu-item";
import MenuBody from "./menu-item/menu-body";

const staticUserMenu: MenuDto = {
    id: 'static-users',
    label: 'Users',
    type: MenuType.Link,
    url: '/apps/93cfd07d-3528-4abd-c469-08dca0025cbd/users',
    init: function() {},
    toJSON: function() { return JSON.stringify(this); }
};

/**
  * @param {boolean} [props.root=false] - Indicates if the menu item is a root menu.
  */
const AppMenuItems = ({ menu, root = false }: { menu: MenuDto, root?: boolean }) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const params = useParams();
    const appId = (params && "appId" in params) ? params.appId as string : null;

    // global store
    const setOpenedMenus = useGlobalStore((state) => state.setOpenedMenus);
    const deleteMenuId = useGlobalStore((state) => state.deleteMenuId);
    const checkMenuIfOpen = useGlobalStore((state) => state.checkMenuIfOpen);
    const [openSubMenu, setOpenSubMenu] = useState(root || checkMenuIfOpen(menu.id as string));

    useEffect(() => {
        if (openSubMenu) {
            setOpenedMenus(menu.id as string);
        } else {
            deleteMenuId(menu.id as string);
        }
    }, [openSubMenu]);

    const isFetchMenuData = useRef(false);
    const {
        isFetched,
        data: menuData,
        isLoading: menuLoading,
        error: menuError
    } = useMenusGETQuery({ id: menu.id ?? '' }, {
        enabled: openSubMenu && !!appId && !!menu?.id && !isFetchMenuData.current,
        refetchOnMount: false
    });

    useEffect(() => {
        isFetchMenuData.current = isFetched;
    }, [isFetched]);

    useEffect(() => {
        if (menuError) {
            enqueueSnackbar(menuError as string, { variant: 'error' });
        }
    }, [menuError]);

    const onMenuItemClick = (event: React.MouseEvent) => {
        if (menu.type === MenuType.Link) {
            if (appId && menu.url) {
                if (menu.target === "_blank") {
                    window.open(menu.url.replace('{appId}', appId), "_blank");
                } else {
                    router.push(`${menu.url.replace('{appId}', appId)}`);
                }
            }
        } else {
            setOpenSubMenu(open => !open);
        }
    };

    return (
        <>
            {
                !root ?
                    <MenuBody menu={menu} onMenuItemClick={onMenuItemClick} openSubMenu={openSubMenu} onPressAddIcon={(menu) => {
                        
                    }} />
                    : null
            }
            {menu?.type === MenuType.Folder
                ? (
                    <Collapse in={openSubMenu} sx={{ p: "0px 8px" }}>
                        {
                            menuLoading
                                ? <LoadingMenuItem length={root ? 8 : 2} />
                                : menuData
                                    ? menuData?.childMenus?.map(m => {
                                        return <AppMenuItems key={m.id} menu={m} />;
                                    })
                                    : null
                        }
                    </Collapse>
                )
                : null
                
            }
                {/* <AppMenuItems menu={staticUserMenu} /> */}

        </>
    );
};

 

export { AppMenuItems }; 
 