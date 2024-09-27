import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Avatar, Box, Grid, Paper, TextField, Typography, IconButton, InputAdornment, Divider } from '@mui/material';
import { SearchOutlined, HomeOutlined as HomeOutlinedIcon, InsertPhotoOutlined as InsertPhotoOutlinedIcon, MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import Link from 'next/link';
import { ScrollableBox } from '@/components/Dynamic-Tabs/shared/Style-Tap';
import { getStatusColor } from '@/components/Dynamic-Tabs/Tab/helpers';
import { RouteStatus } from '@/lib/data/axios-client';

const DynamicCard = ({
    title,
    subtitle,
    avatarIcon,
    content,
    status,
    link,
    icon,
    borderColor,
    children,
}: {
    title: string;
    subtitle: string;
    avatarIcon: ReactNode;
    content: string;
    status?: string;
    link?: string;
    icon?: ReactNode;
    borderColor: string;
    children?: ReactNode;
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 1.3,
                mb: 1,
                borderRadius: 1.4,
                border: `1px solid #E0E0E0`,
                borderLeft: `7px solid ${borderColor}`,
                backgroundColor: '#ffffff',
            }}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={1}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={2.5} display="flex" alignItems="center">
                    <Avatar
                        sx={{
                            bgcolor: borderColor,
                            mr: 2,
                            width: '30px',
                            height: '30px',
                            fontSize: '12px',
                        }}
                    >
                        {avatarIcon}
                    </Avatar>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {subtitle}
                    </Typography>
                </Grid>
                <Grid item xs={5.5} display="flex" alignItems="center">
                    <HomeOutlinedIcon fontSize="small" />
                    <Typography variant="body1" sx={{ ml: 1, fontSize: '14px' }}>
                        {content}
                    </Typography>
                </Grid>
                {status && (
                    <Grid item xs={2}>
                        <Box
                            sx={{
                                p: 0.6,
                                bgcolor: getStatusColor(status as unknown as RouteStatus).backgroundColor,
                                color: getStatusColor(status as unknown as RouteStatus).color,
                                width: '80%',
                                borderRadius: 1,
                                textAlign: 'center', 
                            }}
                        >
                            <Typography variant="body1" sx={{ ml: 1, fontSize: 'small' }}>
                                {status}
                            </Typography>
                        </Box>
                    </Grid>
                )}
                <Grid item xs={0.5} display="flex" justifyContent="flex-end">
                    {link && (
                        <Link href={link}>
                            <IconButton sx={{ mr: 1 }}>
                                <InsertPhotoOutlinedIcon />
                            </IconButton>
                        </Link>
                    )}
                    {children}
                </Grid>
                <Grid item xs={0.5} display="flex" justifyContent="flex-end">
                    {icon && (
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    )}

                </Grid>
            </Grid>
        </Paper >
    );
};
export default DynamicCard;