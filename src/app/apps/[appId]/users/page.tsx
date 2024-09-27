"use client";

import React from 'react';
import { Box, Grid } from '@mui/material';
import UsersTable from '@/components/show-users';
 

const UsersPage = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box sx={{ padding: 1 }}>
                    <UsersTable />
                </Box>
            </Grid>
        </Grid>
    );
};

export default UsersPage;
