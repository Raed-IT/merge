"use client"

import { useGlobalStore } from '@/stores/globalStore';
import { Add } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useStore } from 'zustand';

function AddMenuItem({ show }: { show: boolean }) {
    const theme = useTheme();
    const isExpandedAsideMenu = useStore(useGlobalStore, (state) => state.isExpandedAsideMenu);

    return (
        show ? <>
            <Divider sx={{ borderColor: theme.palette.gray.light, my: 2, mx: 0 }} />
           <Box  px={'10px'} sx={{margin:'auto',width:"100%"  }} display={"flex"} justifyContent={"center"} >
 
           {isExpandedAsideMenu
                ? <Button variant="text" sx={{ border: `1px dashed ${theme.palette.gray.light} `, color: 'gray.main', textTransform: "unset", display: 'flex', justifyContent: "center", alignItems: 'center', gap: 1 }} fullWidth   >
                    <Add /><Typography>
                        Add menu
                    </Typography>
                </Button>
                : <IconButton sx={{ border: `1px dashed ${theme.palette.gray.light} `, borderRadius: 1 ,}} aria-label="add">
                    <Add />
                </IconButton>
            }
           </Box>
        </> 
        : null
    )
}

export default AddMenuItem
