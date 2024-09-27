import { MenuDto, MenuType } from '@/lib/data/axios-client'
import { useGlobalStore } from '@/stores/globalStore';
import { Box, Tooltip, Zoom } from '@mui/material'
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useStore } from 'zustand';
import MenuSuffix from './menu-suffix';
import EarbudsOutlinedIcon from '@mui/icons-material/EarbudsOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PhotoAlbumSharpIcon from '@mui/icons-material/PhotoAlbumSharp';

type menuBodyProps = {
    menu: MenuDto,
    onMenuItemClick: (event: React.MouseEvent) => void,
    openSubMenu: boolean,
    onPressAddIcon?: (menu: MenuDto) => void

}


function MenuBody({ onMenuItemClick, menu, openSubMenu, onPressAddIcon }: menuBodyProps) {
    // active Link
    const params = useParams();
    const pathName = usePathname();
    const isExpandedAsideMenu = useStore(useGlobalStore, (state) => state.isExpandedAsideMenu);
    const appId = (params && "appId" in params) ? params.appId as string : null
    const moduleId = (params && "moduleId" in params) ? params.moduleId as string : null
    const router = useRouter();
    const isActive = () => {
        // if menu contain module if check from module id
        if (menu.type === MenuType.Link) {
            let active = menu?.url?.replace('{appId}', appId ?? 'not').includes(moduleId ?? 'not f');
            if (active) {
                return active;
            }
            // else custom url check this url in menu url
            else return pathName?.replace('{appId}', appId ?? 'not').includes(menu.url?.replace('{appId}', appId ?? 'not') ?? 'not f');
        }
        return false;

    }
    const handelNavigateToCreate = (menu: MenuDto) => {
        router.push(`${menu?.url?.replace('{appId}', appId ?? 'not')}/create`)


    }
    return (
        <>
            <Tooltip TransitionComponent={Zoom} title={isExpandedAsideMenu ? null : menu.label} placement="right" sx={{ bgcolor: "#" }} arrow>

                {<Box
                    onClick={onMenuItemClick}
                    borderRadius={1}
                    width={"100%"}
                    bgcolor={isActive() ? '#37474F' : ""}
                    display="flex"
                    justifyContent={isExpandedAsideMenu ? "space-between" : 'center'}
                    alignItems="center"
                    p={"6px 8px"}
                    my="4px"
                    sx={{
                        cursor: "pointer",
                        userSelect: "none",
                        borderRadius: "4px",
                        "&:hover": { bgcolor: isActive() ? '' : "#ECEFF1" }
                    }}>
                    <Box display="flex" width={"75%"} alignItems="center" justifyContent={isExpandedAsideMenu ? 'start' : 'center'} gap={isExpandedAsideMenu ? 1 : 0}  >
                        <Icon menu={menu} isActive={isActive()} />
                        {isExpandedAsideMenu
                            ? <Box display={'inline-block'} color={isActive() ? 'background.paper' : ''} textOverflow={"ellipsis"} overflow={'hidden'} whiteSpace={'nowrap'}>
                                {menu.label}

                            </Box>
                            : null
                        }
                    </Box>

                    {isExpandedAsideMenu
                        ? <Box width={"15%"} >
                            <MenuSuffix menu={menu} openSubMenu={openSubMenu} onPressAddIcon={(menu) => {
                                if (onPressAddIcon) {
                                    onPressAddIcon(menu);
                                };
                                handelNavigateToCreate(menu);
                            }} isActive={isActive()} />
                        </Box>
                        : null
                    }

                </Box>
                }
            </Tooltip>
        </>
    )
}

const Icon = ({ menu, isActive }: { menu: MenuDto, isActive: boolean | undefined }) => {
    let imgUrl = '/images/Icon/Tracks.svg';
    switch (menu.label) {
        case 'Tracks':
            imgUrl = "/images/Icon/Tracks.svg";
            break;
        case 'Routes':
            imgUrl = "/images/Icon/Routes.svg";
            break;
        case 'Consignment':
            imgUrl = "/images/Icon/Consignment.svg";
            break;
        case 'Drivers':
            imgUrl = "/images/Icon/Drives.svg";
            break;
        case 'Vehicles':
            imgUrl = "/images/Icon/Vehicles.svg";
            break;
        case 'Warehouses':
            imgUrl = "/images/Icon/Warehouses.svg";
            break;
        case 'Users':
            imgUrl = "/images/Icon/Users.svg";
            break;

    }
    return <Box>
        <Box width={22} height={22} borderRadius={"4px"}>
            <img src={imgUrl} alt="User Icon" width="25" height="25" style={{ filter: isActive ? "brightness(0) invert(1)" : '' }} />
        </Box>
    </Box>;
}
export default MenuBody
