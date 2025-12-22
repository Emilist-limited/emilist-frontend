import { useContext, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "@/lib/context/AuthState";
import { getServiceInfo } from "../api";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useGetServiceInfo = (businessId: string) => {
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["business info", businessId, userId],
    queryFn: () => getServiceInfo({ businessId, userId }),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      console.log("error getting service info", error);
      promiseErrorFunction(error, showToast);
    }
  }, [error, isError]);

  return {
    loading: isLoading,
    refetchServiceInfo: refetch,
    serviceInfo: data,
    isError,
    error,
  };
};
