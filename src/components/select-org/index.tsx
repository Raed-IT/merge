"use client"

import { useUserOrganizationsQuery } from '@/lib/data/axios-client/Query'
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import OrgCard from './orgCard'
import { generateRandomNumber } from '@/utils/randoms'
import OrgsLoadingList from './orgsLoadingList'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import Divider from '@mui/material/Divider';



const SelectOrg = () => {

    const { data: orgs, isLoading: isLoadingOrgs } = useUserOrganizationsQuery()
    const theme = useTheme();

    return (
        <Container maxWidth={'lg'}>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Grid container spacing={1} >
                    <Grid item xs={0.5}>
                        <PaymentOutlinedIcon />
                    </Grid>
                    <Grid item xs={11.5}>
                        <Typography component="span" sx={{ color: theme.palette.gray.main, fontSize: "16px", mt: 1 }}>
                            Select Organization
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
            </Box>
            <Grid container spacing={1} sx={{ alignItems: "center", justifyContent: "center", py: 12 }} columns={12}>
                {
                    isLoadingOrgs
                        ? <OrgsLoadingList length={generateRandomNumber(4, 8)} />
                        : orgs?.map(org =>
                            <Grid item xs={12} sm={10} md={5} lg={3} key={org.id} sx={{ m: "auto" }}>
                                <OrgCard org={org} />
                            </Grid>
                        )
                }
                <Grid item xs={12} sm={10} md={5} lg={3} sx={{ m: "auto" }}>
                    <Box sx={{
                        border: `1px solid #00796b`, borderRadius: theme.shape.borderRadius - 4,
                        p: 2, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', width: '276px'
                    }}>
                        <AddOutlinedIcon sx={{ width: '36px', height: '36px', color: '#3b3b3b' }} />
                        <Typography component="span" sx={{ color: theme.palette.gray.main, fontSize: "0.8rem", mt: 1 }}>
                            Add a new organization
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SelectOrg
