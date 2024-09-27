import { FieldDataType, FieldDto, WarehouseDto } from '@/lib/data/axios-client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TextFieldComponent from './fileds/text-filed-component';
import SelectFieldComponent from './fileds/select-filed-component';
import { FieldComponentValue, GlobalDataType } from '@/types';
import SearchableStaticSelectField from './fileds/searchable-static-select-field';
import SearchableSyncSelectField from './fileds/searchable-sync-select-field';
import { useWarehousesGETQuery } from '@/lib/data/axios-client/Query';
import { warehousesGET } from '@/lib/data/axios-client/Client';
import CheckBoxFiledComponent from './fileds/chechbox-component';
import MapFieldComponent from './fileds/map-field';
type FieldComponentProps = {
    field: FieldDto,
    onFinishLoading?: () => void,
    setValue: (value: FieldComponentValue) => void,
    value: FieldComponentValue,
    formCheck: boolean,
    disabledFields?: boolean,
    data?: GlobalDataType | undefined,
    isEditRecord?: boolean,
    isLoadData?: boolean,
}
function FieldComponent({ data, field, setValue, isLoadData, disabledFields, isEditRecord, onFinishLoading, value, formCheck }: FieldComponentProps) {
    if ([
        FieldDataType.String as string,
        FieldDataType.Text as string,
        FieldDataType.Date as string,
        FieldDataType.Time as string,
    ]
        .includes(field.dataType ?? '')
    ) {
        return <TextFieldComponent disabled={!!disabledFields} formCheck={formCheck} value={value} field={field} setValue={setValue} />;
    }
    console.log(field.dataType);
    
    if (FieldDataType.Checkbox === field.dataType) {
        return <CheckBoxFiledComponent disabled={!!disabledFields} formCheck={formCheck} value={value} field={field} setValue={setValue} />;
    }
    else if (field.dataType as string == "static") {
        return <SearchableStaticSelectField
            isEditRecord={isEditRecord}
            data={data}
            isLoadData={isLoadData}
            disabled={!!disabledFields}
            isMutable={field.multiple ?? false}
            formCheck={formCheck}
            field={field}
            setValue={setValue}
            value={value}
        />
    }
    else if (field.dataType as string == "fromModules") {
        return <SearchableSyncSelectField
            isLoadData={isLoadData}
            isEditRecord={isEditRecord}
            data={data}
            disabled={!!disabledFields}
            onFinishLoading={onFinishLoading}
            isMutable={field.multiple ?? false}
            formCheck={formCheck}
            field={field}
            setValue={setValue}
            value={value}
        />
    }  
    else if (field.dataType as string == "map") {
        
        return <MapFieldComponent
            data={data}
            disabled={!!disabledFields}
        />
    }
    else if (field.dataType as string == "Table") {
        return <>Table
        </>;
    }
    return <> unKnow Widget  </>;

}

export default FieldComponent;
