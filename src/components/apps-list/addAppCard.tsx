import { Add } from '@mui/icons-material'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

function AddAppCard() {
    const theme = useTheme()
  return ( 
    <Grid item pt={5} xs={32} sm={12} md={10} lg={7} sx={{
        border: `#E5E7EB 1px dashed`,
         cursor:"pointer",
        borderRadius: `${theme.shape.borderRadius}px`,
        py: 2,
        transition: 'all 0.2s',
        textAlign: "left",
        display: "initial",
        "&:hover": { border: `${theme.palette.gray.extraDark} 1px dashed `, boxShadow: "0px 10px 18px -19px rgba(0,0,0,0.65);" }
      }}  >
        <Box display={'flex'} gap={1} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'100%'} >
          <Add fontSize="large" sx={{ color: "gray.main" }} />
          <Typography color={'gray.main'}>Add New App</Typography>
        </Box>
      </Grid>
  )
}

export default AddAppCard
