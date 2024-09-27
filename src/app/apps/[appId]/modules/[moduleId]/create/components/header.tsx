import { ModuleDto } from '@/lib/data/axios-client'
import { generateRandomNumber } from '@/utils/randoms'
import { ArrowBackTwoTone } from '@mui/icons-material'
import { IconButton, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/navigation'
import React from 'react'

function CreateHeaderComponent({ moduleLoading, moduleData }: { moduleData?: ModuleDto, moduleLoading: boolean }) {
    const router =useRouter();
    return (
        <Box>
            {moduleLoading ?
                <Skeleton variant='text' width={generateRandomNumber(100, 200)} height={40} />
                : moduleData
                    ? <Box display={'flex'} gap={2} justifyContent={'center'} alignItems={"center"} height={"100%"} >
                        <IconButton onClick={() => router.back()} >
                            <ArrowBackTwoTone sx={{ color: 'gray.main' }} />
                        </IconButton>
                        <Typography fontSize={20}> Add New {moduleData?.name}</Typography>
                    </Box> : null}

        </Box>
    )
}

export default CreateHeaderComponent
