import { SectionDto, SectionType } from "@/lib/data/axios-client";
import { Grid, Paper, Typography } from "@mui/material";
import { FieldComponentValue, GlobalDataType } from "@/types";
import TableSectionComponent from "./Table";
import ColumnsSectionComponent from "./columns";
import { Box } from "@mui/system";
import MapSectionComponent from "./map";
import RouteMapComponent from "./route-map";
import { GridRowSelectionModel } from "@mui/x-data-grid";
type SectionComponentType = {
    section: SectionDto,
    formData: FieldComponentValue[],
    onFinishLoading?: () => void,
    setValue: (value: FieldComponentValue) => void,
    formCheck: boolean,
    disabledFields?: boolean,
    data?: GlobalDataType | undefined,
    isEditRecord?: boolean,
    isLoadData?: boolean,
    onSelectedCellsChange?: (cells: any[], filed: string) => void,
}

const SectionComponent = ({ section, data, disabledFields, onSelectedCellsChange, isLoadData, isEditRecord, onFinishLoading, setValue, formData, formCheck }: SectionComponentType) => {
    let sectionWidget;
    getItem(formData, section)
    switch (section.type as string) {
        case SectionType.Columns as string:
            sectionWidget = (
                <ColumnsSectionComponent
                    isLoadData={isLoadData}
                    isEditRecord={isEditRecord}
                    data={data}
                    disabledFields={disabledFields}
                    showTitle
                    formData={formData}
                    onFinishLoading={onFinishLoading}
                    setValue={setValue}
                    section={section}
                    formCheck={formCheck}
                />
            );
            break;
        case SectionType.Table as string:
            sectionWidget =
                (<TableSectionComponent
                    onSelectedCellsChange={onSelectedCellsChange}
                    data={data}
                    isEditRecord={isEditRecord}
                    formData={formData}
                    disabledFields={disabledFields}
                    onFinishLoading={onFinishLoading}
                    setValue={setValue}
                    formCheck={formCheck}
                    section={section}
                />)
            break;
        case "Map":
            sectionWidget =
                (<MapSectionComponent
                    formData={formData}
                    onFinishLoading={onFinishLoading}
                    setValue={setValue}
                    formCheck={formCheck}
                    section={section}
                />)
            break;

        case "RoutMap":
            sectionWidget =
                (<RouteMapComponent
                    section={section}
                />)
            break;
        default:
            sectionWidget = <>Un Know Widget <Typography display={'inline'} color={'red'}>{section.type}</Typography> </>;
            break;
    }

    return <Grid item xs={12} md={isEditRecord ? section.showColumns : section.columns} >
        <Box sx={{ width: '100%', height: "100%", p: 1 }}>
            <Paper variant="outlined" sx={{ bgcolor: "background.default", margin: 1, width: '100%', height: "100%", p: 1.5 }}>
                {sectionWidget}
            </Paper>
        </Box>
    </Grid>;
}
const getItem = (formData: FieldComponentValue[], section: SectionDto) => {

    const index = formData.findIndex(item => {
        return item.name == section.propertyName ?? ''
    })


    if (index === -1) {
        let error = "";
        if (section.required) {
            error = `${section.propertyName} is required`;
        }
        return {
            error: error,
            value: "",
            name: section.propertyName ?? ''
        }
    }
    return formData[index];
}
export default SectionComponent;    