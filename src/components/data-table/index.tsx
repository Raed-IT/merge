import { convertFilterToURL, determineFilterLogic, parseFilterFromURL } from '@/app/apps/[appId]/modules/[moduleId]/view-pages/grid-tabel/filterUtile';
import { FilterCondition, SectionDto } from '@/lib/data/axios-client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Box } from "@mui/material";
import { DataTableComponent } from './structure-table';
import { getColumnForModuleSection } from '@/utils/table/data-teable';
import { FieldType } from '@/utils/enums/filtd-type-enum';
import { RenderCustomCell } from '@/components/data-table/custom-cells';
import { useGlobalData } from '@/utils/api-global-hook/useGetGlobal';

interface GridTabelProps {
    dataSourceData: any;
    data?: any;
    sections: SectionDto;
    moduleData: any;
    onSelectionChange: (selection: number[]) => void;
}

function GridTabel({ sections, moduleData, dataSourceData, data , onSelectionChange }: GridTabelProps) {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams() ?? new URLSearchParams();

    const pageNumber = Number(searchParams.get('pageNumber')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const sortItem = {
        field: searchParams.get("sortField") || "id",
        sort: searchParams.get("sortOrder") === "asc" ? "asc" : "desc",
    };

    const filterData = parseFilterFromURL(searchParams.get("filterData") || "[]");
    const filterLogic = filterData.length > 0 ? determineFilterLogic(filterData) : undefined;

    const { data: GlobalData, isLoading: GlobalLoading, isFetching } = useGlobalData({
        dataSourceName: dataSourceData?.name ?? '',
        enabled: data,
        pageNumber,
        pageSize,
        sort_SortBy: sortItem.field,
        sort_Ascending: sortItem.sort === "asc",
        filter_Conditions: filterData,
        filter_Logic: filterLogic,
    });

    const handlePaginationChange = (newPageNumber: number, newPageSize: number) => {
        const s = new URLSearchParams(searchParams.toString());
        s.set("pageNumber", newPageNumber.toString());
        s.set("pageSize", newPageSize.toString());
        router.push(`${pathName}?${s.toString()}`);
    }; 

    const handleFilterChange = (filters: FilterCondition[]) => {
        const s = new URLSearchParams(searchParams.toString());
        s.set("pageNumber", "1");
        s.set("filterData", convertFilterToURL(filters));
        router.push(`${pathName}?${s.toString()}`);
    };

    const handleSortChange = (field: string, direction: "asc" | "desc") => {
        const s = new URLSearchParams(searchParams.toString());
        s.set("sortField", field);
        s.set("sortOrder", direction);
        router.push(`${pathName}?${s.toString()}`);
    };

    return (
        < >
            <DataTableComponent
                heightTabel={80}
                isFetching={isFetching}
                onCellClick={(cellData) => {
                    router.push(`${pathName}/show/${cellData.id}`);
                }}
                onApplyFilters={(filters) => handleFilterChange(filters)}
                onSortChange={(field, direction) => handleSortChange(field, direction)}
                totalRecordsCount={GlobalData?.queryPayload?.totalCount ?? 0}
                onPaginationModelChange={({ page, pageSize }) => {
                    handlePaginationChange(page + 1, pageSize);
                }}
                loading={GlobalLoading}
                header={<Box></Box>}
                columns={
                    Array.isArray(sections) && sections.length > 0
                        ? getColumnForModuleSection({
                            section: sections[0],
                            fieldType: FieldType.filterable,
                        }).map((col) => ({
                            ...col,
                            headerName: col.headerName || '',
                            sortable: col.sortable ?? false,
                        }))
                        : []
                }
                rows={GlobalData ? (GlobalData.data as any[]) : []}
                section={sections}
                renderCustomCell={RenderCustomCell}
                module={moduleData}
                onSelectedCellsChange={onSelectionChange}
            />
        </>
    );
}
export default GridTabel;
