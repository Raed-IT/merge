import { AppDto } from '@/lib/data/axios-client'
import { Box, Paper, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function AppMenuCard({ app, image: ImageCard, href, label }: { app?: AppDto, image?: any, href?: string, label?: string }) {
    if (app) {
        if (href || ImageCard || href || label) {
            throw new Error("plea provide app or anther options  ");
        }
    } else {
        if (!href || !ImageCard || !label) {
            throw new Error("plea provide app or anther options  ");
        }
    }
    const theme = useTheme();
    return (
        <Link href={href ?? `/apps/${app!.id}`} style={{ textDecoration: "none" }}>
            <Box width={"100%"} height={112} p={1} display="flex" flexDirection="column" sx={{ cursor: "pointer", transition: 'all .5s', borderRadius: 1, "&:hover": { bgcolor: '#eceff1' } }}>
                <Box sx={{ bgcolor: 'background.default', width: "100%", height: '70%', display: "flex", border: theme.palette.border, borderRadius: 2 }} justifyContent={'center'} alignItems={'center'}>
                    {ImageCard
                        ? ImageCard
                        : <Image src="/app1.svg" alt="App Icon" width={50} height={50} style={{ float: "left" }} />}
                </Box>
                <Typography sx={{
                    width: "100%",
                    textAlign: "center",
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    color: 'text.primary'
                }} variant='body2' mt={1} fontSize={13} >{label ?? app!.name}  </Typography>
            </Box>
        </Link>
    )
}

export default AppMenuCard
