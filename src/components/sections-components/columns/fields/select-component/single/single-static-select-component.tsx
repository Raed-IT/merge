import { FormProps } from "@/components/helper/form/with-form"
import { FieldDto, FiledOptions } from "@/lib/data/axios-client"
import { getPropertyFromObjectSafe } from "@/utils/helper";
import { Autocomplete, FormControl, InputLabel, Skeleton, TextField } from "@mui/material";
import { useMemo } from "react";

type SingleStaticSelectComponentProps = {
    field: FieldDto, formProps: FormProps
}


export default function SingleStaticSelectComponent({ field, formProps }: SingleStaticSelectComponentProps) {
    const { isLoadRecordData, disableFields, isLoad, recordData, onFieldChange, formErrors, formData } = formProps;


    const defaultValue = useMemo(() => {
        if (!!recordData && !!field?.options) {
            let _default = field.options?.filter((item: any) => item.value == getPropertyFromObjectSafe(recordData, field?.propertyName ?? ''))
            if (_default.length > 0) {
                return _default[0];
            }
        }
        return undefined;
    }, [recordData,])

    return (
        <>
            {isLoadRecordData || isLoad ?
                <FormControl fullWidth>
                    <InputLabel id={`select-label-${field.id}`}>{field.label + " is loading.."}  </InputLabel>
                    <Skeleton variant='rectangular' width='100%' height={65} sx={{ borderRadius: 1, bgcolor: 'grey.extraLight' }} />
                </FormControl>
                :
                <Autocomplete
                    fullWidth
                    options={!!field?.options ? field!.options : []}
                    defaultValue={defaultValue}
                    getOptionLabel={(option: FiledOptions) => option.label}
                    disabled={!!disableFields}
                    isOptionEqualToValue={(option: FiledOptions, value: FiledOptions) => option?.value === value?.value}
                    onChange={(event, value) => {
                        onFieldChange?.(field, value?.value);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            disabled={!!disableFields}
                            defaultValue={defaultValue}
                            required={!!field.required}
                            variant="outlined"
                            error={formErrors?.[field.propertyName ?? '']}
                            helperText={formErrors?.[field.propertyName ?? '']}
                            label={field.label}
                            placeholder={!!field.label ? "Chose " + field.label : ''}
                        />
                    )
                    }
                />
            }


        </>
    )
}