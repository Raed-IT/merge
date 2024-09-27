import { useState, useEffect, useCallback } from 'react';
import { FilterCondition, ModuleDto, SectionDto } from '@/lib/data/axios-client';
import { Box, Skeleton, Grid } from '@mui/material';
import SearchFieldComponent from './search-field';
import TableHeaderColumnTrigger from './table-header-column-trigger';
import FilterHeaderTableComponent from './filter-header-table';
import SwitchTableHeader from './switch-table-header';
import { ColumnType } from '../structure-table';
type Props = {
    section?: SectionDto;
    module?: ModuleDto;
    columns: ColumnType[];
    isShowTableComponent: boolean;
    handleToggleColumns: (column: ColumnType) => void;
    triggerShowTable: () => void;
    onSortChange?: (val: string) => void;
    isLoading: boolean;
    onApplyFilters?: (filters: FilterCondition[]) => void;
};

const TableHeaderComponent = ({
    handleToggleColumns,
    columns,
    isShowTableComponent,
    triggerShowTable,
    onSortChange,
    isLoading,
    onApplyFilters,
    section
}: Props) => {
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay to show skeleton only on initial load
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    const handleFilters = useCallback((filters: FilterCondition[]) => {
        if (onApplyFilters) {
            onApplyFilters(filters);
        }
    }, [onApplyFilters]);


    return (
        <Box sx={{ mb: 2 }}>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={9}>
                    {/* Uncomment and use SearchFieldComponent if needed */}
                     <SearchFieldComponent handleSearchChange={(e: any) => console.log(e)} /> 
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={4} md={4}>
                            {isPageLoading
                                ? <Skeleton animation="wave" variant='text' width='100%' height={50} />
                                : <FilterHeaderTableComponent columns={columns} onApplyFilters={handleFilters} />
                            }
                        </Grid>

                        <Grid item xs={4} md={4}>
                            {isPageLoading
                                ? <Skeleton animation="wave" variant='text' width='100%' height={50} />
                                : <TableHeaderColumnTrigger columns={columns} handleToggleColumns={handleToggleColumns} />
                            }
                        </Grid>

                        <Grid item xs={4} md={4}>
                            {isPageLoading
                                ? <Skeleton animation="wave" variant='text' width='100%' height={50} />
                                : <SwitchTableHeader isShowTableComponent={isShowTableComponent} triggerShowTable={triggerShowTable} />
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TableHeaderComponent;
