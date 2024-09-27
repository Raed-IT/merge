import { DataTableComponent } from "@/components/data-table/structure-table";
import { FormProps } from "@/components/helper/form/with-form";
import { ComparisonOperator, SectionDto } from "@/lib/data/axios-client";
import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
import { FieldType } from "@/utils/enums/filtd-type-enum";
import { getColumnForModuleSection } from "@/utils/table/data-teable";
import { Alert } from "@mui/material";
import { convertFilterToURL, determineFilterLogic, parseFilterFromURL } from '@/app/apps/[appId]/modules/[moduleId]/view-pages/grid-tabel/filterUtile';
import { FilterCondition } from '@/lib/data/axios-client';
import { useRouter, useSearchParams, usePathname, useParams } from 'next/navigation';
import { Box } from "@mui/material";
import { RenderCustomCell } from '@/components/data-table/custom-cells';
import { convertStringToEnum } from "@/utils/helper";
import useModuleData from "@/app/apps/[appId]/modules/[moduleId]/hooks/useModuleData";

type TableSectionComponentProps = {
    formProps: FormProps,
    section: SectionDto
};

export default function TableSectionComponent({ section, formProps }: TableSectionComponentProps) {
    const { dataSource } = section;
    const { onSectionChange, formErrors, isShowRecord, formData } = formProps;
    const pathName = usePathname();
    const router = useRouter();
    const params = useParams();
    const { moduleData } = useModuleData(params?.mouduleId as string);

    const searchParams = useSearchParams() ?? new URLSearchParams();

    const pageNumber = Number(searchParams.get('pageNumber')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const sortItem = {
        field: searchParams.get("sortField") || "id",
        sort: searchParams.get("sortOrder") === "asc" ? "asc" : "desc",
    };

    const filterDataFromURL = parseFilterFromURL(searchParams.get("filterData") || "[]");
    const staticFilter: FilterCondition = {
        field: 'routeId',
        operator: ComparisonOperator.Equals,
        value: params?.recordId as string,
        init: () => { },
        toJSON: () => { }
    };

    const filterData = [staticFilter, ...filterDataFromURL];
    const filterLogic = filterData.length > 0 ? determineFilterLogic(filterData) : undefined;
    const { data: GlobalData, isLoading: GlobalLoading, isFetching } = useGlobalData({
        dataSourceName: dataSource?.name ?? '',
        enabled: !!dataSource?.name,
        pageNumber,
        pageSize,
        sort_SortBy: sortItem.field,
        sort_Ascending: sortItem.sort === "asc",
        filter_Conditions: filterData,
        filter_Logic: filterLogic,
    });

    const handleOnSelectedCellsChange = (selectedCells: any[]) => {
        onSectionChange?.(section, selectedCells);
    };

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
        <Box>
            {formErrors?.[section?.propertyName ?? ''] ? <Alert severity={'error'}> {formErrors?.[section?.propertyName ?? '']} </Alert> : null}
            <DataTableComponent
                heightTabel={60}
                isFetching={isFetching}
                onApplyFilters={(filters) => handleFilterChange(filters)}
                onSortChange={(field, direction) => handleSortChange(field, direction)}
                totalRecordsCount={GlobalData?.queryPayload?.totalCount ?? 0}
                onPaginationModelChange={({ page, pageSize }) => {
                    handlePaginationChange(page + 1, pageSize);
                }}
                loading={GlobalLoading}
                onSelectedCellsChange={handleOnSelectedCellsChange}
                header={<Box></Box>}
                columns={getColumnForModuleSection({ section: section, fieldType: FieldType.filterable }).map(col => ({ ...col, headerName: col.headerName || '', sortable: col.sortable ?? false }))}
                rows={GlobalData ? (GlobalData.data as any[]) : []}
                section={section}
                renderCustomCell={RenderCustomCell}
                module={moduleData}
            />
        </Box>
    );
}
