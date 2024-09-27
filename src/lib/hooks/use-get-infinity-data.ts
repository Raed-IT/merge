import { getData } from "@/utils/api-global-hook/get-global-data";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMangeSearchParams } from "./use-search-param";
import { DataSourceDto } from "../data/axios-client";

export function useGetInfinityData(
  dataSourceData: DataSourceDto | undefined,
  moduleId?: string
) {
  const { searchParamObject, updateSearchParamObject } = useMangeSearchParams();




  // UseInfiniteQuery with pagination
  const {
    data,
    isLoading,
    fetchNextPage,
    hasPreviousPage,
    hasNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "moduleData",
      moduleId ?? dataSourceData?.name,
      searchParamObject.page ?? 1,
      searchParamObject.pageSize ?? 10,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      console.log(pageParam);

      const response = await getData(
        dataSourceData?.name ?? "",
        pageParam,
        Number(searchParamObject?.pageSize ?? "10")
      );
      return response;
    },
    initialPageParam: 1,

    // Logic for fetching the next page
    getNextPageParam: (lastPage: any) => {
      const { pageNumber, pageSize, totalCount } = lastPage.queryPayload;
      const hasNextPage = pageSize * pageNumber < totalCount;
      if (hasNextPage) {
        return pageNumber + 1;
      }
      return undefined;
    },

    getPreviousPageParam: (firstPage: any) => {

    },

    enabled: !!dataSourceData?.name,
  });

  const handleNextPage = () => {
    fetchNextPage();
  };

  const handlePreviousPage = () => {
    fetchPreviousPage().then(() => {
      updateSearchParamObject({ page: `${Number(searchParamObject.page) - 1}` });

    });
  };

  return {
    data,
    isLoading,
    fetchNextPage: handleNextPage,
    fetchPreviousPage: handlePreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage
  };
}
