"use client"
import AsideMenu from "@/components/aside-menu";
import { useGlobalStore } from "@/stores/globalStore";

import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useStore } from "zustand";


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const isExpandedAsideMenu = useStore(useGlobalStore, (state) => state.isExpandedAsideMenu);
    const theme = useTheme();

    return (
        <Grid container columns={7}  >
            <Grid component="aside" position={"fixed"} item xs={isExpandedAsideMenu ? 1 : 0.28} width={"100%"} sx={{ transition: "all 0.15s !important" }}  >
                <AsideMenu />
            </Grid>
            <Grid component="aside" item xs={isExpandedAsideMenu ? 1 : 0.28} sx={{ transition: "all 0.15s !important" }}  >
                {/* fort the 2nd column  to be fixed  on the left side of the screen  when the aside menu is collapsed  */}
            </Grid>
            <Grid item xs={isExpandedAsideMenu ? 6 : 6.72} p={2} sx={{ transition: "all 0.15s !important" }} >
                {children}
            </Grid>
        </Grid>
    );
}

export default Layout;