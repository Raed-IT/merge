import { FieldDto } from "@/lib/data/axios-client";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import FieldComponent from "./fields";
import { FormProps } from "@/components/helper/form/with-form";
type ColumnsComponentsProps = {
    fields: FieldDto[],
    disabled?: boolean,
    formProps:FormProps,

}
export default function ColumnsComponents({ fields, formProps }: ColumnsComponentsProps) {
    return <Box display={"flex"} gap={1} flexDirection={"column"}   >
        <Grid container gap={1} columns={12} justifyContent={'space-between'} >
            {fields.map((field, index) => {
                return <Grid key={index} item xs={12} lg={field.columns ?? 12} py={0.3}>
                    <FieldComponent formProps={formProps} field={field} key={index} disabled />
                </Grid>
            })}
        </Grid>
    </Box>;
}