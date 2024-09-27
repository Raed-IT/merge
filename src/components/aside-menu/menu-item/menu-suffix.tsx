import { MenuDto, MenuType } from '@/lib/data/axios-client';
import { Badge, Box, IconButton } from '@mui/material';
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChevronRight, } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { useStore } from 'zustand';
import { useGlobalStore } from '@/stores/globalStore';


/**
  * @param onPressAddIcon - An optional callback function that is called when the add icon is pressed, with the `MenuDto` object as a parameter ,if pass this function the add icon it show in menu
 */
type menuSuffixProps = {
    menu: MenuDto,
    openSubMenu: boolean,
    onPressAddIcon?: (menu: MenuDto) => void,
    isActive: boolean | undefined,
}
function MenuSuffix({ menu, openSubMenu, onPressAddIcon, isActive }: menuSuffixProps) {
    const isExpandedAsideMenu = useStore(useGlobalStore, (state) => state.isExpandedAsideMenu);

    return (
        <>
            <Box display={'flex'} px={0.1} height={"100%"} gap="8px" alignItems="center" justifyContent={"center"}  >

                {menu?.additionalInformationParsed?.displayBadge
                    ?
                    <Box mr={1}>
                        <Badge color="secondary"
                            badgeContent={menu?.additionalInformationParsed?.sqlStatementIdForBadge ?? 0}
                            showZero={false} />
                    </Box>
                    : null}
                {
                    !!onPressAddIcon && isExpandedAsideMenu && menu.type === MenuType.Link ?
                        <IconButton sx={{ height: '20px', width: "20px", "&:hover": { backgroundColor: isActive ? "" : "#dadfe1", borderRadius: "10%" }, borderRadius: "10%" }} onClick={(event) => {
                            event.stopPropagation();
                            if (!!onPressAddIcon) {
                                onPressAddIcon(menu);
                            }
                        }}>
                            <AddIcon sx={{ color: isActive ? 'background.default' : "" }} />
                        </IconButton>
                        : null}

                {menu.type === MenuType.Folder
                    ? openSubMenu
                        ? <ExpandMoreIcon sx={{ color: isActive ? 'background.default' : "" }} />
                        : <ChevronRight sx={{ color: isActive ? 'background.default' : "" }} />
                    : null
                }
            </Box>
        </>
    );
}
export default MenuSuffix;
