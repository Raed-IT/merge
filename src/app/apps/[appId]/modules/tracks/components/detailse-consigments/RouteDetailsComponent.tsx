import React, { useState, useRef, useEffect } from 'react';
import {
    Avatar, Box, Grid, Paper, TextField, Typography, IconButton, InputAdornment, Divider
} from '@mui/material';
import {
    SearchOutlined,
    HomeOutlined as HomeOutlinedIcon,
    InsertPhotoOutlined as InsertPhotoOutlinedIcon,
    MoreHoriz as MoreHorizIcon
} from '@mui/icons-material';
import { generateRandomColor } from '@/utils/randoms';
import { RouteDto, RouteStatus } from '@/lib/data/axios-client';
import { ScrollableBox } from '../Loding-Tap/Style-Tap';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import Link from 'next/link';
import { useRoutesGET2Query } from '@/lib/data/axios-client/Query';
import { useSearchParams } from 'next/navigation';
import { height } from '@mui/system';
import { getStatusColor } from '../../../../../../../components/Dynamic-Tabs/Tab/helpers';

const RouteDetailsComponent = ({ heightScrol }: { heightScrol: number }) => {
    const searchParams = useSearchParams();
    const selectedRouteId = searchParams?.get('selectedItemId') || '';

    const { data, isLoading, isError, refetch } = useRoutesGET2Query({
        id: selectedRouteId,
    }, {
        refetchOnWindowFocus: true,
    });
    const selectedRoute = data;
    const [searchTerm, setSearchTerm] = useState<string>('');
    const consignmentsRef = useRef<HTMLDivElement>(null);

    const getInitials = (text: string | null | undefined): string => {
        if (!text) return '';
        return text.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    const filteredConsignments = selectedRoute?.consignments?.filter(consignment =>
        consignment?.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    useEffect(() => {
        if (consignmentsRef.current) {
            consignmentsRef.current.scrollTop = consignmentsRef.current.scrollHeight;
        }
    }, [filteredConsignments]);

    return (<>
        <Grid container spacing={1}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ mt: 2, p: '8px' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Paper elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Consignment / Stops
                            </Typography>
                            <Box sx={{ ml: 2, p: 1, textAlign: 'center', bgcolor: '#d4edda', color: 'text.primary', width: '50%', height: '35px', borderRadius: 1 }}>
                                <Typography variant="body1" sx={{ ml: 1, fontSize: '16px' }}>
                                    {selectedRoute?.id}
                                </Typography>
                            </Box>
                        </Paper>

                        <Box display="flex" alignItems="center" sx={{ flexShrink: 0 }}>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlined />
                                        </InputAdornment>
                                    ),
                                    sx: { bgcolor: 'background.paper', borderRadius: 1, backgroundColor: '#ffffff' }
                                }}
                                sx={{ width: '320px', mr: 2 }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <ScrollableBox sx={{ height: `${heightScrol}vh` }}>
                <Grid item xs={12} sx={{ pl: 1, pr: 2 }}>
                    {!selectedRoute?.consignments?.length ? (
                        <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                            No Stops available.
                        </Typography>
                    ) : (
                        <>
                            {selectedRoute.returnToStart ? (
                                <Paper elevation={0} key={selectedRoute?.warehouse?.id}
                                    sx={{ p: 1.3, mb: 1, borderRadius: 1.4, border: '1px solid #E0E0E0', borderLeft: '7px solid #00897B', backgroundColor: '#ffffff' }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={1}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                #{selectedRoute.warehouse?.code}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2.5} display="flex" alignItems="center">
                                            <Avatar sx={{ bgcolor: '#00897B', mr: 2, width: '30px', height: '30px', fontSize: '12px' }}>
                                                <WarehouseOutlinedIcon />
                                            </Avatar>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {selectedRoute.warehouse?.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5.5} display="flex" alignItems="center">
                                            <HomeOutlinedIcon fontSize="small" />
                                            <Typography variant="body1" sx={{ ml: 1, fontSize: '14px' }}>
                                                {selectedRoute.warehouse?.address}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Box sx={{ p: 0.6, textAlign: 'center', bgcolor: '#d4edda', color: 'text.primary', width: '80%', height: '35px', borderRadius: 1 }}>
                                                <Typography variant="body1" sx={{ ml: 1, fontSize: '16px' }}>
                                                    {selectedRoute?.warehouse?.type}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1} display="flex" justifyContent="flex-end">
                                            <IconButton sx={{ mr: 1 }}>
                                                <InsertPhotoOutlinedIcon />
                                            </IconButton>
                                            <IconButton>
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ) : (
                                selectedRoute.consignments && selectedRoute.consignments.length > 0 && (
                                    <Paper elevation={0} key={selectedRoute.consignments[selectedRoute.consignments.length - 1]?.id}
                                        sx={{ p: 1.3, mb: 1, borderRadius: 1.4, border: '1px solid #E0E0E0', borderLeft: '7px solid #00897B', backgroundColor: '#ffffff' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={1}>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                    #{selectedRoute.consignments[selectedRoute.consignments.length - 1]?.status}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2.5} display="flex" alignItems="center">
                                                <Avatar sx={{ bgcolor: '#00897B', mr: 2, width: '30px', height: '30px', fontSize: '12px' }}>
                                                    <WarehouseOutlinedIcon />
                                                </Avatar>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                    {selectedRoute.consignments[selectedRoute.consignments.length - 1]?.customerName}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5.5} display="flex" alignItems="center">
                                                <HomeOutlinedIcon fontSize="small" />
                                                <Typography variant="body1" sx={{ ml: 1, fontSize: '14px' }}>
                                                    {selectedRoute.consignments[selectedRoute.consignments.length - 1]?.address}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Box
                                                    sx={{
                                                        p: 0.6,
                                                        bgcolor: getStatusColor(selectedRoute.consignments[selectedRoute.consignments.length - 1]?.status as unknown as RouteStatus).backgroundColor,
                                                        color: getStatusColor(selectedRoute.consignments[selectedRoute.consignments.length - 1]?.status as unknown as RouteStatus).color,
                                                        width: '80%',
                                                        borderRadius: 1,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="body1" sx={{ ml: 1, fontSize: 'small' }}>
                                                        {selectedRoute.consignments[selectedRoute.consignments.length - 1]?.status}
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={1} display="flex" justifyContent="flex-end">

                                                {selectedRoute.consignments?.map(consignment => {
                                                    const assetsLength = consignment?.assets?.length;

                                                    return assetsLength && assetsLength > 0 ? (
                                                        <Link key={consignment.id} href={`d48d0d9b-f1d0-470d-17ce-08dca17c401a/show/${consignment.id}`}>
                                                            <IconButton sx={{ mr: 1 }}>
                                                                <InsertPhotoOutlinedIcon />
                                                            </IconButton>
                                                        </Link>
                                                    ) : null;
                                                })}
                                                <IconButton>
                                                    <MoreHorizIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            )}
                        </>
                    )}
                </Grid>
                <Divider />
                <Grid item xs={12} sx={{ pl: 1, pr: 2, }}>

                    {filteredConsignments.length === 0 ? (
                        <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                            No consignments available.
                        </Typography>
                    ) : (
                        filteredConsignments.map((consignment, index) => {
                            const color = generateRandomColor();
                            return (
                                <Paper elevation={0} key={consignment.id} sx={{ p: 1.3, mb: 1, borderRadius: 1.4, elevation: 0, border: '1px solid #E0E0E0', borderLeft: '7px solid #3F51B5', backgroundColor: '#ffffff' }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={1}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                #{index + 1}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2.5} display="flex" alignItems="center">
                                            <Avatar sx={{ bgcolor: '#3F51B5', mr: 2, width: '30px', height: '30px', fontSize: '12px' }}>
                                                {getInitials(consignment.customerName)}
                                            </Avatar>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {consignment.customerName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5.5} display="flex" alignItems="center">
                                            <HomeOutlinedIcon fontSize="small" />
                                            <Typography variant="body1" sx={{ ml: 1, fontSize: '14px' }}>
                                                {consignment.address}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Box
                                                sx={{
                                                    p: 0.6,
                                                    bgcolor: getStatusColor(consignment.status as unknown as RouteStatus).backgroundColor,
                                                    color: getStatusColor(consignment.status as unknown as RouteStatus).color,
                                                    width: '80%',
                                                    borderRadius: 1,
                                                    textAlign: 'center', // Center align text
                                                }}
                                            >
                                                <Typography variant="body1" sx={{ ml: 1, fontSize: 'small', textAlign: 'center', }}>
                                                    {consignment.status}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={1} display="flex" justifyContent="flex-end">
                                            {consignment.assets && consignment.assets.length > 0 && (
                                                <Link href={`d48d0d9b-f1d0-470d-17ce-08dca17c401a/show/${consignment.id}`}>
                                                    <IconButton sx={{ mr: 1 }} >
                                                        <InsertPhotoOutlinedIcon />
                                                    </IconButton>
                                                </Link>
                                            )}

                                            <IconButton >
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            );
                        })
                    )}

                </Grid>
            </ScrollableBox >
        </Grid >
    </>
    );

};
export default RouteDetailsComponent;
