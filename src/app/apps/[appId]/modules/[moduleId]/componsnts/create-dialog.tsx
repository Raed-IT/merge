// import SectionsComponent from "@/components/sections";
// import { useDataSourcesGETQuery, useModulesGETQuery, useUpdateStatus2Mutation, useUpdateStatusMutation } from "@/lib/data/axios-client/Query";
// import { FieldComponentValue } from "@/types";
// import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
// import { useGlobePost } from "@/utils/api-global-hook/useGloblePost";
// import { getFirstErrorFromFrom, isValidateDynamicFormFiled } from "@/utils/helper";
// import { LoadingButton } from "@mui/lab";
// import { Button, Grid, Modal, Skeleton, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import { useQueryClient } from "@tanstack/react-query";
// import { useParams, useRouter } from "next/navigation";
// import { useSnackbar } from "notistack";
// import { useEffect, useState } from "react";

// function CreateModuleDialog({isOpen}:{isOpen:boolean}) {
//     const [open, setOpen] = useState(isOpen);
//     const [formCheck, setFormCheck] = useState(false);
//     const [fromModuleData, setFromModuleData] = useState<FieldComponentValue[]>([])
//     const params = useParams()
//     const router = useRouter();
//     const queryClient = useQueryClient();
//     const { enqueueSnackbar } = useSnackbar();
//     const moduleId = params?.moduleId as string | undefined;
//     const recordId = params?.recordId as string | undefined;

//      const handleClose = () => setOpen(false);
//     // get module data
//     const { data: moduleData, isLoading: moduleLoading, error: moduleError } = useModulesGETQuery(
//         { id: moduleId! },
//         { enabled: !!moduleId }
//     );

//     //get data  source 
//     const { data: dataSourceData, isLoading: dataSourceLoading } = useDataSourcesGETQuery(
//         { id: moduleData?.dataSourceId ?? '' },
//         { enabled: !!moduleData && !!moduleData?.dataSourceId }
//     );
//     // get record data from api and set it as default value
//     const { data, isLoading } = useGlobalData({ dataSourceName: `${dataSourceData?.name}/${recordId}`, enabled: !!dataSourceData?.name && !!recordId });
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
//                     setOpen(false);
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

//     useEffect(() => {
//         if (!!data) {
//             setFromModuleData(Object.keys(data).filter((k) => k !== "id").map((field) => {
//                 return {
//                     error: "",
//                     name: field,
//                     value: data[field]
//                 }
//             }))
//         }
//     }, [isLoading, dataSourceLoading, moduleLoading]);


//     return <>
//          <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box
//                 onSubmit={handleSubmit}
//                 component={'form'}
//                 sx={{
//                     position: 'absolute' as 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     borderRadius: 1.1,
//                     transform: 'translate(-50%, -50%)',
//                     maxWidth: 500,
//                     minWidth: 300,
//                     bgcolor: 'background.paper',
//                     boxShadow: 2,
//                     p: 2,
//                 }}  >
//                 <Typography id="modal-modal-title" variant="h6" component="h2">
//                     Edit {moduleData?.name}
//                 </Typography>
//                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                     {moduleLoading || dataSourceLoading
//                         ? <div>Loading...</div>
//                         : moduleData?.sections?.map((section, index) => (
//                             <Box key={ index} sx={{ width: '100%' }}>
//                                 <SectionsComponent formCheck={formCheck} formData={fromModuleData}  key={section.id} section={section} setValue={(fieldData) => {
//                                     setFromModuleData(prevData => {
//                                         const existingIndex = prevData.findIndex(item => item.name === fieldData.name);
//                                         if (existingIndex !== -1) {
//                                             const updatedData = [...prevData];
//                                             updatedData[existingIndex] = fieldData;
//                                             return updatedData;
//                                         } else {
//                                             return [...prevData, fieldData];
//                                         }
//                                     });

//                                 }} />

//                             </Box>
//                         ))}
//                 </Typography>
//                 {moduleLoading || dataSourceLoading
//                     ? <Box px={3} display={'flex'} gap={2} justifyContent={'start'} alignItems={"center"} height={"100%"} width={"100%"}>
//                         <Skeleton width={70} height={35} variant='rounded' />
//                         <Skeleton width={70} height={35} variant='rounded' />
//                     </Box>
//                     : <Box px={3} display={'flex'} gap={2} justifyContent={'start'} alignItems={"center"} height={"100%"} width={"100%"} >
//                         <LoadingButton loading={isPending} type='submit' variant='contained' sx={{ textTransform: "none", fontWeight: '500' }}   > Save </LoadingButton>
//                         <Button onClick={handleClose} sx={{ textTransform: "none", color: "gray.extraDark", fontWeight: 'bold', borderColor: "gray.light" }} variant='outlined'  >Cancel </Button>
//                     </Box>
//                 }
//             </Box>
//         </Modal>
//     </>
// }

// export default CreateModuleDialog;