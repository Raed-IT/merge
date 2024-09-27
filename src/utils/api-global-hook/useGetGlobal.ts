import { useQuery } from '@tanstack/react-query';
import { getData } from './get-global-data';
import * as Types from '../../lib/data/axios-client';
import { AxiosRequestConfig } from 'axios';

type GlobalGETProps = {
    dataSourceName: string;
    enabled: boolean;
    pageNumber?: number;
    pageSize?: number;
    totalCount?: number;
    sort_SortBy?: string;
    sort_Ascending?: boolean;
    filter_Logic?: Types.LogicalOperator;
    filter_Conditions?: Types.FilterCondition[];
    filter_Groups?: Types.FilterGroup[];
    config?: AxiosRequestConfig;
};

export function useGlobalData({
    dataSourceName,
    pageNumber,
    pageSize,
    totalCount,
    sort_SortBy,
    sort_Ascending,
    filter_Logic,
    filter_Conditions,
    filter_Groups,
    config,
    enabled
}: GlobalGETProps) {
     console.log(dataSourceName);
     
    return useQuery({
        enabled: enabled && !!dataSourceName,
        queryKey: [dataSourceName, pageNumber, pageSize, sort_SortBy, sort_Ascending, filter_Logic, filter_Conditions, filter_Groups],
        queryFn: async () => await getData(dataSourceName, pageNumber, pageSize, totalCount, sort_SortBy, sort_Ascending, filter_Logic, filter_Conditions, filter_Groups, config) as { [key: string]: any },
        meta: {},
        placeholderData:(previousData) => previousData,
    });
}
