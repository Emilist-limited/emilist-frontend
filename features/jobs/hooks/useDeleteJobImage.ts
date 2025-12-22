import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useDeleteJobImage = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteFetchedJobImage = async (
    jobId: string,
    imageId: string,
    onSuccess: () => void
  ) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/jobs/remove-job/${jobId}/file/${imageId}`);
      showToast({ message: "Image deleted", type: "success" });
      onSuccess();
    } catch (error) {
      console.log("error deleting job image", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDeleteFetchedJobImage,
    isLoading,
  };
};
