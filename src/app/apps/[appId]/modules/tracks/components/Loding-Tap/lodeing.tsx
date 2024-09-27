
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const LoadingPage = () => {
    return (
        <Grid container spacing={2} sx={{ height: '90vh', overflow: 'hidden' }}>
            <Grid item xs={3} sx={{ height: '100%', p: 2 }}>
                <Box p={2}>
                    {/* Skeleton for the sidebar (drivers list) */}
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ height: '100%', p: 2 }}><Skeleton variant="text" width={150} height={60} /></Grid>
                            <Grid item xs={6} sx={{ height: '100%', p: 2 }}><Skeleton variant="text" width={150} height={60} /></Grid>
                        </Grid>
                        <Skeleton variant="text" width={'100%'} height={60} />
                        {[...Array(8)].map((_, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={1}>
                                <Skeleton variant="circular" width={60} height={60} />
                                <Box ml={1}>
                                    <Skeleton variant="text" width={200} />
                                    <Skeleton variant="text" width={160} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={9} sx={{ height: '100%', p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2} ><Skeleton variant="text" width="100%" height={60} /></Grid>
                    <Grid item xs={8} ><Skeleton variant="text" width="100%" height={60} /></Grid>
                    <Grid item xs={2} ><Skeleton variant="text" width="100%" height={60} /></Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between">
                    <Skeleton variant="rectangular" width="100%" height={'80vh'} />
                </Box>
            </Grid>

        </Grid >
    );
};

export default LoadingPage;
