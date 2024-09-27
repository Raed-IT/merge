"use client";
import { useAppsGETQuery } from "@/lib/data/axios-client/Query";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
 import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useStore } from "zustand";
import { useGlobalStore } from "@/stores/globalStore";
import LoadingMenuItem from "./menu-item/loading-menu-item";
import { MenuType, MenuDto } from "@/lib/data/axios-client";
import { AppMenuItems } from "./menu-items";

const AppMenu = () => {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const appId = params && "appId" in params ? (params.appId as string) : null;
  const {
    data: appData,
    isLoading: appLoading,
    error: appError,
  } = useAppsGETQuery({ id: `${appId}` }, { enabled: !!appId });
  const isExpandedAsideMenu = useStore(
    useGlobalStore,
    (state) => state.isExpandedAsideMenu
  );

  useEffect(() => {
    if (appError) {
      enqueueSnackbar(appError as string, { variant: "error" });
    }
  }, [appError]);

  return (
    <>
      <Box
        width={"100%"}
        display={!isExpandedAsideMenu ? "flex" : "block"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {appLoading ? (
          <LoadingMenuItem length={10} />
        ) : appData && appData.rootMenu ? (
          <>
            <AppMenuItems menu={appData!.rootMenu as MenuDto} root={true} />
          </>
        ) : null}
      </Box>
    </>
  );
};

export default AppMenu;
