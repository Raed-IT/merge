import { FormProps } from '@/components/helper/form/with-form';
import { FieldDataType, FieldDto } from '@/lib/data/axios-client';
import { TextField } from '@mui/material';
import React from 'react'

type TextFieldComponentProps = {
    field: FieldDto,
    formProps: FormProps,
}

function TextFieldComponent({ field, formProps }: TextFieldComponentProps) {
    const { isLoadRecordData, formData, formErrors, onFieldChange, disableFields } = formProps;

    return (
        <TextField
            InputLabelProps={field.dataType === FieldDataType.Date || field.dataType === FieldDataType.Time ? { shrink: true } : {}}
            label={field.label}
            variant='outlined'
            size="medium"
            fullWidth
            name={field.propertyName ?? ''}
            error={Boolean(formErrors?.[field.propertyName ?? ''])}
            helperText={formErrors?.[field.propertyName ?? '']}
            minRows={field.dataType === FieldDataType.Text ? 3 : 1}
            multiline={field.dataType === FieldDataType.Text}
            value={formData?.[field.propertyName ?? ''] ?? ''} 
            onChange={(e) => {
                if (onFieldChange) {
                    onFieldChange(field, e.target.value);
                }
            }}
            type={field.dataType}
            placeholder={field?.label ?? ""}
            disabled={(field?.disabled ?? false) || disableFields}
            required={field?.required ?? false}
            inputProps={{ readOnly: field?.readOnly ?? false }}
        />
    );
}

export default TextFieldComponent;
