import { FieldDto, FiledOptions } from '@/lib/data/axios-client'
import { FieldComponentValue, GlobalDataType } from '@/types'
import { getPropertyFromObjectSafe } from '@/utils/helper';
import { Autocomplete, FormControl, InputLabel, Skeleton, TextField } from '@mui/material';
import React, { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react'
type SearchableStaticSelectFieldProps = {
  field: FieldDto,
  setValue: (value: FieldComponentValue) => void,
  formCheck: boolean,
  isMutable?: boolean,
  value?: FieldComponentValue,
  disabled: boolean,
  data?: GlobalDataType | undefined,
  isEditRecord?: boolean,
  isLoadData?: boolean,
}

function SearchableStaticSelectField({ setValue, isLoadData, isEditRecord, data: recordData, disabled, value, field, formCheck, isMutable }: SearchableStaticSelectFieldProps) {

  const [isTouch, setIsTouch] = useState(false);


  // if (isMutable && defaultValue) {
  //   throw new Error('Mutable select field cannot have a defaultValue pleas set defaultValues as array of FieldComponentValue ');
  // }
  // if (!isMutable && defaultValues) {
  //   throw new Error('Single select field cannot have a defaultValues pleas set defaultValue as FieldComponentValue ');
  // }


  useEffect(() => {
    if (!!field.required && !value?.value) {
      setValue({ value: "", name: field.propertyName ?? '', error: `${field.label} is required` });
    }
  }, [])


  useEffect(() => {

    if (formCheck) {
      setIsTouch(true)
    }
  }, [formCheck]);

  const handelOnChange = (e: SyntheticEvent<Element, Event>, data: FiledOptions | FiledOptions[] | null) => {
    setIsTouch(true);
    if (!!data) {

      if (Array.isArray(data)) {
        setValue({ value: Array.from(new Set(data.map((item) => item.value))), name: field.propertyName ?? '', error: `` });
      } else {
        setValue({ value: data.value, name: field.propertyName ?? '', error: `` });
      }
    } else {
      // empty val set 
      setValue({ value: "", name: field.propertyName ?? '', error: `${field.label} is required` });
    }

  }


  // const getValue = () => {

  //   // const options = field?.options?.filter(option => option.value === value?.value);
  //   let options;
  //   if (isMutable) {
  //     options = getMultipleValue();
  //   } else {
  //     options = field?.options?.filter(option => option.value === value?.value);
  //   }


  //   if (options && options?.length > 0) {
  //     if (isMutable) {
  //       return options;
  //     } else {
  //       return options[0];
  //     }
  //   }
  //   return isMutable ? [] : null;
  // }


  const getMultipleValue = () => {
    return field?.options?.filter(option => value?.value?.includes(option.value));
  }


  const defaultValue = useMemo(() => {
    if (!!recordData   && !!field?.options) {
      if (!isMutable){
       let _default = field.options?.filter((item: any) => item.value == getPropertyFromObjectSafe(recordData, field?.propertyName ?? ''))      
       if (_default.length > 0) {
        return _default[0];
      } 
    }else{
      return getMultipleValue();
    }
    }
    return undefined;
  }, [recordData, value?.value,])

 
 
  return (
    <>
      {isLoadData?

      <FormControl fullWidth>
      <InputLabel id={`select-label-${field.id}`}>{field.label + " is loading.."}  </InputLabel>
      <Skeleton variant='rectangular' width='100%' height={65} sx={{ borderRadius: 1, bgcolor: 'grey.extraLight' }} />
    </FormControl>
    : 
        <Autocomplete
          fullWidth
          multiple={isMutable}
          options={!!field?.options ? field!.options : []}
          defaultValue={defaultValue}
          getOptionLabel={(option: FiledOptions) => option.label}
          disabled={!!disabled}
          isOptionEqualToValue={(option: FiledOptions, value: FiledOptions) => option?.value === value?.value}
          onChange={handelOnChange}
          renderInput={(params) => (
            <TextField
              {...params}
              disabled={!!disabled}
              defaultValue={defaultValue}
              required={!!field.required}
              variant="outlined"
              error={!!value?.error && isTouch}
              helperText={isTouch ? value?.error : ''}
              label={field.label}
              placeholder={!!field.label ? "Chose " + field.label : ''}
            />
          )
          }
        />
      }


    </>
  )
}

export default SearchableStaticSelectField
