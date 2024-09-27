// import { HeaderActionDto } from "@/lib/data/axios-client";
import { Button, Divider, Drawer, Grid, Typography } from "@mui/material";
import { act, useEffect, useMemo, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from "@mui/system";
import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
import { getFirstErrorFromFrom, getPropertyFromObjectSafe, isValidateDynamicFormFiled } from "@/utils/helper";
import { FieldComponentValue, GlobalDataType } from "@/types";
import SectionComponent from "@/components/sections/section-component";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useGlobePost } from "@/utils/api-global-hook/useGloblePost";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useDataSourcesGETQuery, useModulesGETQuery } from "@/lib/data/axios-client/Query";
type props = {
    // action: HeaderActionDto,
    isEditRecord?: boolean,
    recordData?: GlobalDataType | undefined,
    disabledFields?: boolean,
    formData?: FieldComponentValue[],

}
export default function DrawerActionHeaderTableComponent({ formData, 
    // action,
     disabledFields, recordData, isEditRecord }: props) {

    // const [fromModuleData, setFromModuleData] = useState<FieldComponentValue[]>(formData ?? []);
    // const params = useParams();

    // const recordId = params?.recordId as string | undefined;
    // const queryClient = useQueryClient();

    // const [open, setOpen] = useState(false);
    // const theme = useTheme();
    // const isLg = useMediaQuery(theme.breakpoints.up('md'));
    // const { enqueueSnackbar } = useSnackbar();

    // const { data, isLoading: isLoading } = useGlobalData({
    //     dataSourceName: action?.section?.dataSource?.name ?? '',
    //     enabled: !!action?.section?.dataSource?.name && !isEditRecord,
    // });
    // const getData = useMemo(() => {
    //     if (!isEditRecord) {
    //         return !!data ? data.data as any[] : [];
    //     }
    //     return getPropertyFromObjectSafe(recordData ?? {}, "consignments");
    // }, [data, isEditRecord, recordData]);
    // const moduleId = params?.moduleId as string | '';

    // const { data: moduleData, isLoading: moduleLoading } = useModulesGETQuery(
    //     { id: moduleId },
    //     { enabled: !!moduleId }
    // );
    // const { data: dataSourceData, isLoading: dataSourceLoading } = useDataSourcesGETQuery(
    //     { id: moduleData?.dataSourceId ?? '' },
    //     { enabled: !!moduleData && !!moduleData?.dataSourceId }
    // );
    // const { mutate, isPending } = useGlobePost(`${dataSourceData?.name}/${recordId}` ?? "", "PUT");

    // const setValue = (fieldData: FieldComponentValue) => {

    //     setFromModuleData(prevData => {
    //         // Find the index of the item with the same name
    //         const existingIndex = prevData.findIndex(item => item.name === fieldData.name);

    //         if (existingIndex !== -1) {
    //             // If item exists, replace it
    //             const updatedData = [...prevData];
    //             updatedData[existingIndex] = fieldData;
    //             return updatedData;
    //         } else {
    //             // If item does not exist, add it
    //             return [...prevData, fieldData];
    //         }
    //     });
    // }
    // useEffect(() => {
    //     setDefaultVal()
    // }, [recordData])
    // const setDefaultVal = () => {
    //     if (!!recordData) {
    //         setFromModuleData(Object.keys(recordData).filter((k) => k !== "id").map((field) => {
    //             return {
    //                 error: "",
    //                 name: field,
    //                 value: getPropertyFromObjectSafe(recordData, field)
    //             }
    //         }))
    //         console.log(fromModuleData);

    //     }
    // } 
    // const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(fromModuleData);
    //     // if (isValidateDynamicFormFiled(fromModuleData)) {
    //     //     let data = {};
    //     //     fromModuleData.map(item => {
    //     //         data = { ...data, [item.name]: item.value }
    //     //     })
    //     //     mutate(data, {
    //     //         onSuccess: () => {
    //     //             queryClient.invalidateQueries({
    //     //                 queryKey: [`${dataSourceData?.name}/${recordId}`],
    //     //             });
    //     //             setOpen(false)
    //     //             // enqueueSnackbar(`done update  ${moduleData?.name}  successfully `, { variant: 'success' });
    //     //         },
    //     //         onError: (err: any) => {
    //     //             // enqueueSnackbar(err.message, { variant: 'error' });
    //     //         }
    //     //     })

    //     // } else {
    //     //     enqueueSnackbar(getFirstErrorFromFrom(fromModuleData), { variant: 'error' });
    //     // }

    // }
    return <>
        {/* 
        <Button
            disabled={disabledFields}
            onClick={() => setOpen(true)}
            sx={{ textTransform: "none", minWidth: 80, height: 30, color: "gray.extraDark", fontWeight: 'bold', borderColor: "gray.light" }} variant='outlined'  >
            {action.label}
        </Button>
        <Drawer
            open={open}
            anchor={action.anchor ?? 'right'}
            PaperProps={{
                sx: { width: isLg ? action.width ?? "60%" : "100%" },
            }}
        >
            <Box p={2} component={'form'}
                onSubmit={handleSubmit}
            >
                <Box display={'flex'} sx={{ pb: 2 }} justifyContent={'start'} alignItems={"center"}  >
                    <IconButton onClick={() => { setOpen(false) }}>
                        <CloseIcon />
                    </IconButton>
                    <Typography >  {action.label}</Typography>
                </Box>
                <Divider />
                <Box maxHeight={"83vh"} overflow={'auto'}>
                    <Grid columns={12}>
                        {!!action?.section ?
                            <SectionComponent
                                // onSelectedCellsChange={(cells, filed) => {
                                //     setValue({ name: filed, value: cells, error: "" })
                                //     console.log(formData);

                                // }}
                                setValue={setValue}
                                formData={fromModuleData}
                                formCheck={false}
                                section={action.section}
                             />
                            : null
                        }
                    </Grid>
                </Box>
                <Box py={3} display={'flex'} gap={2} justifyContent={"space-between"} alignItems={"center"}>
                    <Button onClick={() => setOpen(false)} fullWidth > Cancel</Button>
                    <LoadingButton type="submit" loading={isPending} variant="contained" fullWidth> Save</LoadingButton>
                </Box>
            </Box>
        </Drawer>
        */}
    </>;
}