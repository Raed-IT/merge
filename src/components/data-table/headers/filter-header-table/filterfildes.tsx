import { ComparisonOperator, FilterCondition } from '@/lib/data/axios-client';
import { convertStringToEnum } from '@/utils/helper';
import {
    Button, Grid, TextField, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Autocomplete
} from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ColumnType } from '../../structure-table';
import DeleteIcon from '@mui/icons-material/Delete';
import { useVehiclesGETQuery } from '@/lib/data/axios-client/Query';
import { useGlobalData } from '@/utils/api-global-hook/useGetGlobal';

type filterfildesProps = {
    filters: FilterCondition[];
    setFilters: Dispatch<SetStateAction<FilterCondition[]>>;
    applyFiltersval: () => void;
    removeFilter: (index: number) => void;
    columns: ColumnType[];
}

export default function FilterFildes({ filters, setFilters, columns, applyFiltersval, removeFilter }: filterfildesProps) {

    const [dataSourceName, setDataSourceName] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filterData = queryParams.get('filterData');

        if (filterData) {
            try {
                const parsedFilters: FilterCondition[] = JSON.parse(filterData);
                setFilters(parsedFilters.map((filter: any) => ({
                    field: filter.field,
                    operator: convertStringToEnum(ComparisonOperator, filter.operator),
                    value: filter.value ?? '',
                    init: filter.init || (() => { }),
                    toJSON: filter.toJSON || (() => { })
                })));

                const filterWithId = parsedFilters.find(f => f.field && f.field.endsWith('Id'));
                if (filterWithId && typeof filterWithId.value === 'string') {
                    setInputValue(filterWithId.value);  
                }

            } catch (error) {
                console.error('Failed to parse filter data from URL:', error);
            }
        }
    }, [setFilters]);
    const handleFieldChange = (index: number) => (event: SelectChangeEvent<string>) => {
        const newFilters = [...filters];
        const field = event.target.value as string;

        newFilters[index] = {
            ...newFilters[index],
            field: field,
            init: newFilters[index].init,
            toJSON: newFilters[index].toJSON
        };

        setFilters(newFilters);

        if (field.endsWith('Id')) {
            const updatedDataSourceName = field.replace(/Id$/, 's');
            setDataSourceName(updatedDataSourceName);  
        } else {
            setDataSourceName('');
        }
    };

    const handleOperatorChange = (index: number) => (event: SelectChangeEvent<string>) => {
        const operator = convertStringToEnum(ComparisonOperator, event.target.value as string);
        const newFilters = [...filters];
        newFilters[index] = {
            ...newFilters[index],
            operator: operator,
            init: newFilters[index].init,
            toJSON: newFilters[index].toJSON
        };
        setFilters(newFilters);
    };

    const handleValueChange = (index: number, newValue: any) => {
        const newFilters = [...filters];
        newFilters[index] = {
            ...newFilters[index],
            value: newValue ?? '',
            init: newFilters[index].init,
            toJSON: newFilters[index].toJSON
        };
        setFilters(newFilters);
        setInputValue(newValue);
    };

    const { data: GlobalData, isLoading: GlobalLoading } = useGlobalData({
        dataSourceName: 'api/' + dataSourceName,
        enabled: !!dataSourceName,
    });


    useEffect(() => {
        if (inputValue && GlobalData?.data) {
            const matchingItem = GlobalData?.data?.find((item: { id: string }) => item.id === inputValue);
            if (matchingItem) {
                setSelectedItem(matchingItem);
            }
        }
    }, [inputValue, GlobalData]);

    return (
        <>
            <Grid container spacing={1} sx={{ p: 1 }}>
                {filters.map((filter, index) => (
                    <Grid container spacing={1} key={index} sx={{ mt: 1 }}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id={`field-label-${index}`}>Field</InputLabel>
                                <Select
                                    labelId={`field-label-${index}`}
                                    value={filter.field || ''}
                                    onChange={handleFieldChange(index)}
                                    label="Field"
                                >
                                    {
                                        columns.filter((col) => !!col?.column?.filterable).map((column: ColumnType, columnIndex: number) => (
                                            <MenuItem value={column.column.field} key={columnIndex}>
                                                {column.column.headerName}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id={`operator-label-${index}`}>Operator</InputLabel>
                                <Select
                                    labelId={`operator-label-${index}`}
                                    value={filter.operator || ''}
                                    onChange={handleOperatorChange(index)}
                                    label="Operator"
                                >
                                    {Object.values(ComparisonOperator)!.map((operator, operatorIndex: number) => (
                                        <MenuItem value={operator} key={operatorIndex}>
                                            {operator}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            {filter.field === 'date' ? (
                                <TextField
                                    id={`value-${index}`}
                                    label="Value"
                                    type="date"
                                    value={filter.value ?? ''}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleValueChange(index, event.target.value)}
                                    onBlur={applyFiltersval}
                                    sx={{ width: '100%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            ) : filter.field && filter.field.endsWith('Id') ? (
                                <Autocomplete
                                    id={`autocomplete-value-${index}`}
                                    options={GlobalData?.data || []}
                                    getOptionLabel={(option: any) => option.name || ''}
                                    value={selectedItem}
                                    inputValue={inputValue} 
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    onChange={(event, newValue) => {
                                        handleValueChange(index, newValue ? newValue.id : '');
                                        setSelectedItem(newValue || null);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Value"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    onBlur={applyFiltersval}
                                />

                            ) : (
                                <TextField
                                    id={`value-${index}`}
                                    label="Value"
                                    type="text"
                                    value={filter.value ?? ''}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleValueChange(index, event.target.value)}
                                    onBlur={applyFiltersval}
                                    sx={{ width: '100%' }}
                                />
                            )}
                        </Grid>

                        <Grid item xs={1}>
                            <Button
                                sx={{ textTransform: 'none', color: 'error.main', height: '100%', p: 0 }}
                                variant="text"
                                fullWidth
                                onClick={() => {
                                    const newFilters = filters.filter((_, i) => i !== index);
                                    setFilters(newFilters);
                                    removeFilter(index);
                                }}
                            >
                                <DeleteIcon sx={{ height: '100%' }} />
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
