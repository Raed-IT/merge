import { SectionDto, SectionType } from "@/lib/data/axios-client";
import { FormProps } from "../helper/form/with-form";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import ColumnsComponents from "./columns";
import useModuleData from "@/app/apps/[appId]/modules/[moduleId]/hooks/useModuleData";
import { useParams } from "next/navigation";
import TableSectionComponent from "./table";
import MapSection from "./maps";
import { TapsSectionComponent } from "./taps";
type SectionComponentProps = {
    formProps: FormProps,
    currentSection: SectionDto,
}
export default function SectionComponent({ formProps, currentSection: section }: SectionComponentProps) {
    const { isShowRecord, fieldType } = formProps;
    const params = useParams();

    const { getFieldsFromSectionByType } = useModuleData(params?.moduleId as string);


    const getSection = (section: SectionDto): ReactNode => {
        let sectionWidget;

        switch (section.type as string) {
            case SectionType.Columns as string:
                sectionWidget = (
                    <ColumnsComponents formProps={formProps} fields={getFieldsFromSectionByType(section, fieldType)} />
                );
                break;
            case SectionType.Table as string:
                sectionWidget = <TableSectionComponent formProps={formProps} section={section} />;
                break;

            case SectionType.Taps as string:
                sectionWidget = <TapsSectionComponent formProps={formProps} section={section} />;
                break;


            case "Map":
            case "RoutMap":
                sectionWidget = (<MapSection />)
                break;
            default:
                sectionWidget = <>Un Know Widget <Typography display={'inline'} color={'red'}>{section.type}</Typography> </>;
                break;
        }
        return sectionWidget;
    }



    return <Grid item xs={12} md={isShowRecord ? section.showColumns : section.columns} >
        <Box sx={{ width: '100%', height: "100%", p: 1 }}>
            <Paper variant="outlined" sx={{ bgcolor: "background.default", margin: 1, width: '100%', height: "100%", px: 2.5, py: 1.5 }}>
                <Typography mb={2}>{section.title}</Typography>
                {getSection(section)}
            </Paper>
        </Box>
    </Grid>;

}