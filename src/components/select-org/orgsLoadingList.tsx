import { Box, Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'

function OrgsLoadingList({ length }: { length: number }) {
    const [lengthList, setLengthList] = useState<number>(0);
    useEffect(() => {
        setLengthList(length)
    }, [length])
    return Array.from({ length: lengthList }, (value, key) => key).map((va) =>
        <Grid item xs={12} sm={10} md={5} lg={3} key={va} sx={{ m: "auto" }}>
            <Skeleton component={'div'} sx={{ mx: 2, opacity: 0.8 }} animation="wave" height={"172.22px"} />
            
        </Grid>
    )
}

export default OrgsLoadingList
