import { Box, ClickAwayListener, Grid, Grow, Paper, Popper, Switch, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { ColumnType } from '../../structure-table';

type ColumnsMenuComponentProps = {
    openColumns: ColumnType[],
    open: boolean,
    anchorRef: React.MutableRefObject<HTMLButtonElement | null>,
    handleClose: (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => void,
    handleToggleColumns: (column: ColumnType) => void,
    columns: ColumnType[],
}

function ColumnsMenuComponent({
    openColumns, open, anchorRef, handleClose, handleToggleColumns
}: ColumnsMenuComponentProps) {
    const [searchedColumn, setSearchedColumn] = useState<ColumnType[]>(openColumns);
    const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSearchedColumn(openColumns);
    }, [openColumns]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredColumns = openColumns.filter(column =>
            column.column.field.toLowerCase().includes(searchValue)
        );
        setSearchedColumn(filteredColumns);

        // Automatically select and scroll to the first match
        if (filteredColumns.length > 0) {
            setSelectedColumn(filteredColumns[0]);
        }
    };

    useEffect(() => {
        if (selectedColumn) {
            const element = document.getElementById(`column-${selectedColumn.column.field}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [selectedColumn]);

    // Handle the reset action
    const handleReset = () => {
        const updatedColumns = searchedColumn.map(column => ({
            ...column,
            isVisible: true,
        }));
        setSearchedColumn(updatedColumns);
        updatedColumns.forEach(column => handleToggleColumns({ column: column.column, isVisible: true }));
    };

    return (
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{ zIndex: 1300, width: '340px' }}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                >
                    <Paper sx={{ p: 2, backgroundColor: '#ffffff' }}>
                        <ClickAwayListener onClickAway={(event) => handleClose(event as unknown as MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>)}>
                            <Box>
                                <Grid container spacing={2} sx={{ width: '100%', p: 0 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" sx={{ fontSize: '16px', textAlign: 'left' }}>Columns</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Link href="#" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); handleReset(); }}>
                                            <Typography variant="h6" sx={{ fontSize: '14px', color: '#000000', textAlign: 'right', mr: -1.5 }}>
                                                Reset to default
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Search"
                                        fullWidth
                                        inputRef={searchRef}
                                        onChange={handleSearch}
                                    />
                                </Box>

                                <Box>
                                    {searchedColumn.map((column: ColumnType, index: number) => (
                                        <Box
                                            key={index}
                                            id={`column-${column.column.field}`}
                                            sx={{
                                                width: '100%', p: 0.5, borderBottom: index === searchedColumn.length - 1 ? 'none' : '1px solid #E0E0E0'
                                            }}
                                        >
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={9}>
                                                    <Typography>{column.column.headerName}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Switch
                                                        sx={{ alignItems: 'end' }}
                                                        checked={column.isVisible}
                                                        onChange={() => handleToggleColumns({ column: column.column, isVisible: !column.isVisible })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}

export default ColumnsMenuComponent;
