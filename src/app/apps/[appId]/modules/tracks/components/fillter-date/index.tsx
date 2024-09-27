"use client";

import React, { useState, useCallback, useEffect } from 'react';
import {
    Grid, TextField, Button
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { convertFilterToURL, parseFilterFromURL } from './filterUtils';
import { FilterCondition, ComparisonOperator } from '@/lib/data/axios-client';

const FilterDateRoutes: React.FC = () => {
    const pathName = usePathname();
    const searchParams = useSearchParams() ?? new URLSearchParams();
    const router = useRouter();

    // Parse initial filter data from URL
    const initialFilterData = parseFilterFromURL(searchParams.get('filterData') || '[]');

    // Find any existing date filter in the initial filter data
    const initialDateFilter = initialFilterData.find(filter => filter.field === 'date');

    // Get current date in YYYY-MM-DD format
    const getCurrentDate = (): string => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Set selected date to initial date filter value or current date if not present
    const [selectedDate, setSelectedDate] = useState<string | null>(initialDateFilter?.value || getCurrentDate());

    const [filterData, setFilterData] = useState<FilterCondition[]>(initialFilterData);

    useEffect(() => {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.set('filterData', convertFilterToURL(filterData));
        router.push(`${pathName}?${updatedSearchParams.toString()}`);
    }, [filterData, pathName, router]);

    const handleFilterChange = useCallback((filters: FilterCondition[]) => {
        setFilterData(filters);
    }, []);

    const normalizeDate = (dateString: string): string => {
        const dateParts = dateString.split("-");
        if (dateParts[0].length > 4) {
            dateParts[0] = dateParts[0].slice(0, 4);
        }
        return dateParts.join("-");
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let date = e.target.value;
        date = normalizeDate(date);
        setSelectedDate(date);
        const newFilter: FilterCondition = {
            field: 'date',
            operator: ComparisonOperator.Equals,
            value: date,
            init: () => { },
            toJSON: () => { }
        };
        handleFilterChange([newFilter]);
    };

    const adjustDate = (days: number) => {
        if (!selectedDate) return;
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        const formattedDate = newDate.toISOString().split('T')[0];
        setSelectedDate(formattedDate);

        const newFilter: FilterCondition = {
            field: 'date',
            operator: ComparisonOperator.Equals,
            value: formattedDate,
            init: () => { },
            toJSON: () => { }
        };
        handleFilterChange([newFilter]);
    };

    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={1} md={1}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => adjustDate(-1)}
                    sx={{ width: '40px', height: '40px', ml: 1, color: '#5F6368', border: '1px solid #EEEEEE' }}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: '18px' }} />
                </Button>
            </Grid>
            <Grid item xs={10} md={10}>
                <TextField
                    size="small"
                    type="date"
                    fullWidth
                    value={selectedDate || ''}
                    onChange={handleDateChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: '1px solid #EEEEEE',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#EEEEEE',
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={1} md={1}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => adjustDate(1)}
                    sx={{ width: '40px', height: '40px', color: '#5F6368', border: '1px solid #EEEEEE' }}
                >
                    <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
                </Button>
            </Grid>
        </Grid>
    );
};

export default FilterDateRoutes;
