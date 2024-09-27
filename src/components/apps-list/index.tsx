"use client"

import { useAppsAllQuery } from "@/lib/data/axios-client/Query"
import { Box, Container, Grid, List, Typography, useTheme } from "@mui/material"
import AppCard from "../app-card"
import AppsLoadingList from "./appsLoadingList"
import { generateRandomNumber } from "@/utils/randoms"
import { useState } from "react"
import EmptyData from "../empty-data"
import { Add } from "@mui/icons-material"
import AddAppCard from "./addAppCard"

const AppsList = () => {
  const { data: apps, isPending: loadingApps, refetch: refetchApps } = useAppsAllQuery()
  const theme = useTheme()
  const [appsImagesPrimaryColor, setAppsImagesPrimaryColor] = useState<{ appId: string, colorCode: string }[]>([]);


  const updateAppColor = (appId: string, colorCode: string) => {
    setAppsImagesPrimaryColor([...appsImagesPrimaryColor, { appId: appId, colorCode: colorCode }]);
  };
  const getBorderColorFromAppId = (appId: string | undefined) => {
    // get border color from primary app image color 
    if (appId) {
      const index = appsImagesPrimaryColor.findIndex(a => a.appId == appId);
      if (index >= 0) {
        return appsImagesPrimaryColor[index].colorCode;
      }
    }
    return theme.palette.text.primary;
  }
  return (

    <Container maxWidth="xl" sx={{ p: { md: 12 }, pt: 10 }}>
      <Grid container columns={32} gap={2} sx={{ justifyContent: "center" }}>
        {
          loadingApps
            ? <AppsLoadingList length={generateRandomNumber(4, 8)} />
            : apps && apps?.length > 0
              ?
              <>
                {
                  apps.map((app) => {
                    return <Grid item pt={5} key={app.id} xs={32} sm={12} md={10} lg={7} sx={{
                      border: theme.palette.border,
                      borderRadius: `${theme.shape.borderRadius}px`,
                      py: 2,
                      transition: 'all 0.2s',
                      textAlign: "left",
                      display: "initial",
                      "&:hover": { border: `${getBorderColorFromAppId(app.id)} 1px solid`, boxShadow: "0px 10px 18px -19px rgba(0,0,0,0.65);" }
                    }}>
                      <AppCard setImagePrimaryColor={(appImagePrimaryColor) => {
                        updateAppColor(app.id!, appImagePrimaryColor);
                      }} app={app} />
                    </Grid>
                  })
                }
                <AddAppCard />
              </>
              : <EmptyData label="No Apps found" onRefetch={() => {
                refetchApps();
              }} />

        }
      </Grid>
    </Container >
  )
}

export default AppsList
