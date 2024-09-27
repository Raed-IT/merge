import { FormProps } from "@/components/helper/form/with-form";
import { FieldDto } from "@/lib/data/axios-client";
import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
import { getPropertyFromObjectSafe } from "@/utils/helper";
import { Autocomplete, FormControl, InputLabel, Skeleton, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

type SingleSearchableSelectComponentProps = {
    field: FieldDto;
    formProps: FormProps;
};

export default function SingleSearchableSelectComponent({ field, formProps }: SingleSearchableSelectComponentProps) {
    const { disableFields, onFieldChange, recordData, formData, formErrors, isLoad, isLoadRecordData, isShowRecord } = formProps;
    const [defaultValue, setDefaultValue] = useState<any>({});
    const { data, isLoading: loadingDataSource } = useGlobalData({
        dataSourceName: field.dataSource?.name ?? '',
        enabled: true,
    });

    const getData = useMemo(() => {
        if (!!data?.data) {
            return data.data as [];
        }
        if (!!data) {
            return data as [];
        }
        return [];
    }, [data]);

    const isLoading = loadingDataSource || isLoad || isLoadRecordData;

    useEffect(() => {
        const _val = getData.find((item: any) => item.id === formData?.[field.propertyName ?? '']);
        setDefaultValue(_val ?? null);
    }, [recordData, isLoadRecordData, formData]);




    return (
        <>
            {isLoading ? (
                <FormControl fullWidth>
                    <InputLabel id={`select-label-${field.id}`}>{field.label + " is loading.."}</InputLabel>
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={58}
                        sx={{ borderRadius: 1, bgcolor: 'grey.extraLight' }}
                    />
                </FormControl>
            ) : (
                <Autocomplete
                    fullWidth
                    disabled={disableFields}
                    value={defaultValue}
                    options={getData}
                    onChange={(event, value) => {
                        onFieldChange?.(field, value?.id);
                        setDefaultValue(value);
                    }}

                    getOptionLabel={(option) => option?.[field.dataSource?.keyFieldName??'']??option?.['id']
                        // getPropertyFromObjectSafe(option, field.dataSource?.keyFieldName ?? 'id') ??
                        // getPropertyFromObjectSafe(option, 'id')
                    }
                    isOptionEqualToValue={(option: any, value: any) => value && option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!formErrors?.[field.propertyName ?? '']}
                            helperText={formErrors?.[field.propertyName ?? '']}
                            required={!!field.required}
                            variant="outlined"
                            value={defaultValue}
                            label={field.label}
                            placeholder={!!field.label ? "Choose " + field.label : ''}
                        />
                    )}
                />
            )}
        </>
    );
}
