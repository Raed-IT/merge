import React from 'react';
import { Typography, Chip, Grid, Avatar, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

export const RenderCustomCell = (row: any, columnKey: string) => {

    switch (columnKey) {
        case 'id':
            return <>#{row?.id?.slice(-4)} </>;
        case 'status':
            switch (row.status) {
                case 'Scheduled':
                    return <Chip label="Scheduled" sx={{ backgroundColor: '#E7E8EA', color: '#322F35' }} />;
                case 'Active':
                    return <Chip label="Active" sx={{ backgroundColor: '#D4EDDA', color: '#155724' }} />;
                case 'In Progress':
                    return <Chip label="In Progress" sx={{ backgroundColor: '#FFF3CD', color: '#856404' }} />;
                case 'Locked':
                    return <Chip label="Locked" sx={{ backgroundColor: '#F8D7DA', color: '#721C24' }} />;
                default:
                    return <Chip label={row.status} />;
            }
        case 'address':
            return <><LocationOnIcon sx={{ mb: '-5px', color: '#707070' }} /> {row?.address}</>;
        case 'vehicleId':
            return <>{row?.vehicle?.name}</>;
        case 'routeId':
            return <>{row?.routeId}</>;
        case 'dueDate':
            {
                let dueDate = new Date(row.date);
                let formattedDueDate = dueDate.getFullYear() + '-' +
                    ('0' + (dueDate.getMonth() + 1)).slice(-2) + '-' +
                    ('0' + dueDate.getDate()).slice(-2);
                return <> {formattedDueDate}</>;
            }
        case 'date':
            {
                let date = new Date(row.date);
                let formattedDate = date.getFullYear() + '-' +
                    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                    ('0' + date.getDate()).slice(-2);
                return <> {formattedDate}</>;
            }
        case 'driverId':
            return (
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={3}>
                        <Avatar sx={{ width: '24px', height: '24px' }} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography color="#000000" variant="body2">
                            {row?.driver?.employee || 'U/N'}
                        </Typography>
                    </Grid>
                </Grid>
            );
        case 'warehouseId':
            return (
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={2}>
                        <WarehouseOutlinedIcon sx={{ width: '24px', height: '24px', backgroundColor: '#00796b', borderRadius: '50%', color: '#afafaf', p: '4px' }} />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography color="#000000" variant="body2" sx={{ mb: 1 }}>
                            {row?.warehouse?.name || '-'}
                        </Typography>
                    </Grid>
                </Grid>
            );
        case 'email':
            return <>{row?.email}</>;
        case 'firstName':
            return <>{row?.firstName}</>;
        case 'lastName':
            return <>{row?.lastName}</>;
        
            
        default:
            return <Typography>{row[columnKey]}</Typography>;
    }
};