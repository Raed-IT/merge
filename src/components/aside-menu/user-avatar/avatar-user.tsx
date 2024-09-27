"use client"
import { useCurrentUserQuery } from '@/lib/data/axios-client/Query'
import { Avatar, Box, Divider, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useStore } from 'zustand';
import { useGlobalStore } from '@/stores/globalStore';
function AvatarUser() {
    const theme = useTheme();
    const isExpandedAsideMenu = useStore(useGlobalStore, (state) => state.isExpandedAsideMenu);
    const triggerExpandedAsideMenu = useStore(useGlobalStore, (state) => state.triggerExpandedAsideMenu);
    const { data: currentUserData, isPending: currentUserLoading } = useCurrentUserQuery();
    const slug = (currentUserData && currentUserData.firstName && currentUserData.lastName) ? (currentUserData.firstName.charAt(0) + currentUserData.lastName.charAt(0)) : null


    return (
        <>
            <Box>
                <Divider sx={{ borderColor: theme.palette.gray.light, my: 1, mx: 0 }} />
                <Box px={'10px'} display={'flex'} 
                // flexDirection={isExpandedAsideMenu ? 'row' : "column"}
                // justifyContent={'space-between'}
                justifyContent={'center'}
                gap={isExpandedAsideMenu ? 0 : 1} 
                alignItems={'center'}   >
                    {/* <Box></Box> */}
                    {/* <Box display={"flex"} gap={1} alignItems={'center'}>
                        <Avatar sx={{ width: "24px", height: "24px" }} >{slug}</Avatar>
                        {isExpandedAsideMenu
                            ? <Typography>{`${currentUserData?.firstName ?? 'user'} ${currentUserData?.lastName ?? 'Name'}`}</Typography>
                            : null
                        }
                    </Box> */}
                    <Box sx={{ cursor: "pointer" }} onClick={() => triggerExpandedAsideMenu()} display={'flex'} alignItems={'center'} >
                        <ExitToAppIcon sx={{ color: "gray.main", transition: 'all .2s', transform: `rotate(${isExpandedAsideMenu ? '-180deg' : '0'})`, }} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AvatarUser
