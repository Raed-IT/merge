import { useState, useRef, useEffect } from 'react';
import {
    Button, Grow, Paper, Popper, Grid, Typography, Stack, Box, Divider
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { FilterCondition } from '@/lib/data/axios-client';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import FilterFildes from './filterfildes';
import { ColumnType } from '../../structure-table';

interface FilterHeaderTableProps {
    onApplyFilters: (filters: FilterCondition[]) => void;
    columns: ColumnType[];
}

const FilterHeaderTableComponent: React.FC<FilterHeaderTableProps> = ({ onApplyFilters, columns }) => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<FilterCondition[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [canAddFilter, setCanAddFilter] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const popperRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // Initialize filters from URL on component mount
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filterData = queryParams.get('filterData');
        if (filterData) {
            try {
                const filtersFromURL = JSON.parse(filterData) as FilterCondition[];
                setFilters(filtersFromURL);
            } catch (e) {
                console.error('Error parsing filter data from URL', e);
            }
        }
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const validateFilters = (filters: FilterCondition[]) => {
        return filters.every(filter => filter.field && filter.operator && filter.value || '');
    };
    const applyFilters = () => {
        if (validateFilters(filters)) {
            if (onApplyFilters) {
                onApplyFilters(filters);
                const queryParams = new URLSearchParams();
                if (filters.length > 0) {
                    queryParams.set('filterData', JSON.stringify(filters.map(filter => ({
                        field: filter.field,
                        operator: filter.operator,
                        value: filter.value
                    }))));
                }
                router.push(`?${queryParams.toString()}`);
            }
            handleClose(); 
        } else {
            setError('Please fill all filter fields correctly.');
            enqueueSnackbar('Please fill all filter fields correctly.', { variant: 'error' });
        }
    };


    const applyFiltersval = () => {
        if (onApplyFilters) {
            onApplyFilters(filters);
        }
    };

    const addFilter = () => {
        if (canAddFilter) {
            setFilters([...filters, { field: '', operator: undefined, value: '', init: () => { }, toJSON: () => { } }]);
            setError(null); // Clear any previous error message
        } else {
            setError('Please complete the current filter before adding a new one.');
            enqueueSnackbar('Please complete the current filter before adding a new one.', { variant: 'error' });
        }
    };

    const clearFilters = () => {
        setFilters([]);
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete('filterData');
        router.push(`?${queryParams.toString()}`);
    };

    const removeFilter = (index: number) => {
        const updatedFilters = filters.filter((_, i) => i !== index);
        setFilters(updatedFilters);
        router.push(`?${updatedFilters.toString()}`);
    };


    const handleClickOutside = (event: MouseEvent) => {
        if (
            popperRef.current &&
            !popperRef.current.contains(event.target as Node) &&
            !anchorRef.current?.contains(event.target as Node)
        ) {
            const elementsToIgnore = ['.MuiSelect-root', '.MuiSelect-menu', '.MuiMenuItem-root', 'input'];
            const clickedInsideIgnoredElement = elementsToIgnore.some(selector =>
                (event.target as Element).closest(selector)
            );

            if (!clickedInsideIgnoredElement) {
                applyFilters();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filters, open]);

    // Update canAddFilter state whenever filters change
    useEffect(() => {
        const canAdd = filters.length === 0 || filters.every(filter => filter.field && filter.operator && filter.value);
        setCanAddFilter(canAdd);
    }, [filters]);

    return (
        <Stack direction="row" spacing={2}>
            <Box>
                <Button
                    sx={{ color: '#1f2020', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                    ref={anchorRef}
                    onClick={handleToggle}
                    aria-controls={open ? 'filters-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                >
                    <TuneIcon sx={{ color: '#717171', m: 1 }} />
                    <Typography variant="h6" sx={{ fontSize: '14px', color: '#717171' }}>Filters</Typography>
                    {filters.length > 0 && (
                        <Box sx={{
                            width: 20, height: 20, borderRadius: '50%', backgroundColor: 'red', display: 'flex', justifyContent: 'center',
                            alignItems: 'center', color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 1
                        }}>
                            {filters.length}
                        </Box>
                    )}
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    transition
                    disablePortal
                    ref={popperRef}
                    sx={{
                        zIndex: 1300,
                        width: '590px',
                        position: 'fixed', // Ensure Popper stays in place when scrolling
                        top: anchorRef.current ? anchorRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
                        left: anchorRef.current ? anchorRef.current.getBoundingClientRect().left + window.scrollX : 0
                    }}
                >
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
                            <Paper sx={{ p: 2, backgroundColor: '#ffffff' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} sx={{ textAlign: 'left' }}>
                                            <Typography variant="h6" sx={{ fontSize: '16px' }}>Filters</Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                            <Button
                                                sx={{ fontSize: '14px', color: '#f44336', textTransform: 'none' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    clearFilters();
                                                }}
                                                disabled={!validateFilters(filters)}
                                            >
                                                Clear filters
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1, borderColor: '#E0E0E0' }} />
                                    {error && (
                                        <Typography sx={{ color: 'error.main', paddingLeft: 2, paddingTop: 1 }} variant="body2">
                                            {error}
                                        </Typography>
                                    )}
                                    <Typography sx={{ paddingTop: 1, textAlign: 'left', mt: 0.5, mb: 1 }} variant="body2" color="textSecondary">
                                        All filters
                                    </Typography>
                                    <FilterFildes filters={filters} setFilters={setFilters} columns={columns} applyFiltersval={applyFiltersval} removeFilter={removeFilter} />
                                    <Grid>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Button
                                                sx={{ textTransform: 'none' }}
                                                variant="outlined"
                                                fullWidth
                                                onClick={addFilter}
                                                disabled={!canAddFilter}>
                                                Add filter
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Box>
        </Stack>
    );
};

export default FilterHeaderTableComponent;
