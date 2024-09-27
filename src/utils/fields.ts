import { FieldDto, ModuleDto } from "@/lib/data/axios-client";
import { FieldType } from "./enums/filtd-type-enum";

export function getFiltrableFields(fields: FieldDto[]) {
    return fields?.filter((filed) => !!filed.filterable)
}
export function getCreatableFields(fields: FieldDto[]) {
    return fields?.filter((filed) => !!filed.creatable)
}

export function getEditableFields(fields: FieldDto[]) {
    return fields?.filter((filed) => !!filed.editable)
}
export function getModuleFields({ module, filedType }: { module: ModuleDto, filedType?: FieldType }): FieldDto[] {
    const sections = module.sections;
    let fields: FieldDto[] = [];
    sections?.map(section => {
        fields = [...fields, ...section!.fields!];
    })
    if (!!filedType) {
        return getFieldFromType(fields, filedType)
    }
    return fields;
}

export function getFieldFromType(fields: FieldDto[], type: FieldType) {
    return fields?.filter((field) => {
        if (type === FieldType.filterable) {
            return !!field.filterable;
        }
        if (type === FieldType.creatable) {
            return !!field.creatable;
        }
        if (type === FieldType.editable) {
            return !!field.editable;
        }
        return true;
    });
}
