"use client"
// import { alpha, bgcolor, Box, useTheme } from "@mui/system";
// import { useDataSourcesGETQuery, useModulesGETQuery } from "@/lib/data/axios-client/Query";
// import { useParams, useRouter } from "next/navigation";
// import SectionsComponent, { SectionType } from "@/components/sections";
// import { getFirstErrorFromFrom, getPropertyFromObjectSafe, isValidateDynamicFormFiled } from "@/utils/helper";
// import consignmentSections from "../../JsonData/consignments.json";
// import routeSections from "../../JsonData/routes.json";
// import vehiclesSections from "../../JsonData/vehicles.json";
// import driversSections from "../../JsonData/drivers.json";
// import warehousesSections from "../../JsonData/Warehouses.json";

// import { useEffect, useMemo, useState } from "react";
// import { FieldComponentValue } from "@/types";
// import { Button, CircularProgress } from "@mui/material";
// import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
// import { HashLoader } from "react-spinners";
// import { useGlobePost } from "@/utils/api-global-hook/useGloblePost";
// import { useQueryClient } from "@tanstack/react-query";
// import { useSnackbar } from "notistack";
// import { LoadingButton } from "@mui/lab";
// import { FieldType } from "@/utils/enums/filtd-type-enum";
// import { getFieldsFromModuleByType } from "@/utils/table/data-teable";
// function ShowModule() {
//     const [isEditRecord, setIsEditRecord] = useState(false);
//     const theme = useTheme();
//     const  modulesSections =  {
//         "consignment": consignmentSections,
//         "routes": routeSections,
//         "vehicles": vehiclesSections,
//         "drivers": driversSections,
//         "warehouses":warehousesSections ,
//     }
//     const [sections,setModuleSections]=useState([]);
//     const { enqueueSnackbar } = useSnackbar();

//     const queryClient = useQueryClient();
//     const [formCheck, setFormCheck] = useState(false)
//     const [fromModuleData, setFromModuleData] = useState<FieldComponentValue[]>([]);
//     const params = useParams();

//     const recordId = params?.recordId as string | undefined;

//     const setValue = (fieldData: FieldComponentValue) => {

//         setFromModuleData(prevData => {
//             // Find the index of the item with the same name
//             const existingIndex = prevData.findIndex(item => item.name === fieldData.name);

//             if (existingIndex !== -1) {
//                 // If item exists, replace it
//                 const updatedData = [...prevData];
//                 updatedData[existingIndex] = fieldData;
//                 return updatedData;
//             } else {
//                 // If item does not exist, add it
//                 return [...prevData, fieldData];
//             }
//         });
//     }

//     const moduleId = params?.moduleId as string | '';

//     const { data: moduleData, isLoading: moduleLoading } = useModulesGETQuery(
//         { id: moduleId },
//         { enabled: !!moduleId }
//     );
//     useEffect(()=>{
//         setModuleSections(getPropertyFromObjectSafe(modulesSections, moduleData?.name?.toLowerCase() ?? 'routes'));
//     },[moduleLoading])

//     //get data  source 
//     const { data: dataSourceData, isLoading: dataSourceLoading } = useDataSourcesGETQuery(
//         { id: moduleData?.dataSourceId ?? '' },
//         { enabled: !!moduleData && !!moduleData?.dataSourceId }
//     );
//     const { data, isLoading ,isFetched,error} = useGlobalData({ dataSourceName: `${dataSourceData?.name}/${recordId}`, enabled: !!dataSourceData?.name && !!recordId });

//     useEffect(()=>{
//       if (error){
//         enqueueSnackbar(`Error : ${error}`,{ variant: 'error' })
//       }
//     },[error])
//     const setDefaultVal = () => {
//         if (!!data && !!moduleData) {
//             // setFromModuleData(Object.keys(data).filter((k) => k !== "id").map((field) => {
//             console.log(getFieldsFromModuleByType({module:moduleData,fieldType:FieldType.creatable}));

//             setFromModuleData( getFieldsFromModuleByType({module:moduleData,fieldType:FieldType.creatable}).map((field) => {
//                 return {
//                     error: "",
//                     name: field,
//                     value: getPropertyFromObjectSafe(data, field)
//                 }
//             }))
//             console.log(fromModuleData);

//         }
//     }



//     const isLoadData = useMemo(() => {

//         return isLoading || dataSourceLoading || moduleLoading;
//     }, [isLoading, dataSourceLoading, moduleLoading])

