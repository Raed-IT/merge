'use client'

import { Box, useTheme, Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { AppDto } from '@/lib/data/axios-client'
import Link from 'next/link'

import { extractColors } from 'extract-colors'

const AppCard = ({ app, setImagePrimaryColor }: { app: AppDto, setImagePrimaryColor?: (color: string) => void | undefined }) => {
    const theme = useTheme()
    // TODO: change `/app1.svg` to dynamic image `app.image` url from app
    useEffect(() => {
        extractColors("/app1.svg")
            .then((colors) => {
                if (colors && setImagePrimaryColor) {
                    setImagePrimaryColor(colors[0].hex);
                }
            })
            .catch(console.error)

    }, []);

    return (
        <Link href={`${app.indexUrl?.replace('{appId}', app?.id ?? '')}`} style={{ textDecoration: "none" }}>
            <Box sx={{ textDecoration: "none", }} p={2}>
                <Box sx={{ width: "100%", display: "flex" }}>
                    <Image src="/app1.svg" alt="App Icon" width={50} height={50} style={{ float: "left" }} />
                </Box>
                <Typography variant="h6" color="initial" sx={{ fontWeight: 600 }}>
                    {app.name}
                </Typography>
                <Typography component="span" sx={{ color: theme.palette.gray.main, fontSize: "0.8rem" }}>
                    {app.description}
                </Typography>
            </Box>
        </Link >
    )
}

export default AppCard