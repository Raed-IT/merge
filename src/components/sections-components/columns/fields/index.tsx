import { FieldDataType, FieldDto } from "@/lib/data/axios-client"
import { ReactNode } from "react"
import TextFieldComponent from "./text-filed-component";
import { FormProps } from "@/components/helper/form/with-form";
import SelectComponent from "./select-component";
import CheckboxFiledComponent from "./checkbox-component";
 type FieldComponentProps = {
    field: FieldDto,
    disabled?: boolean
    formProps: FormProps,
}
export default function FieldComponent({ field, formProps }: FieldComponentProps) {

    const getField = (): ReactNode => {

         
        if ([
            FieldDataType.String as string,
            FieldDataType.Text as string,
            FieldDataType.Date as string,
            FieldDataType.Time as string,
        ].includes(field.dataType ?? '')
        ) {
            return <TextFieldComponent formProps={formProps} field={field} />;
        }

        if ([
            "static",
            "fromModules",
        ].includes(field.dataType ?? '')
        ) {
            return <SelectComponent formProps={formProps} field={field} />;
        }



        if (FieldDataType.Checkbox === field.dataType) {
            return <CheckboxFiledComponent  formProps={formProps} field={field} />;
        }

        else if (field.dataType as string == "Table") {
            return <>Table
            </>;
        }
        return <> unKnow Widget  </>;

    }
    return <>{getField()}
    </>
}