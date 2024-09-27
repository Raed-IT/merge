import { FormProps } from "@/components/helper/form/with-form";
import { FieldDto } from "@/lib/data/axios-client";
import SingleCheckboxFiledComponent from "./single-checkbox-component";
 type CheckboxFiledComponentProps = {
    field: FieldDto,
    formProps: FormProps,
}
export default function CheckboxFiledComponent({ field, formProps }: CheckboxFiledComponentProps) {
    if (!!!field?.multiple){
        return <SingleCheckboxFiledComponent formProps={formProps} field={field} />;
    }
    return <>Multiple CheckBox</>;
}