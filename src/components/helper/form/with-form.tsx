"use client"
import LoadingComponent from "@/components/loading"
import { GlobalDataType } from "@/types"
import { FieldType } from "@/utils/enums/filtd-type-enum"
import { Box } from "@mui/material"
import { useMangeForm } from "../../../lib/hooks/use-mange-form"
import { FieldDto, SectionDto } from "@/lib/data/axios-client"

export type FormProps = {
    fieldType: FieldType,
    mutateDataSource?: string,// f u need to send to custom datasource change this 
    mutateMethod?: string, // change method from post to what u need 
    disableFields?: boolean,// thier 
    onFieldChange?: (filed: FieldDto, value: any, keepFiledIfNull?: boolean) => void,
    onSectionChange?: (section: SectionDto, value: any) => void,
    // 
    recordData?: GlobalDataType,
    isLoadRecordData?: boolean,
    // 
    formData?: Record<string, any>,
    formErrors?: Record<string, any>,
    // 
    isShowRecord?: boolean,// this att for spisify it u in show record or create page 
    isLoad?: boolean// ger sniffing any loading befor build form 
    onSubmittingStatusChange?: (status: boolean) => void,

}

const withForm = (Component: React.ComponentType<FormProps>, moduleId?: string | null,) => {
    return function (props: FormProps) {
        const { fieldType, isLoad, } = props;
        const { formErrors, formData, isLoadModuleData, handleOnSubmit, handledOnFieldChange, handledOnSectionChange } = useMangeForm(props);

        return <LoadingComponent isLoad={!!isLoadModuleData || !!isLoad} isAbsoluteIndicator={true}  >
            <Box component={'form'} noValidate id={"form"} onSubmit={handleOnSubmit}  >
                <Component {...props} fieldType={fieldType} formData={formData} onFieldChange={handledOnFieldChange} onSectionChange={handledOnSectionChange} formErrors={formErrors} />
            </Box>
        </LoadingComponent>
    }
}
export default withForm;


