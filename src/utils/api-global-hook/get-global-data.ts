import { getAxios, getBaseUrl, throwException } from "@/lib/data/axios-client";
import { isAxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as Types from "../../lib/data/axios-client";

export async function getData(
  dataSourceName: string,
  pageNumber?: number,
  pageSize?: number,
  totalCount?: number,
  sort_SortBy?: string,
  sort_Ascending?: boolean,
  filter_Logic?: Types.LogicalOperator,
  filter_Conditions?: Types.FilterCondition[],
  filter_Groups?: Types.FilterGroup[],
  config?: AxiosRequestConfig
): Promise<AxiosResponse> {
  let url_ = getBaseUrl() + `/${dataSourceName}?`;
  console.log(dataSourceName);

  if (pageNumber !== undefined)
    url_ += `pageNumber=${encodeURIComponent(pageNumber.toString())}&`;
  if (pageSize !== undefined)
    url_ += `pageSize=${encodeURIComponent(pageSize.toString())}&`;
  if (totalCount !== undefined)
    url_ += `TotalCount=${encodeURIComponent(totalCount.toString())}&`;
  if (sort_SortBy !== undefined)
    url_ += `Sort.SortBy=${encodeURIComponent(sort_SortBy)}&`;
  if (sort_Ascending !== undefined)
    url_ += `Sort.Ascending=${encodeURIComponent(sort_Ascending.toString())}&`;
  if (filter_Logic !== undefined)
    url_ += `Filter.Logic=${encodeURIComponent(filter_Logic)}&`;
  if (filter_Conditions) {
    filter_Conditions.forEach((item, index) => {
      for (const attr in item) {
        if (
          item.hasOwnProperty(attr) &&
          item[attr as keyof typeof item] !== undefined
        ) {
          url_ += `Filter.Conditions[${index}].${attr}=${encodeURIComponent(
            item[attr as keyof typeof item] as string | number | boolean
          )}&`;
        }
      }
    });
  }
  if (filter_Groups) {
    filter_Groups.forEach((item, index) => {
      for (const attr in item) {
        if (
          item.hasOwnProperty(attr) &&
          item[attr as keyof typeof item] !== undefined
        ) {
          const value = item[attr as keyof typeof item];
          if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
          ) {
            url_ += `Filter.Groups[${index}].${attr}=${encodeURIComponent(
              value
            )}&`;
          }
        }
      }
    });
  }

  url_ = url_.replace(/[?&]$/, "");
  console.log(url_);

  const options_: AxiosRequestConfig = {
    ...config,
    method: "GET",
    url: url_,
    headers: {
      ...config?.headers,
      Accept: "application/json",
    },
  };

  return getAxios()
    .request(options_)
    .catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    })
    .then((_response: AxiosResponse) => processGET(_response));
}

function processGET(response: AxiosResponse): Promise<AxiosResponse> {
  const status = response.status;
  const headers: Record<string, any> = {};
  if (response.headers && typeof response.headers === "object") {
    for (const k in response.headers) {
      if (response.headers.hasOwnProperty(k)) {
        headers[k] = response.headers[k];
      }
    }
  }
  if (status === 200) {
    const responseData = response.data;
     console.log( responseData); 
    return Promise.resolve(responseData);
  } else if (status !== 200 && status !== 204) {
    const responseData = response.data;
    return throwException(
      "An unexpected server error occurred.",
      status,
      responseData,
      headers
    );
  }
  return Promise.resolve(null as any);
}
