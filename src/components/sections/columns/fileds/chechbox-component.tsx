import { FieldDto } from "@/lib/data/axios-client";
import { FieldComponentValue } from "@/types";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import { SyntheticEvent, useEffect, useState } from "react";

type CheckBoxFiledComponentProps = {
    field: FieldDto,
    setValue: (value: FieldComponentValue) => void,
    value?: FieldComponentValue,
    formCheck: boolean,
    disabled: boolean,
}


function CheckBoxFiledComponent(props: CheckBoxFiledComponentProps) {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        if (props.field.required) {
            props.setValue({ value: "", name: props.field.propertyName ?? '', error: `${props.field.label} is required` });

        }
    }, []);


    useEffect(() => {

        if (props.formCheck) {
            setIsTouch(true)
        }
    }, [props.formCheck]);


    const handelOnChange = (e: SyntheticEvent<Element, Event>, data: boolean) => {
        if (props.field.required && !data) {
            props.setValue({ value: data, name: props.field.propertyName ?? '', error: `${props.field.label} is required` });
            return;
        }
        props.setValue({ value: data, name: props.field.propertyName ?? '', error: `` });

    }
    
    return (
        <Box display={'flex'} flexDirection={"column"}>
            <FormControlLabel
                control={<Checkbox
                checked={props.value?.value}
                defaultValue={props.value?.value}
                    disabled={props.disabled}
                    value={props.value?.value}
                    onChange={handelOnChange}
                />}
                label={props.field.label}
            />
            {
                !!props.value?.error && isTouch ?
                    <FormHelperText sx={{ color: "red" }} > {props.value?.error ?? null}  </FormHelperText>
                    : null
            }

        </Box>
    );
}

export default CheckBoxFiledComponent;