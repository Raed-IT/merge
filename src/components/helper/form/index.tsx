"use client"

import SectionsComponent from "@/components/sections-components";
import withForm, { FormProps } from "./with-form";
const FormComponent = (props: FormProps) => {
 
    return <SectionsComponent {...props} />;
} 
export default withForm(FormComponent);
