"use client"
import { useGetInfinityData } from "@/lib/hooks/use-get-infinity-data";
import useModuleData from "./apps/[appId]/modules/[moduleId]/hooks/useModuleData";
import LoadingComponent from "@/components/loading";
import { pages } from "next/dist/build/templates/app-page";
import { Button } from "@mui/base";
import { LoadingButton } from "@mui/lab";

export default function Text() {
    const { dataSourceData, isLoad } = useModuleData("a0a61cd8-14ae-46f2-9954-08dca24c1348");

    // if (isLoad) {
    //     return <>Loading </>;
    // }
    const { data, fetchNextPage, fetchPreviousPage, isFetchingNextPage, isFetchingPreviousPage, hasNextPage, hasPreviousPage } = useGetInfinityData(dataSourceData, "a0a61cd8-14ae-46f2-9954-08dca24c1348");


    return <LoadingComponent isLoad={isLoad} >

        <LoadingButton loading={isFetchingNextPage} disabled={!hasNextPage} onClick={() => fetchNextPage()} > Next </LoadingButton>
        <LoadingButton loading={isFetchingPreviousPage} disabled={!hasPreviousPage} onClick={() => fetchPreviousPage()} > previews </LoadingButton>

    </LoadingComponent>
}