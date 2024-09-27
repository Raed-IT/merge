import { getAxios, getBaseUrl, throwException } from '@/lib/data/axios-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosRequestConfig, AxiosResponse, Method, isAxiosError } from 'axios';

export function useGlobePost<T>(
  type: string,
  method?: string
) {
  const queryClient = useQueryClient();

  console.log();

  return useMutation({
    mutationKey: [type],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [type],
      });
    },
    mutationFn: async (body?: T, config?: AxiosRequestConfig) => {
      return await postData(method ?? "POST", type, body, config,);
    },
  });
}
function postData<T>(
  method: string,
  type: string,
  body?: T,
  config?: AxiosRequestConfig,

): Promise<T> {
  let url_ = getBaseUrl() + `/${type}`;
  url_ = url_.replace(/[?&]$/, "");

  const content_ = JSON.stringify(body);

  let options_: AxiosRequestConfig = {
     headers: {
      "Content-Type": "application/json",
     },
    data: content_,
    url: url_,

  };

  return getAxios().request({
    ...options_, method: method??"PUT",
  }).catch((_error: any) => {
    if (isAxiosError(_error) && _error.response) {
      return _error.response;
    } else {
      throw _error;
    }
  }).then((_response: AxiosResponse) => {
    const status = _response.status;
    const _headers = _response.headers || {};

    if (status === 200) {
      const resultData = _response.data;
      return Promise.resolve(resultData as T);
    } else if (status !== 200 && status !== 204) {
      const _responseText = _response.data;
      return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve(null as any);
  });
}