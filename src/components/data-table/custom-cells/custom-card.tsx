import { Avatar, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

function RenderCustomCard({ row, fields }: { row: any, fields: { fieldName: string, icon?: React.ElementType }[] }) {
    if (!row || !fields) {
        return <Typography color="error">No data available</Typography>;
    }

    return (
        <Grid container spacing={1}>
            {fields.map((field, index) => {
                const content = getCustomFieldComponent(row, field.fieldName);

                return content !== undefined ? (
                    <Grid item xs={12} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        {field.icon && React.createElement(field.icon, { sx: { mr: 1, color: '#707070' } })}
                        {content}
                    </Grid>
                ) : null;
            })}
        </Grid>
    );
}

function getCustomFieldComponent(row: any, fieldName: string) {
    if (!row || !row[fieldName]) {
        return null;
    }
    switch (fieldName) {
        case 'id':
        case 'documentId':
        case 'dueDate':
        case 'code':
        case 'date': {
            const dueDate = row.dueDate ? new Date(row.dueDate) : null;
            const date = row.date ? new Date(row.date) : null;

            const formattedDate = dueDate && !isNaN(dueDate.getTime())
                ? dueDate.toISOString().split('T')[0]
                : date && !isNaN(date.getTime())
                    ? date.toISOString().split('T')[0]
                    : '';
            return (
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={7} container>
                        <Typography sx={{ color: '#afafaf' }}>#{row?.id?.slice(-4) || row?.documentId || row?.code} </Typography>
                    </Grid>
                    <Grid item xs={5} container justifyContent="flex-end">
                        <Typography>{row?.documentId == null ? formattedDate : <PhotoOutlinedIcon sx={{ color: '#afafaf' }} />}</Typography>
                    </Grid>
                </Grid>
            );
        }

        case 'documentType':
            return (
                <><ContentPasteOutlinedIcon sx={{ mb: '-5px', mr: '10px', color: '#fff', backgroundColor: '#00796b', p: '3px', borderRadius: '50%' }} /> {row?.documentType} </>
            );
        case 'documentNumber':
            return (
                <><ContentPasteOutlinedIcon sx={{ mb: '-5px', mr: '10px', color: '#fff', backgroundColor: '#00796b', p: '3px', borderRadius: '50%' }} /> {row?.documentNumber}</>
            );
        case 'customerName':
        case 'employeeId':
            return (
                <><PersonIcon sx={{ mb: '-5px', mr: '10px', color: '#fff', backgroundColor: '#00796b', p: '3px', borderRadius: '50%' }} /> {row?.customerName || row?.employee?.firstName + ' ' + row?.employee?.lastName || 'U/N'}</>
            );
        case 'address' && 'status':
        case 'vehicleId' && 'status':
        case 'employeeId' && 'status':
            return (
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9} container>
                        {row?.address ? (
                            <><HomeIcon sx={{ mb: '-5px', mr: '10px', color: '#fff', backgroundColor: '#00796b', p: '3px', borderRadius: '50%' }} /> {row?.address}</>
                        ) : (<>
                            {row?.vehicle?.name || row?.name ? (
                                <><LocalShippingOutlinedIcon sx={{ mb: '-5px', mr: '10px', color: '#fff', backgroundColor: '#00796b', p: '3px', borderRadius: '50%' }} />{row?.vehicle?.name || row?.name}</>
                            ) : (
                                <><PersonIcon sx={{ mb: '-5px', mr: '10px', color: '#fff', backgroundColor: '#00796b', p: '3px', borderRadius: '50%' }} /> {row?.employee?.firstName + ' ' + row?.employee?.lastName || 'U/N'}</>
                            )
                            }</>)}
                    </Grid>
                    <Grid item xs={3} container justifyContent="flex-end">
                        <Chip
                            label={row.status}
                            sx={{
                                backgroundColor:
                                    row.status === 'Scheduled' ? '#E7E8EA' :
                                        row.status === 'Active' ? '#D4EDDA' :
                                            '#FFF3CD',
                                color:
                                    row.status === 'Scheduled' ? '#322F35' :
                                        row.status === 'Active' ? '#155724' :
                                            '#856404',
                            }}
                        />
                    </Grid>
                </Grid>
            );
        case 'warehouseId':
        case 'address':
            return (
                <> <WarehouseOutlinedIcon sx={{ mb: '-5px', mr: '10px', color: '#fff', backgroundColor: '#00796b', p: '3px', borderRadius: '50%' }} />
                    {row?.warehouse?.name || row?.address}</>
            );
        default:
            return null;
    }
} export default RenderCustomCard;
