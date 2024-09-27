import { FieldDataType, FieldDto } from '@/lib/data/axios-client';
import { FieldComponentValue } from '@/types';
import { TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
type TextFieldComponentProps = {
    field: FieldDto,
    setValue: (value: FieldComponentValue) => void,
    value?: FieldComponentValue,
    formCheck: boolean,
    disabled: boolean,
}

function TextFieldComponent({ field, disabled, value, setValue, formCheck }: TextFieldComponentProps) {


    /// <summary>
    /// Tracks whether the text field has been touched (interacted with) by the user.
    /// This is used to conditionally display error messages when the field is required and empty.
    /// </summary>
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

    const getVal = () => {
        const date = new Date(value?.value);
        if (!isNaN(date.getTime())) {
            return date?.toISOString()?.split('T')[0];
        }
        return value?.value;
    }
    return <>
        {/* {JSON.stringify(value)} */}
        <TextField
            InputLabelProps={field.dataType === FieldDataType.Date || field.dataType === FieldDataType.Time ? { shrink: true } : {}}
            label={field.label}
            variant='outlined'
            size="medium"
            fullWidth
            value={getVal()}
            error={!!value?.error && isTouch}
            helperText={isTouch ? value?.error : ''}
            minRows={field.dataType == FieldDataType.Text ? 3 : 1}
            multiline={field.dataType == FieldDataType.Text}
            defaultValue={value?.value}
            onChange={(e) => {
                setIsTouch(true);
                if (field.required && !(!!e.target?.value)) {
                    setValue({ value: e.target?.value, name: field.propertyName ?? '', error: `${field.label} is required` });
                } else {
                    setValue({ value: e.target?.value, name: field.propertyName ?? '', error: "" });
                }
            }}  
            type={field.dataType}
            placeholder={field?.label ?? ""}
            disabled={(field?.disabled ?? false) || disabled}
            required={field?.required ?? true}
            inputProps={{ readOnly: field?.readOnly ?? false }}
        />
    </>


}

export default TextFieldComponent
