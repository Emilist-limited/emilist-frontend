import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useUpdateApplicationStatus = () => {
  const { showToast } = useToast();

  const [loadingAccept, setLoadingAceept] = useState(false);
  const [isApplicationInfoOpen, setIsApplicationInfoOpne] = useState(false);

  const onToggleApplicationInfo = () => {
    setIsApplicationInfoOpne((prev) => !prev);
  };

  const updateApplicationStatus = async (
    applicationId: string,
    status: string,
    onSuccess: () => void
  ) => {
    setLoadingAceept(true);
    try {
      const acceptDetails = {
        status,
      };

      await axiosInstance.patch(
        `/jobs/update-application-status/${applicationId}`,
        acceptDetails
      );
      showToast({
        message: `Successful!`,
        type: "success",
        duration: 8000,
      });
      setIsApplicationInfoOpne(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.log("error accepting regular job application", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoadingAceept(false);
    }
  };
  return {
    updateApplicationStatus,
    loadingAccept,
    isApplicationInfoOpen,
    onToggleApplicationInfo,
  };
};
