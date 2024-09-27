import { ComparisonOperator, FilterCondition, LogicalOperator } from '@/lib/data/axios-client';

export const convertFilterToURL = (filters: FilterCondition[]): string => {
    return JSON.stringify(
        filters.map((filter) => ({
            field: filter.field,
            operator: filter.operator, // Convert enum or complex type to string
            value: filter.value,
        }))
    );
};

export const parseFilterFromURL = (filterData: string): FilterCondition[] => {
    try {
        const filters = JSON.parse(filterData);
        return filters.map((filter: any) => ({
            field: filter.field,
            operator: filter.operator as ComparisonOperator, // Convert string back to enum or type
            value: filter.value,
            init: () => { }, // Default or empty function
            toJSON: () => { }, // Default or empty function
        }));
    } catch (error) {
        console.error("Failed to parse filter data from URL:", error);
        return [];
    }
};

export const determineFilterLogic = (filters: FilterCondition[]): LogicalOperator => {
    const columnFilterMap: { [key: string]: number } = {};
    filters.forEach(filter => {
        if (filter.field) {
            columnFilterMap[filter.field] = (columnFilterMap[filter.field] || 0) + 1;
        }
    });
    const hasMultipleFiltersOnAnyColumn = Object.values(columnFilterMap).some(count => count > 1);
    return hasMultipleFiltersOnAnyColumn ? 'OR' as LogicalOperator : 'AND' as LogicalOperator;
};