import React from 'react';
import { Box, Typography, Avatar, Grid, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { OrgLoginRequest } from '@/lib/data/axios-client';
import { useOrgLoginMutation } from '@/lib/data/axios-client/Query';
import { enqueueSnackbar } from 'notistack';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const OrgCard = ({ org }: any) => {
    const theme = useTheme();
    const router = useRouter();
    const { mutate, isPending } = useOrgLoginMutation();
    const vars = new OrgLoginRequest({ organizationId: org.id });

    const selectOrg = () => {
        mutate(vars, {
            onError: (error: unknown) => {
                const response = (error as { response?: { data?: { message?: string } } }).response;
                enqueueSnackbar(response?.data?.message || "Error logging in", { variant: 'error' });
            },
            onSuccess: () => {
                router.push("/apps");
            }
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    };

    return (
        <Box
            sx={{
                border: '1px solid #afafaf',
                ':hover': {
                    borderColor: '#00796b', 
                },
                borderRadius: theme.shape.borderRadius - 4,
                p: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '150px',
                transition: 'border-color 300ms'  
            }}
            onClick={selectOrg}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Avatar sx={{ ml: 2, bgcolor: theme.palette.primary.main, color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                        {getInitials(org.name)}
                    </Avatar>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                        <Typography variant="subtitle1">
                            {org.name}
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    {org.localization}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <ArrowForwardIosRoundedIcon sx={{ fontSize: '16px', color: theme.palette.text.secondary, alignItems: 'center' }} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrgCard;
