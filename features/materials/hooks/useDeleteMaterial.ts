import { useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useDeleteMaterial = (materialId: string) => {
  const router = useRouter();
  const { showToast } = useToast();

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleDeleteMaterial = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(`/material/delete-product/${materialId}`);
      showToast({
        type: "success",
        message: "Material deleted successfully.",
      });
      router.push(ROUTES?.DASHOBOARD_MY_MATERIALS);
    } catch (error: any) {
      console.log("error deleting material", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsDeleteLoading(false);
    }
    `  `;
  };
  return {
    handleDeleteMaterial,
    isDeleteLoading,
  };
};
