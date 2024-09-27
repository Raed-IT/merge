import { Grid } from "@mui/material";
import SectionComponent from "./section-component";
import { SectionDto } from "@/lib/data/axios-client";
import useModuleData from "@/app/apps/[appId]/modules/[moduleId]/hooks/useModuleData";
import { useParams } from "next/navigation";
import { FormProps } from "../helper/form/with-form";
// TODO: add validation to check box 


export default function SectionsComponent(props: FormProps) {
    const { fieldType } = props;
    const params = useParams();

    const { getSectionsByType } = useModuleData(params?.moduleId as string);

    
    return <Grid container lg={13} justifyContent={{ xs: "center", md: 'space-between' }}>
        {getSectionsByType(fieldType).map(((section: SectionDto, index) => {
            return <SectionComponent key={index} formProps={props} currentSection={section} />
        }))}
    </Grid>
}