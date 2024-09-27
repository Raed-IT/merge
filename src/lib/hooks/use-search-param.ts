import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useMangeSearchParams(initialObject: Record<string, string> = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();


  const searchParamObject = useMemo(() => {
    if (!searchParams) {
      return initialObject;
    }

    const params = new URLSearchParams(searchParams.toString());
    const initialObjectFromParams: Record<string, string> = {};

    params.forEach((value, key) => {
      initialObjectFromParams[key] = value;
    });

    return { ...initialObject, ...initialObjectFromParams };
  }, [searchParams]);

  const removeKeyFromSearchParam = (key: string) => {
    const updatedObject = { ...searchParamObject };

    delete updatedObject[key];

    const queryString = new URLSearchParams(updatedObject).toString();

    router.push(`?${queryString}`, undefined);
  };

  const updateSearchParamObject = (newObject: Record<string, string>) => {
    const updatedObject = { ...searchParamObject, ...newObject };
    const queryString = new URLSearchParams(updatedObject).toString();

    router.push(`?${queryString}`, undefined);
  };

  return { searchParamObject, updateSearchParamObject, removeKeyFromSearchParam };
}
