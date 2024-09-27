import { ComparisonOperator, FilterCondition, LogicalOperator } from '@/lib/data/axios-client';
export const determineFilterLogic = (filters: FilterCondition[]): LogicalOperator => {
    const columnFilterMap: { [key: string]: number } = {};
    filters.forEach(filter => {
        if (filter.field === 'date') {
            columnFilterMap['date'] = (columnFilterMap['date'] || 0) + 1;
        }
    });
    const hasMultipleFiltersOnAnyColumn = Object.values(columnFilterMap).some(count => count > 1);
    return hasMultipleFiltersOnAnyColumn ? 'OR' as LogicalOperator : 'AND' as LogicalOperator;
};

export const convertFilterToURL = (filters: FilterCondition[]): string => {
    return JSON.stringify(filters.map(filter => ({
        field: filter.field || 'date',
        operator: filter.operator || ComparisonOperator.Equals,
        value: filter.value
    })));
};

export const parseFilterFromURL = (filterData: string): FilterCondition[] => {
    try {
        const filters = JSON.parse(filterData);
        return filters.map((filter: any) => ({
            field: filter.field || 'date',
            operator: filter.operator || ComparisonOperator.Equals,
            value: filter.value,
            init: () => { },
            toJSON: () => { }
        }));
    } catch (error) {
        console.error("Failed to parse filter data from URL:", error);
        return [];
    }
};

