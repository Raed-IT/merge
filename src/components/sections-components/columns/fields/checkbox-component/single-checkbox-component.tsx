import { FormProps } from "@/components/helper/form/with-form";
import { FieldDto } from "@/lib/data/axios-client";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
type SingleCheckboxFiledComponentProps = {
    field: FieldDto,
    formProps: FormProps,
}
export default function SingleCheckboxFiledComponent({ field, formProps }: SingleCheckboxFiledComponentProps) {
    const { formData, onFieldChange, disableFields } = formProps;
    const { disabled } = field;
    return (
        <Box display={'flex'} flexDirection={"column"}>
            <FormControlLabel
                control={<Checkbox
                    // checked={formData?.[field.propertyName ?? '']}
                    onChange={(e) => {
                        onFieldChange?.(field!, e.target.checked, true);
                    }}
                />}
                disabled={disableFields || !!disabled}
                label={field.label}
            />
        </Box>
    );
}