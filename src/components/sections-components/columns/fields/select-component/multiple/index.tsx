import { FormProps } from "@/components/helper/form/with-form"
import { FieldDto } from "@/lib/data/axios-client"
import MultipleStaticSelectComponent from "./multiple-static-select-component"


type MultipleSelectComponent = {
    field: FieldDto, formProps: FormProps
}

export default function MultipleSelectComponent({ field, formProps }: MultipleSelectComponent) {
    if (field.dataType as string === 'static') {
        return <MultipleStaticSelectComponent field={field} formProps={formProps} />
    }
    else if (field.dataType as string === 'fromModules') {
        return <MultipleSelectComponent field={field} formProps={formProps} />
    }
}


