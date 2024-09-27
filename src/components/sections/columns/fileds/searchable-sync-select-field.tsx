import { FieldDto, FiledOptions } from '@/lib/data/axios-client'
import { FieldComponentValue, GlobalDataType } from '@/types'
import { useGlobalData } from '@/utils/api-global-hook/useGetGlobal';
import { getPropertyFromObjectSafe } from '@/utils/helper';
import { FormControl, InputLabel, Skeleton, TextField, Typography } from '@mui/material';
import { useEffect, useState, useMemo, useRef } from 'react'
import { Autocomplete } from '@mui/material';

type SearchableSyncSelectFieldProps = {
  field: FieldDto,
  setValue: (value: FieldComponentValue) => void,
  formCheck: boolean,
  isMutable?: boolean,
  value?: FieldComponentValue,
  onFinishLoading?: () => void,
  data?: GlobalDataType | undefined,
  disabled: boolean,
  isEditRecord?: boolean,
  isLoadData?: boolean,
}
function SearchableSyncSelectField({ setValue, isEditRecord, isLoadData, data: recordData, disabled, onFinishLoading, value, field, formCheck, isMutable }: SearchableSyncSelectFieldProps) {
  const [isTouch, setIsTouch] = useState(false);
  const { data, isLoading } = useGlobalData({
    dataSourceName: field.dataSource?.name ?? '',
    enabled: true,
  });


  useEffect(() => {
    if (onFinishLoading && !isLoading && !!data) {
      onFinishLoading();
    }
  }, [isLoading]);


  useEffect(() => {
    if (!!field.required) {
      giveRequiredMessage();
    }
  }, [])

  function giveRequiredMessage() {
    if (!!field.required) {
      setValue({ value: isMutable ? [] : "", name: field.propertyName ?? '', error: `${field.label} is required` });
    } else {
      setValue({ value: isMutable ? [] : "", name: field.propertyName ?? '', error: "" });

    }

  }

  useEffect(() => {
    if (formCheck) {
      setIsTouch(true)
    }
  }, [formCheck]);

  const handelOnChange = (e: any, selectedData: any) => {
    setIsTouch(true);
    if (isMutable && field.required) {
      if (!(!!value?.value)) {
        // not valid data return error message  
        giveRequiredMessage();
        return;
      }
      var ids = selectedData.map((item: any) => item?.id);
      setValue({ name: field.propertyName ?? "", value: ids });
      return;
    } else {
      if (field.required && !(!!selectedData)) {
        giveRequiredMessage();
        return;
      } else {
        setValue({ name: field.propertyName ?? "", value: selectedData?.id });
      }
    }
  }
  const getData = useMemo(() => {
    if (!!data?.data) {
      return data.data as [];
    }
    if (!!data) {
      return data as [];
    }
    return [];
  }, [
    data
  ])

  const defaultValue = useMemo(() => {
    // console.log(!!data && !!recordData && !isLoading);
    
    if (!!data && !!recordData   && !isLoading) {
      let _default = getData?.filter((item: any) => item.id == getPropertyFromObjectSafe(recordData, field?.propertyName ?? ''))
      if (_default.length > 0) {
        return _default[0];
      }
    }
    return undefined;
  }, [recordData, isLoading,  data])

  
  const isLoadingData = useMemo(() => {
    const statusLoading = isLoading || isLoadData;     
    if (!!field?.required && isEditRecord) {
      return statusLoading || !(!!defaultValue);
    }
    
    return statusLoading;
  }, [isLoading, isLoadData, defaultValue])
 
 
  return (
    <>
      {
        isLoadingData ?
          <FormControl fullWidth>
            <InputLabel id={`select-label-${field.id}`}>{field.label + " is loading.."}  </InputLabel>
            <Skeleton variant='rectangular' width='100%' height={58} sx={{ borderRadius: 1, bgcolor: 'grey.extraLight' }} />
          </FormControl>
          : <Autocomplete
            fullWidth
            disabled={disabled}
            multiple={isMutable}
            options={getData}
            // inputValue={getInputVal()}
            defaultValue={defaultValue}
            // inputValue={defaultValue ? (getPropertyFromObjectSafe(defaultValue, field.dataSource?.keyFieldName ?? 'name') ?? '') : ""          }
            getOptionLabel={(option) => getPropertyFromObjectSafe(option, field.dataSource?.keyFieldName ?? 'name')}
            isOptionEqualToValue={(option: any, value: any) => {
              return option.id == value.id;
            }}
            onChange={handelOnChange}
            renderInput={(params) => (

              <TextField
                {...params}
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

export default SearchableSyncSelectField
