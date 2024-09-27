import useModuleData from "@/app/apps/[appId]/modules/[moduleId]/hooks/useModuleData";
import { FieldDataType, FieldDto, SectionDto } from "@/lib/data/axios-client";
import { useGlobePost } from "@/utils/api-global-hook/useGloblePost";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProps } from "../../components/helper/form/with-form";

export function useMangeForm(props: FormProps, moduleId?: string | null,) {
    const router = useRouter();

    const { fieldType, recordData, isLoadRecordData, onSubmittingStatusChange, isShowRecord, mutateDataSource, mutateMethod } = props;


    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const params = useParams();

    const currentModuleId = moduleId ?? params?.moduleId as string;

    const { dataSourceData, isLoad, getAllFieldsFromSectionByType } = useModuleData(currentModuleId);
    const dataSource = `${(!!mutateDataSource && !mutateDataSource.includes("undefined")) ? mutateDataSource : dataSourceData?.name}` ?? "";

    const { mutate, isPending } = useGlobePost(dataSource, mutateMethod ?? "POST");
    const [formData, setFormData] = useState<Record<string, string | File>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});


    const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
console.log(formErrors);

        if (checkValidateForm() && !isPending) {
            let data = {};
            Object.entries(formData).forEach(([name, value]) => {
                data = { ...data, [name]: value };
            });

            onSubmittingStatusChange?.(true);

            mutate(data, {
                onSuccess: () => {
                    onSubmittingStatusChange?.(false);
                    // const urlParts = dataSource.split('/');
                    // const url = `${urlParts[1]}/${urlParts[0]}`;
                    // console.log(urlParts, url);
                    // queryClient.invalidateQueries({
                    //     queryKey: [url],
                    // });
                    router.replace("/apps/" + params?.appId + "/modules/" + currentModuleId);
                    // enqueueSnackbar(`done create  ${moduleData?.name}  successfully `, { variant: 'success' });
                    enqueueSnackbar(`The operation was completed successfully`, { variant: 'success' });

                },
                onError: (err: any) => {
                    onSubmittingStatusChange?.(false);
                    enqueueSnackbar(err?.response?.message ?? err.message, { variant: 'error' });
                }
            })
        } else {
            enqueueSnackbar("Please fill all required fields", { variant: 'error' });
        }
    }
    const handledOnFieldChange = (field: FieldDto, value: any, keepFiledIfNull?: boolean) => {
        validateField(field, value)
        if (!!value) {
            setFormData((prevData: Record<string, string | File>) => ({
                ...prevData,
                [field.propertyName ?? '']: value
            }));
            return;
        }
        if (!keepFiledIfNull) {
            // remove field from form data if value is null
            setFormData((prevData: Record<string, string | File>) => {
                const { [field.propertyName ?? '']: _, ...rest } = prevData;
                return rest;
            });
            return;
        }
        // keep filed if null or false as Ex check box if state is false 
        setFormData((prevData: Record<string, string | File>) => ({
            ...prevData,
            [field.propertyName ?? '']: value
        }));

    }
    console.log(formErrors);

    const handledOnSectionChange = (section: SectionDto, value: any) => {
        validateSection(section, value);
        setFormData((prevData: Record<string, string | File>) => ({
            ...prevData,
            [section.propertyName ?? '']: value
        }));

    }
    const validateSection = (section: SectionDto, value: any) => {

        if (section.required) {
            if (!!!value || (Array.isArray(value) && value.length === 0)) {
                // handel req case 
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [section.propertyName ?? '']: `The ${section.propertyName} field is required`,
                }));
                return false;
            }
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [section.propertyName ?? '']: ``,
            }));
            return true;

        }
        return true;
    }

    function checkValidateForm(): boolean {

        var formStatus = true;
        const fields = getAllFieldsFromSectionByType(fieldType);
        fields.forEach((field) => {
            if (formStatus) {
                formStatus = validateField(field!, formData[field.propertyName ?? ''])
            } else {
                validateField(field!, formData[field.propertyName ?? '']);
            }
        });
        return formStatus;
    }


    function validateField(field: FieldDto, value: any): boolean {


        if (field.required) {
            if (!!!value || (Array.isArray(value) && value.length === 0)) {
                // handel req case 
                console.log(field.propertyName,{[field.propertyName ?? '']: `The ${field.propertyName} field is required`,});
                
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [field.propertyName ?? '']: `The ${field.propertyName} field is required`,
                }));
                return false;
            }
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [field.propertyName ?? '']: ``,
            }));
            return true;

        }
        return true;
        //  check conditions it coming from field att elater and update this function for respect conditions 
    }


    useEffect(() => {
        if (!isLoadRecordData && !!recordData) {
            const fields = getAllFieldsFromSectionByType(fieldType);
            var data = {};
            fields.forEach(filed => {
                var fieldData = recordData[filed.propertyName ?? ''];
                if (!isNaN(Date.parse(fieldData))) {
                    const date = new Date(Date.parse(fieldData));
                    if (filed.dataType === FieldDataType.Date as string) {
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        fieldData = `${year}-${month}-${day}`;
                    } else if (filed.dataType === FieldDataType.Time as string) {

                    }
                }

                if (!!filed.propertyName && !!fieldData) {
                    data = { ...data, [filed.propertyName ?? '']: fieldData }
                }
            })

            setFormData(data);
        }
    }, [isLoadRecordData, recordData])


    return {
        formData,
        isLoadModuleData: isLoad,
        formErrors,
        handledOnFieldChange,
        handleOnSubmit,
        setFormData,
        setFormErrors,
        handledOnSectionChange
    };


}
