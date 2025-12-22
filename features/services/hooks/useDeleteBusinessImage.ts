import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useDeleteBusinessImage = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteFetchedBusinessImage = async (
    businessId: string,
    imageId: string,
    onSuccess: () => void
  ) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(
        `/business/delete-business/${businessId}/image/${imageId}`
      );
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
    handleDeleteFetchedBusinessImage,
    isLoading,
  };
};
