import { Box, Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'

function AppsLoadingList({ length }: { length: number }) {

    const [lengthList, setLengthList] = useState<number>(0);
    useEffect(() => {
        setLengthList(length)
    }, [length])
    return Array.from({ length: lengthList }, (value, key) => key).map((va) =>
        <Grid key={va} item xs={32} sm={12} md={10} lg={7}  >
            <Box height={"100%"} width={"100%"}>
                <Skeleton variant="rounded" width={210} style={{ height: '100%', width: "100%", minHeight: "171px" }} />
            </Box>
        </Grid>
    )
}

export default AppsLoadingList
