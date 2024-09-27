import { Box } from "@mui/system";
import TableHeaderActionsComponent from "./table-header-actions";
import { SectionDto } from "@/lib/data/axios-client";
import { Typography } from "@mui/material";
import { FieldComponentValue, GlobalDataType } from "@/types";
type TableHeaderComponentProps = {
    section?: SectionDto,
    disabledFields?: boolean,
    formData?: FieldComponentValue[],
    recordData?: GlobalDataType | undefined,

}
export default function TableHeaderComponent({ recordData, formData, section, disabledFields }: TableHeaderComponentProps) {
    return <Box display={"flex"} justifyContent={'space-between'} alignItems={"center"} py={2}>
        <Typography> {section?.title}</Typography>
        <TableHeaderActionsComponent
            recordData={recordData}
            formData={formData}
            disabledFields={disabledFields}
            section={section}
        />
    </Box>;
} 