import React from 'react'
import { ColumnType } from '../../structure-table';
import { Button, Stack, Typography } from '@mui/material';
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import ColumnsMenuComponent from './column-menu';
import { MouseEvent, TouchEvent } from 'react'; // Added MouseEvent and TouchEvent

function TableHeaderColumnTrigger({ columns, handleToggleColumns }: { columns: ColumnType[], handleToggleColumns: (column: ColumnType) => void }) {
    const [open, setOpen] = React.useState(false);
    const [openColumns, setOpenColumns] = React.useState<ColumnType[]>(columns);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        setOpenColumns(columns);
    }, [columns]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent<Element> | TouchEvent<Element>) => { // Updated type
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
            return;
        }
        setOpen(false);
    };
    return (
        <Stack direction="row" spacing={2}>

            <Button
                sx={{ color: '#1f2020', textTransform: 'none' }}
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <ViewWeekOutlinedIcon  sx={{ color:'#717171' ,m:1}}/><Typography variant="h6"  sx={{ fontSize:'14px', color:'#717171' }}>Columns</Typography> 
            </Button>

            <ColumnsMenuComponent
                openColumns={openColumns}
                open={open}
                anchorRef={anchorRef}
                handleClose={handleClose}
                handleToggleColumns={handleToggleColumns}
                columns={columns} />

        </Stack>

    );
}

export default TableHeaderColumnTrigger
