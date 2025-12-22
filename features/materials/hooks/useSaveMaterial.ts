import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useSaveMaterials = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { showToast } = useToast();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSaveMaterial = async (
    materialId: string,
    onSuccess: () => void
  ) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    try {
      setLoading(true);
      await axiosInstance.get(`/material/like-product/${materialId}`);
      showToast({
        message: `Material saved`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error saving material", error);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    isLiking: isLoading,
    handleSaveMaterial,
  };
};
