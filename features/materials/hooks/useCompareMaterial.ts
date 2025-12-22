import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { CompareMaterialContext } from "@/lib/context/CompareMaterialState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";
import { useToast } from "@/lib/hooks/useToast";

export const useCompareMaterial = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const { reFetchComparedMaterials } = useContext(CompareMaterialContext);

  const [isComparing, setIsComparing] = useState(false);

  const compareMaterial = async (
    materialId: string,
    onSuccess?: () => void
  ) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    setIsComparing(true);
    try {
      await axiosInstance.patch(`/material/compare-product/${materialId}`);
      showToast({
        message: "Compare material list updated!",
        type: "success",
        autoClose: false,
      });
      reFetchComparedMaterials();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log("error adding business to compare", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsComparing(false);
    }
  };

  return {
    compareMaterial,
    isComparing,
  };
};
