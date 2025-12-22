import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useAcceptDirectJob = () => {
  const { showToast } = useToast();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAcceptDirectJob = async (
    onSuccess: () => void,
    applicationId: string,
    status: string,
    businessId?: string
  ) => {
    setIsAccepting(true);
    try {
      const payload: Record<string, any> = { status };
      if (status === "accepted" && businessId) {
        payload.businessId = businessId;
      }
      await axiosInstance.patch(
        `/jobs/accept-direct-job/${applicationId}`,
        payload
      );

      if (status === "accepted") {
        showToast({
          message: "Job accepted.",
          type: "success",
        });
      } else {
        showToast({
          message: "Job declined.",
          type: "success",
        });
      }
      onSuccess();
    } catch (error) {
      console.log("error accepting direct job", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsAccepting(false);
    }
  };
  return {
    handleAcceptDirectJob,
    isAccepting,
  };
};