//     useEffect(() => {
//         setDefaultVal();
//     }, [isLoading]);
//     const { mutate, isPending } = useGlobePost(`${dataSourceData?.name}/${recordId}` ?? "", "PUT");
//     const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setFormCheck(true);
//         if (isValidateDynamicFormFiled(fromModuleData)) {
//             let data = {};
//             fromModuleData.map(item => {
//                 data = { ...data, [item.name]: item.value }
//             })
//             mutate(data, {
//                 onSuccess: () => {
//                     queryClient.invalidateQueries({
//                         queryKey: [`${dataSourceData?.name}`],
//                     });
//                     enqueueSnackbar(`done update  ${moduleData?.name}  successfully `, { variant: 'success' });
//                 },
//                 onError: (err: any) => {
//                     enqueueSnackbar(err.message, { variant: 'error' });
//                 }
//             })

//         } else {
//             enqueueSnackbar(getFirstErrorFromFrom(fromModuleData), { variant: 'error' });
//         }

//     }

//     return <Box position={"relative"}
//         onSubmit={handleSubmit}
//         component={'form'}
//     >
//      {isLoadData?   <Box zIndex={10000}
//             sx={(theme) => ({ bgcolor: isLoadData ? alpha(theme.palette.divider, 0.5) : alpha(theme.palette.divider, 0), opacity: isLoadData ? 1 : 0, transition: "all 1s" })}
//             onTransitionEnd={(event) => {
//                 const element = event.currentTarget;
//                 element.style.display = 'none';
//             }}
//             position={'absolute'} width={"100%"} height={"90vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
//             <HashLoader color={theme.palette.primary.main} />
//         </Box>:null
// }
//         {isLoadData
//             ? null
//             : <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
//                 <Box>Show Record</Box>
//                 {
//                     !isEditRecord
//                         ? <Button onClick={() => setIsEditRecord(true)} sx={{ textTransform: "none", width: 80, color: "gray.extraDark", fontWeight: 'bold', borderColor: "gray.light" }} variant='outlined'  >
//                             Edit </Button>
//                         : <Box display={"flex"} gap={1} justifyItems={"start"} alignItems={'start'} >
//                             <LoadingButton
//                                 loading={isPending}
//                                 type='submit'
//                                 variant='contained'
//                                 sx={{ textTransform: "none", width: 80, }}
//                             >
//                                 Save
//                             </LoadingButton>
//                             <Button onClick={() => setIsEditRecord(false)} sx={{ textTransform: "none", width: 80, color: "gray.extraDark", fontWeight: 'bold', borderColor: "gray.light" }} variant='outlined'  >
//                                 Cancel </Button>
//                         </Box>
//                 }

//             </Box>
//         }

//         <SectionsComponent
//             isLoadData={isLoadData}
//             isEditRecord={true}
//             data={data}
//             sectionsType={SectionType.editable}
//             sections={sections}
//             formCheck={formCheck}
//             disabledFields={!isEditRecord}
//             formData={fromModuleData}
//             setValue={setValue}
//         />

//     </Box>;
// }
// export default ShowModule;


import FormComponent from "../../../../../../../components/helper/form/index"
import { FieldType } from "@/utils/enums/filtd-type-enum";
import SubmitFormButtonComponent from "@/components/helper/form/components/submit-button";
import { Box } from '@mui/system';
import { useState } from 'react';
import { Typography } from '@mui/material';
import useModuleData from "../../hooks/useModuleData";
import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";

const ShowModule = ({ params }: any) => {
    
    const [submittingStatus, setSubmittingStatus] = useState(false);

    const { moduleData, dataSourceData, isLoad} = useModuleData(params.moduleId);

    const { data: recordData, isLoading: isLoadRecordData, } = useGlobalData({
        dataSourceName: `${dataSourceData?.name}/${params.recordId}`,
        enabled: !!dataSourceData?.name && !!params.recordId
    });


    return <Box position={"relative"}>
        {!isLoad
            ? <Box display={"flex"} justifyContent={"space-between"} alignItems={'center'}  >
                <Typography mx={2} variant='h6'> {recordData?.['name']}</Typography>
                <SubmitFormButtonComponent disabled={isLoad} isPending={submittingStatus} />
            </Box>
            : null
        }

        <FormComponent
            mutateMethod="PUT"
            mutateDataSource={`${dataSourceData?.name}/${recordData?.id}`}
            isLoadRecordData={isLoadRecordData}
            isShowRecord recordData={recordData}
            fieldType={FieldType.editable}
            isLoad={isLoad || isLoadRecordData}
            onSubmittingStatusChange={(state) => {
                setSubmittingStatus(state);
            }}
        />
    </Box>
}

export default ShowModule;