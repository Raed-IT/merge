import React, { useState, useRef, useEffect } from 'react';
import {
    Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Stack, Radio, RadioGroup, FormControlLabel,
    Typography
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ColumnType } from '../../structure-table';

type SortHeaderTableComponentProps = {
    columns: ColumnType[],
    onSortChange: (field: string) => void
}

const SortHeaderTableComponent = ({ columns, onSortChange }: SortHeaderTableComponentProps) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedValue, setSelectedValue] = useState('none');

    const sortableColumns = columns.filter((col) => !!col?.column?.sortable);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
            return;
        }
        setOpen(false);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, value: string) => {
        setSelectedValue(value);
        setOpen(false);
        if (onSortChange) {
            onSortChange(value);
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        setOpen(false);
        if (onSortChange) {
            onSortChange(event.target.value);
        }
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);

    // Don't render the Sort button if there are no sortable columns
    if (sortableColumns.length === 0) {
        return null; // Hide the Sort button if no sortable columns exist
    }

    return (
        <Stack direction="row" spacing={2}>
            <div>
                <Button
                    sx={{ color: '#1f2020', textTransform: 'none' }}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <SwapVertIcon sx={{ color: '#717171' }} />
                    <Typography variant="h6" sx={{ fontSize: '14px', color: '#717171' }}>
                        Sort
                    </Typography>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    sx={{ zIndex: 1300 }} // Adjust zIndex here
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={(event) => {
                                            if (event.key === 'Tab' || event.key === 'Escape') {
                                                setOpen(false);
                                            }
                                        }}
                                    >
                                        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
                                            {sortableColumns.map((col) => (
                                                <MenuItem
                                                    key={col.column.field}
                                                    onClick={(event) => handleMenuItemClick(event, col.column.headerName!)}
                                                >
                                                    <FormControlLabel
                                                        value={col.column.headerName}
                                                        control={<Radio />}
                                                        label={col.column.headerName}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </RadioGroup>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
};

export default SortHeaderTableComponent;
