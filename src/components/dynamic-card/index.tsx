import React, { useEffect, useState } from 'react';
import { Box, CardContent, Grid, Checkbox, Tooltip, IconButton, Card, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardDataTableProps } from './sherd/type';
import RenderCustomCard from '../data-table/custom-cells/custom-card';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

const CardDataTable = ({ rows, fields, statusField, onChangeSelection }: CardDataTableProps) => {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const handleSelect = (id: number) => {
        const newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        setSelectedIds(newSelectedIds);
    };

    useEffect(() => {
        onChangeSelection(selectedIds);
    }, [selectedIds, onChangeSelection]);
    function filterFields(row: any) {
        const fields = [
            { fieldName: row.id || row.documentId || row.code || row.dueDate || row.date ? 'id' : null },
            { fieldName: row.documentType ? 'documentType' : null },
            { fieldName: row.documentNumber ? 'documentNumber' : null },
            { fieldName: row.customerName ? 'customerName' : null || row.warehouseId ? 'warehouseId' : null },
            { fieldName: row.address ? 'address' : null || row.employeeId ? 'employeeId' : null || row.name ? 'name' : null},
            { fieldName: row.vehicleId ? 'vehicleId' : null },
            { fieldName: row.status ? 'status' : null }
        ];
        return fields.filter(field => field.fieldName !== null);
    }


    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={2} alignItems="center">
                {rows.map((row, index) => (
                    <Grid item xs={3} key={index}>
                        <Card
                            variant="outlined"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                margin: 1,
                                borderRadius: 2,
                                border: 1,
                                borderColor: '#d3d3d3',
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={6}>
                                        <Checkbox
                                            color="primary"
                                            inputProps={{ 'aria-label': 'select item' }}
                                            checked={selectedIds.has(row.id)}
                                            onChange={() => handleSelect(row.id)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} container justifyContent="flex-end">
                                        <Tooltip title="More">
                                            <IconButton>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                <hr style={{ margin: '10px 0' }} />
                                <RenderCustomCard row={row} fields={filterFields(row).filter((field): field is { fieldName: string } => field.fieldName !== null)} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}            </Grid>
        </Box>
    );
};

export default CardDataTable;
