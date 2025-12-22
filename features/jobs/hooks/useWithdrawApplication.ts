import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useWithdrawApplication = () => {
  const { showToast } = useToast();

  const [isWithdrawing, setIsWithdawing] = useState<boolean>(false);

  const handleWithdrawJobApplication = async (
    applicationId: string,
    onSuccess: () => void
  ) => {
    setIsWithdawing(true);
    try {
      await axiosInstance.delete(
        `/jobs/withdraw-job-application/${applicationId}`
      );
      showToast({
        message: "Application withdrawn successfully",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("error withdrawing regular job application", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsWithdawing(false);
    }
  };

  return {
    isWithdrawing,
    handleWithdrawJobApplication,
  };
};
