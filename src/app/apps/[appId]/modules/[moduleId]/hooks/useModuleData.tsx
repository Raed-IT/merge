import { useDataSourcesGETQuery, useModulesGETQuery } from "@/lib/data/axios-client/Query";
import routeSections from "../JsonData/routes.json";
import vehiclesSections from "../JsonData/vehicles.json";
import driversSections from "../JsonData/drivers.json";
import warehousesSections from "../JsonData/Warehouses.json";
import usersSections from "../JsonData/Users.json";
import consignmentSections from "../JsonData/consignments.json";
import { getPropertyFromObjectSafe } from "@/utils/helper";
import { FieldType } from "@/utils/enums/filtd-type-enum";
import { FieldDto, SectionDto } from "@/lib/data/axios-client";


const useModuleData = (moduleId: string | undefined) => {

    const modulesSections = {
        "consignment": consignmentSections,
        "routes": routeSections,
        "vehicles": vehiclesSections,
        "drivers": driversSections,
        "warehouses": warehousesSections,
        "users": usersSections,
    }

    const {
        data: moduleData,
        isLoading: isLoadingModules,
        isError: isErrorModule,
        refetch: refetchModule,
    } = useModulesGETQuery(
        { id: moduleId ?? '' },
        { enabled: !!moduleId }
    );

    const sections = getPropertyFromObjectSafe(modulesSections, moduleData?.name?.toLowerCase() ?? '') ?? [];
    const dataSourceData = moduleData?.sqlStatementData;
    const isLoad = isLoadingModules;
    const getFieldsFromSectionByType = (section: SectionDto, fieldType: FieldType): FieldDto[] => {
        return section.fields?.filter((field: FieldDto) => {
            let status = false;
            if (fieldType == FieldType.creatable) status = !!field.creatable;
            if (fieldType == FieldType.editable) status = !!field.editable;
            return status;
        }) ?? []
    }

    const getAllFieldsFromSectionByType = (fieldType: FieldType): FieldDto[] => {
        let fields: FieldDto[] = [];
        const _currentSections = getSectionsByType(fieldType);
        _currentSections.forEach((section: SectionDto) => {
            fields.push(...getFieldsFromSectionByType(section, fieldType))
        })
        return fields;
    }
    const getSectionsByType = (fieldType: FieldType): SectionDto[] => {
        const _sections = sections?.filter((section: SectionDto) => {
            let status = false;
            if (fieldType == FieldType.creatable) status = !!section.creatable;
            if (fieldType == FieldType.editable) status = !!section.editable;
            return status;
        }) ?? [];

        return _sections;
    }

    return {
        moduleData,
        isLoadingModules,
        isErrorModule,
        refetchModule,
        dataSourceData,
        sections,
        getFieldsFromSectionByType,
        getSectionsByType,
        isLoad,
        getAllFieldsFromSectionByType,
    };
};

export default useModuleData;
