import { FieldDataType, FieldDto, ModuleDto, SectionDto } from "@/lib/data/axios-client"
import { GridColDef } from '@mui/x-data-grid'
import { FieldType } from "../enums/filtd-type-enum"
import { getFieldFromType } from "../fields"

type GetColumnForModuleSectionProps = {
    section: SectionDto,
    fieldType: FieldType
}

const getColumnForModuleSection = ({ section, fieldType }: GetColumnForModuleSectionProps) => {
    const columns: GridColDef[] = []
     
    if (!!section?.fields) {
        getFieldFromType(section.fields, fieldType)?.forEach((field: FieldDto) => {
            columns.push({
                disableColumnMenu: true,
                field: field.propertyName!,
                headerName: field.label!,
                editable: field.editable!,
                type: field.dataType === FieldDataType.Number ? 'number' : 'string',
                filterable: field.filterable!,
                sortable: field.sortable ?? true,  
                flex: 1,
            })
        })
    }
    return columns
}

const getColumnForModule = ({ module, fieldType = FieldType.filterable }: { module: ModuleDto, fieldType?: FieldType }) => {
    const columns: GridColDef[] = [];
    
    if (!!module?.sections) {
        module.sections!.forEach(section => {
            columns.push(...getColumnForModuleSection({ section, fieldType: fieldType }));
        });
    }
    return columns;
}

const getFieldsFromModuleByType = ({ module, fieldType = FieldType.filterable }: { module: ModuleDto, fieldType?: FieldType }) => {
    const columns: string[] = [];
 
    if (!!module?.sections) {
        module.sections!.forEach(section => {            
            columns.push(...getFieldsFromSectionByType({ section, fieldType: fieldType }));
        });
    }
    return columns;
}

const getFieldsFromSectionByType = ({ section, fieldType = FieldType.filterable }: { section: SectionDto, fieldType?: FieldType }) => {
    const columns: string[] = []
     
    if (!!section?.fields) {
        getFieldFromType(section.fields, fieldType)?.forEach((field: FieldDto) => {
            columns.push( field.propertyName ?? '')
        })
    }
    return columns
}

export { getColumnForModuleSection, getColumnForModule, getFieldsFromModuleByType, getFieldsFromSectionByType };
