import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useRequestQuote = () => {
  const { showToast } = useToast();
  const [requestLoading, setRequestLoading] = useState(false);

  const requestQuote = async (jobId: string, onSuccess: () => void) => {
    setRequestLoading(true);
    try {
      await axiosInstance.patch(`/jobs/request-for-quote/${jobId}`);
      showToast({
        message: "Quote requested successfully",
        type: "success",
        duration: 8000,
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.log("error requesting for quote", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setRequestLoading(false);
    }
  };

  return {
    requestQuote,
    requestLoading,
  };
};
