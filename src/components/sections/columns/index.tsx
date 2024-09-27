"use client";
import { FieldDto, SectionDto } from '@/lib/data/axios-client'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import FieldComponent from './field-component'
import { FieldComponentValue, GlobalDataType } from '@/types';
import { Box } from '@mui/system';
type FieldsComponentProps = {
    section: SectionDto,
    setValue: (value: FieldComponentValue) => void,
    formData: FieldComponentValue[],
    formCheck: boolean,
    onFinishLoading?: () => void,
    showTitle?: boolean,
    disabledFields?: boolean,
    data?: GlobalDataType | undefined,
    isEditRecord?:boolean,
    isLoadData?:boolean,
}
function ColumnsSectionComponent({ data, section,isLoadData, disabledFields,isEditRecord, setValue, onFinishLoading, showTitle, formData, formCheck }: FieldsComponentProps) {
    // todo: set default values for fields below from  value={{ error: "", value: "default val", name:   '' }}
    return <Box display={"flex"} gap={1} flexDirection={"column"}   >
        {(showTitle) ? <Typography>{section?.title}</Typography> : null}
        <Grid container gap={1} columns={12} justifyContent={'space-between'} >
            {section.fields?.filter((filed) => filed.creatable).map((field, index) => {
                return <Grid item xs={12} lg={field.columns ?? 12}>
                    <FieldComponent  isLoadData={isLoadData} isEditRecord={isEditRecord}data={data} disabledFields={disabledFields} onFinishLoading={onFinishLoading} key={index} field={field} formCheck={formCheck} setValue={setValue} value={getItem(formData, field)} />
                </Grid>
            })}
        </Grid>
    </Box>
}
const getItem = (formData: FieldComponentValue[], field: FieldDto) => {

    if (formData.length === 0) {
        // data not seated
        return {
            error: "",
            value: '',
            name: ''
        };
    }
    const index = formData.findIndex(item => {
        //  find index of filed from record form data 
        return item.name == field?.propertyName
    })

    if (index === -1) {
        // if not exits return name field and error 
        let error = "";
        if (field.required) {
            error = `${field.propertyName} is required`;
        }
        return {
            error: error,
            value: formData[index]?.value ?? '',
            name: field.propertyName ?? ''
        }
    }
    // if exits return it 
    return formData[index];
}
export default ColumnsSectionComponent
