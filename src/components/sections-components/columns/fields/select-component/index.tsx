import { FormProps } from "@/components/helper/form/with-form";
import { FieldDto } from "@/lib/data/axios-client";
import MultipleSelectComponent from "./multiple";
import SingleSelectComponent from "./single";

type SelectComponentProps = {
    field: FieldDto,
    formProps: FormProps,
}

export default function SelectComponent({ field, formProps }: SelectComponentProps) {
    if (field.multiple) {
        return <MultipleSelectComponent field={field} formProps={formProps} />
    }
    return <SingleSelectComponent field={field} formProps={formProps} />
}