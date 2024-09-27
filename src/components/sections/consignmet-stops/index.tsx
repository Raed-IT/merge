import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Avatar, Box, Grid, Paper, TextField, Typography, IconButton, InputAdornment, Divider } from '@mui/material';
import { SearchOutlined, HomeOutlined as HomeOutlinedIcon, InsertPhotoOutlined as InsertPhotoOutlinedIcon } from '@mui/icons-material';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ScrollableBox } from '@/components/Dynamic-Tabs/shared/Style-Tap';
import DynamicCard from './card/templat-card-section';
import { useSearchParams } from 'next/navigation';
import { useRoutesGET2Query } from '@/lib/data/axios-client/Query';
import { getInitials } from './card/helper';


const RouteDetailsSectionsComponent = ({openVariable, heightScrol ,nameSection }: {openVariable: string ,heightScrol: number , nameSection: string }) => {
    const selecteditemId = openVariable;

    const { data, isLoading, isError, refetch } = useRoutesGET2Query({
        id: selecteditemId,
    }, {
        refetchOnWindowFocus: true,
    });
    const selecteditem = data;
    const showWarehouse = selecteditem?.returnToStart
    const [searchTerm, setSearchTerm] = useState<string>('');
    const consignmentsRef = useRef<HTMLDivElement>(null);

    const filteredConsignments = selecteditem?.consignments?.filter(consignment =>
        consignment?.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    useEffect(() => {
        if (consignmentsRef.current) {
            consignmentsRef.current.scrollTop = consignmentsRef.current.scrollHeight;
        }
    }, [filteredConsignments]);

    const lastConsignment = selecteditem?.consignments && selecteditem.consignments.length > 0
        ? selecteditem.consignments[selecteditem.consignments.length - 1]
        : null;

    return (
        <>
            <Grid container spacing={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ mt: 2, p: '8px' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Paper elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                   {nameSection}
                                </Typography>
                                <Box sx={{ ml: 2, p: 1, textAlign: 'center', bgcolor: '#d4edda', color: 'text.primary', width: '50%', height: '35px', borderRadius: 1 }}>
                                    <Typography variant="body1" sx={{ ml: 1, fontSize: '16px' }}>{selecteditem?.id}</Typography>
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

                        {!selecteditem || (selecteditem.consignments && selecteditem.consignments.length === 0) ? (
                            <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>No data available.</Typography>
                        ) : (
                            <DynamicCard
                                title={showWarehouse
                                    ? `#${selecteditem?.warehouse?.code || 'N/A'}`
                                    : `#${lastConsignment?.status || 'N/A'}`}
                                subtitle={showWarehouse
                                    ? selecteditem?.warehouse?.name || 'Unknown'
                                    : lastConsignment?.customerName || 'Unknown'}
                                avatarIcon={<WarehouseOutlinedIcon />}
                                content={showWarehouse
                                    ? selecteditem?.warehouse?.address || 'No Address'
                                    : lastConsignment?.address || 'No Address'}
                                status={showWarehouse
                                    ? selecteditem?.warehouse?.type
                                    : lastConsignment?.status}
                                link={lastConsignment?.assets && lastConsignment.assets.length > 0
                                    ? `${lastConsignment.id}/show/${lastConsignment.id}`
                                    : undefined}
                                icon={<MoreHorizIcon />}
                                borderColor={'#00897B'}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sx={{ pl: 1, pr: 2 }}>
                        {filteredConsignments.length === 0 ? (
                            <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>No data available.</Typography>
                        ) : (
                            filteredConsignments.map((item, index) => (
                                <DynamicCard
                                    key={index}
                                    title={`#${item.documentId}`}
                                    subtitle={item.customerName || 'Unknown'}
                                    avatarIcon={getInitials(item.customerName) || <WarehouseOutlinedIcon />}
                                    content={item.address || 'No Address'}
                                    status={item.status}
                                    link={item.assets && item.assets.length > 0 ? `/show/${item.id}` : undefined}
                                    icon={<MoreHorizIcon />}
                                    borderColor={'#3F51B5'}
                                />
                            ))
                        )}
                    </Grid>
                </ScrollableBox>
            </Grid>
        </>
    );
}; export default RouteDetailsSectionsComponent;