"use client";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import HeaderPageModule from "@/components/header-page-module";
import LoadingComponent from "@/components/loading";
import useModuleData from "./hooks/useModuleData";
import { parseFilterFromURL, determineFilterLogic } from "./view-pages/grid-tabel/filterUtile";
import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
import GridTabel from "@/components/data-table";
import { useState } from "react";

const ModulePage = ({ params }: any) => {
  const { dataSourceData, moduleData, sections, isLoad } = useModuleData(params.moduleId);
  const [selectionModel, setSelectionModel] = useState<number[]>([]);
  return (
    <LoadingComponent isLoad={isLoad}>
      <Box>
        <HeaderPageModule
          isLoad={false}
          name={moduleData?.name ?? ''}
          pluralName={moduleData?.pluralName ?? ''}
          selectedItems={selectionModel}
        />
        <GridTabel
          dataSourceData={dataSourceData}
          sections={sections}
          moduleData={moduleData}
          onSelectionChange={setSelectionModel}
        />
      </Box>
    </LoadingComponent>
  );
};


export default ModulePage;
