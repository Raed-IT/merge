import { FormProps } from "@/components/helper/form/with-form"
import { FieldDto } from "@/lib/data/axios-client"
import SingleSearchableSelectComponent from "./single-searchable-select-component"
import SingleStaticSelectComponent from "./single-static-select-component"


type SingleSelectComponent = {
    field: FieldDto, formProps: FormProps
}

export default function SingleSelectComponent({ field, formProps }: SingleSelectComponent) {

    if (field.dataType as string === 'static') {
        return <SingleStaticSelectComponent field={field} formProps={formProps} />
    }
    else if (field.dataType as string === 'fromModules') {
        return <SingleSearchableSelectComponent field={field} formProps={formProps} />
    }
}