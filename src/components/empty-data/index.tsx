"use client"

import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import NoDataImage from '@/media/images/no-data.svg'

type emptyDataProps = {
    label: string,
    onRefetch: () => void,
    image?: any,
}

function EmptyData({ label, onRefetch, image: Image }: emptyDataProps) {
    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={"center"}>
            <Box height={170}>
                {Image ? <Image alt="image" /> : <NoDataImage />}
            </Box>
            <Typography variant='h5' my={2}>{label}</Typography>
            <Button variant='outlined' fullWidth onClick={() => onRefetch()}>refetch</Button>
        </Box>
    )
}

export default EmptyData
