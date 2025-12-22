import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useDeleteProductImage = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteFetchedProductImage = async (
    materialId: string,
    imageId: string,
    onSuccess: () => void
  ) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(
        `/material/delete-product/${materialId}/image/${imageId}`
      );
      showToast({
        message: "Image deleted successfully",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      console.log("error deleting material image", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleDeleteFetchedProductImage,
    isLoading,
  };
};
