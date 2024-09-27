import { FieldDto } from '@/lib/data/axios-client'
import { useDataSourcesGETQuery } from '@/lib/data/axios-client/Query';
import { FieldComponentValue } from '@/types';
import { useGlobalData } from '@/utils/api-global-hook/useGetGlobal';
import { getPropertyFromObjectSafe } from '@/utils/helper';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
type FieldComponentProps = {
    field: FieldDto,
    setValue: (value: FieldComponentValue) => void,
    value: FieldComponentValue,
    formCheck: boolean,
}
function SelectFieldComponent({ field, value, setValue, formCheck }: FieldComponentProps) {
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        if (field.required) {
            setValue({ value: value?.value, name: field.propertyName ?? '', error: !!value?.value ? '' : `${field.label} is required` });
        }
    }, [])

    useEffect(() => {
        if (formCheck) {
            setIsTouch(true)
        }
    }, [formCheck]);

    const { data, isLoading } = useGlobalData({
        dataSourceName: field.dataSource?.name ?? '',
        enabled: !!field.dataSource?.name
    });

    return <>
        <FormControl fullWidth>
            <InputLabel id={`select-label-${field.id}`}>{field.label} {isLoading ? 'loading.. ' : ""}</InputLabel>
            {
                isLoading ?
                    <Skeleton variant='rectangular' width='100%' height={58} sx={{ borderRadius: 1, bgcolor: 'grey.extraLight' }} />
                    : <Select
                        error={!!value?.error && isTouch} labelId={`select-label-${field.id}`}
                        value={value.value}
                        disabled={!!field?.disabled || !data}
                        label={field.label}
                        required={field.required ?? true}
                        onChange={(event) => {
                            setIsTouch(true)
                            setValue({ name: field.propertyName ?? '', value: event.target.value, error: "" });
                            // setValue(event.target.value);
                        }}
                    >
                        {data?.data ? data.data!.map((item: any, index: number) => {
                            return <MenuItem key={index} value={item.id}>{getPropertyFromObjectSafe(item, field.dataSource?.keyFieldName ?? 'name')}</MenuItem>
                        }) : null}
                    </Select>}

            {!!value?.error && isTouch
                ? <FormHelperText
                    id={`select-label-${field.id}`}
                    sx={{ color: "error.main", }}
                >
                    {value?.error}
                </FormHelperText>
                : null}
        </FormControl>
    </>


}

export default SelectFieldComponent
