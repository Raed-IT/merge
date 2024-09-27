import { FormProps } from "@/components/helper/form/with-form"
import { FieldDto } from "@/lib/data/axios-client"

type MultipleStaticSelectComponentProps = {
    field: FieldDto, formProps: FormProps
}


export default function MultipleStaticSelectComponent({ field, formProps }: MultipleStaticSelectComponentProps) {
    return <>Multiple statice Select</>
}