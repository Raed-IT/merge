import { DataTableComponent } from "@/components/data-table/structure-table";
import { SectionDto } from "@/lib/data/axios-client";
import { FieldComponentValue, GlobalDataType } from "@/types";
import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
import { FieldType } from "@/utils/enums/filtd-type-enum";
import { getPropertyFromObjectSafe } from "@/utils/helper";
import { getColumnForModuleSection } from "@/utils/table/data-teable";
import { Alert, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import TableHeaderComponent from "./components/table-header-component";
import { GridRowSelectionModel } from "@mui/x-data-grid";
type TableSectionComponentProps = {
    section: SectionDto,
    setValue: (value: FieldComponentValue) => void,
    formCheck: boolean,
    onFinishLoading?: () => void,
    onSelectedCellsChange?: (cells: any[], filed: string) => void,
    showTitle?: boolean,
    disabledFields?: boolean,
    formData: FieldComponentValue[],
    isEditRecord?: boolean,
    data?: GlobalDataType | undefined,
}
const TableSectionComponent = ({ section, formData, data: recordData, onSelectedCellsChange, isEditRecord, setValue, disabledFields, formCheck, onFinishLoading, showTitle, }: TableSectionComponentProps) => {
    const [isTouch, setIsTouch] = useState(false);

    const { data, isLoading: isLoading } = useGlobalData({
        dataSourceName: section.dataSource?.name ?? '',
        enabled: !!section.dataSource?.name && !isEditRecord,
    });

    useEffect(() => {
        if (section.required) {
            setValue({ name: section.propertyName ?? '', error: `${section.title} is required`, value: undefined });
        }
    }, [])

    useEffect(() => {
        if (formCheck) {
            setIsTouch(true);
        }
    }, [formCheck])
    const getData = useMemo(() => {
        if (!isEditRecord) {
            return !!data ? data.data as any[] : [];
        }
        return getPropertyFromObjectSafe(recordData ?? {}, "consignments");
    }, [data, isEditRecord, recordData]);

    const value = useMemo(() => {

        const index = formData.findIndex(item => {
            return item.name == section.propertyName ?? ''
        })

        if (index === -1) {
            let error = "";
            if (section.required) {
                error = `${section.propertyName} is required`;
            }
            return {
                error: error,
                value: "",
                name: section.propertyName ?? ''
            }
        }
        return formData[index];
    }, [formData]
    );

    return <>
        {
            !!value?.error && isTouch
                ? <Alert severity="error">
                    {value?.error}
                </Alert>
                : null
        }
        <DataTableComponent

            disabled={disabledFields}
            showHeader={!(!!value?.error && isTouch)}
            defaultSelectedCell={value?.value ?? []}
            onSelectedCellsChange={(s) => {
                if (onSelectedCellsChange && section.propertyName) {
                    onSelectedCellsChange(s as any[], section.propertyName);
                }
                if (section.required && s.length == 0) {
                    setValue({ name: section.propertyName ?? '', error: `${section.title} is required`, value: undefined });
                } else {
                    setIsTouch(true);
                    setValue({ name: section.propertyName ?? '', error: "", value: s });
                }
            }}
            rows={getData}
            loading={isLoading}
            header={<TableHeaderComponent
                formData={formData}
                section={section}
                disabledFields={disabledFields}
            />
            }
            columns={section.fields ? getColumnForModuleSection({ section: section, fieldType: FieldType.filterable }).map(col => ({ ...col, headerName: col.headerName || '', sortable: col.sortable ?? false })) : []}
        />
    </>;
}
export default TableSectionComponent;