import { SectionDto } from "@/lib/data/axios-client";
import DrawerActionHeaderTableComponent from "./actions/drawer-action-component";
import { FieldComponentValue, GlobalDataType } from "@/types";

type TableHeaderActionsComponentProps = {
    section?: SectionDto,
    disabledFields?: boolean,
    recordData?: GlobalDataType | undefined,
    formData?: FieldComponentValue[],

}

const TableHeaderActionsComponent = ({ recordData,formData, section, disabledFields }: TableHeaderActionsComponentProps) => {

    return <>
        {/* {!!section ? section.headerActions?.map((action, index) => {
            if (action.actionType == "drawer") {
                return (
                    <DrawerActionHeaderTableComponent
                    formData={formData}
                        recordData={recordData}
                        disabledFields={disabledFields}
                        key={index} action={action} />
                );
            }
        }) : null
        } */}
    </>;
}
export default TableHeaderActionsComponent;