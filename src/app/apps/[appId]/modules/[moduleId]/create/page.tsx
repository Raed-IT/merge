
"use client"
// import SectionsComponent from '@/components/sections';
// import { useDataSourcesGETQuery, useModulesGETQuery } from '@/lib/data/axios-client/Query';
// import { Button, Skeleton } from '@mui/material';
// import { alpha, Box, useTheme } from '@mui/system';
// import { useParams, useRouter } from 'next/navigation';
// import React, { useEffect, useMemo, useState } from 'react'
// import CreateHeaderComponent from './components/header';
// import { getFirstErrorFromFrom, getPropertyFromObjectSafe, isValidateDynamicFormFiled } from '@/utils/helper';
// import { useSnackbar } from 'notistack';
// import { useGlobePost } from '@/utils/api-global-hook/useGloblePost';
// import { LoadingButton } from '@mui/lab';
// import { FieldComponentValue } from '@/types';
// import consignmentSections from "../JsonData/consignments.json";
// import routeSections from "../JsonData/routes.json";
// import vehiclesSections from "../JsonData/vehicles.json";
// import driversSections from "../JsonData/drivers.json";
// import warehousesSections from "../JsonData/Warehouses.json";
// import { HashLoader } from 'react-spinners';
// function CreatePage() {

//     const modulesSections = {
//         "consignment": consignmentSections,
//         "routes": routeSections,
//         "vehicles": vehiclesSections,
//         "drivers": driversSections,
//         "warehouses": warehousesSections,
//     }
//     const [showLoadingPage, setShowLoadingPage] = useState(false);
//     const router = useRouter();
//     const params = useParams()
//     const appId = (params && "appId" in params) ? params.appId as string : null;
//     const theme = useTheme();
//     const [fromModuleData, setFromModuleData] = useState<FieldComponentValue[]>([]);

//     const [formCheck, setFormCheck] = useState(false)
//     const moduleId = params?.moduleId as string | undefined;
//     const { data: moduleData, isLoading: moduleLoading, error: moduleError, isFetched: isFetchedModule } = useModulesGETQuery(
//         { id: moduleId! },
//         { enabled: !!moduleId }
//     );
//     const { data: dataSourceData, isLoading: dataSourceLoading, isFetched: isFetchedDataSource } = useDataSourcesGETQuery(
//         { id: moduleData?.dataSourceId ?? '' },
//         { enabled: !!moduleData && !!moduleData?.dataSourceId }
//     );


//     const { mutate, isPending } = useGlobePost(dataSourceData?.name ?? "");
//     const { enqueueSnackbar } = useSnackbar();
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
//                     router.replace("/apps/" + appId + "/modules/" + moduleId);
//                     enqueueSnackbar(`Done add ${moduleData?.name} success`, { variant: 'success' });
//                 },
//                 onError: (err: Error) => {
//                     enqueueSnackbar(err.message, { variant: 'error' });
//                 }
//             })
//         } else {
//             enqueueSnackbar(getFirstErrorFromFrom(fromModuleData), { variant: 'error' });
//         }

//     }

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


//     // dataSourceLoading moduleLoading
//     const isLoadData = useMemo(() => {
//         return dataSourceLoading || dataSourceLoading || moduleLoading;
//     }, [dataSourceLoading, dataSourceLoading, moduleLoading])
//     useEffect(() => {
//         if (isFetchedModule && isFetchedDataSource) {
//             setShowLoadingPage(false);
//         }
//     }, [isLoadData])
//     return (
//         <Box position={"relative"}>
//             {showLoadingPage ? <Box zIndex={10000}
//                 sx={(theme) => ({ bgcolor: isLoadData ? alpha(theme.palette.divider, 0.5) : alpha(theme.palette.divider, 0), opacity: isLoadData ? 1 : 0, transition: "all 1s" })}
//                 onTransitionEnd={(event) => {
//                     const element = event.currentTarget;
//                     element.style.display = 'none';
//                 }}
//                 position={'absolute'} width={"100%"} height={"90vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
//                 <HashLoader color={theme.palette.primary.main} />
//             </Box> : null}

//             <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="on" autoSave="on" sx={{ mt: 4 }} height={50} display={'flex'} justifyContent={'space-between'} alignItems={"center"} >

//                 <CreateHeaderComponent moduleData={moduleData} moduleLoading={moduleLoading} />

//                 {moduleLoading || dataSourceLoading
//                     ? <Box display={'flex'} gap={2} justifyContent={'center'} alignItems={"center"} height={"100%"}>
//                         <Skeleton width={70} height={40} variant='rounded' />
//                         <Skeleton width={70} height={40} variant='rounded' />
//                     </Box>
//                     : <Box display={'flex'} gap={2} justifyContent={'center'} alignItems={"center"} height={"100%"} >
//                         <LoadingButton loading={isPending} type='submit' variant='contained' sx={{ textTransform: "none", fontWeight: '500' }}   > Save </LoadingButton>
//                         <Button onClick={() => router.back()} sx={{ textTransform: "none", color: "gray.extraDark", fontWeight: 'bold', borderColor: "gray.light" }} variant='outlined'  >Cancel </Button>
//                     </Box>
//                 }
//             </Box>
//             {moduleLoading
//                 ? <div>Loading...</div>
//                 : <SectionsComponent
//                     sections={getPropertyFromObjectSafe(modulesSections, moduleData?.name?.toLowerCase() ?? 'routes')}
//                     // onFinishLoading={ }
//                     formCheck={formCheck}
//                     formData={fromModuleData}
//                     setValue={setValue}
//                 />
//                 // moduleData?.sections?.map((section, index) => (
//                 //     <Grid container xs={12} key={index} >
//                 //         <SectionComponent formCheck={formCheck} formData={fromModuleData} columns={5} key={section.id} section={section} setValue={setValue} />
//                 //     </Grid>
//                 // ))
//             }
//         </Box>
//     )
// }
// export default CreatePage


import FormComponent from '../../../../../../components/helper/form/index';
import { FieldType } from "@/utils/enums/filtd-type-enum";
import SubmitFormButtonComponent from "@/components/helper/form/components/submit-button";
import useModuleData from '../hooks/useModuleData';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Typography } from '@mui/material';
 
const CreatePage = ({ params }: any) => {

    const [submittingStatus, setSubmittingStatus] = useState(false);

    const { isLoad, moduleData } = useModuleData(params.moduleId);
    return <Box position={"relative"}>
        {!isLoad
            ? <Box display={"flex"} justifyContent={"space-between"} alignItems={'center'}  >
                <Typography mx={2} variant='h6'>Create {moduleData?.name}</Typography>
                <SubmitFormButtonComponent disabled={isLoad} isPending={submittingStatus} />
            </Box>
            : null
        } 

        <FormComponent fieldType={FieldType.creatable}     onSubmittingStatusChange={(state) => {
            setSubmittingStatus(state);
        }} />




    </Box>
}

export default CreatePage;