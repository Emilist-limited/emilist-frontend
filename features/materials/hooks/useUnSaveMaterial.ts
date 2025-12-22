import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";
import { useToast } from "@/lib/hooks/useToast";

export const useUnsaveMaterial = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const [issLoading, setIsLoading] = useState<boolean>(false);

  const handleUnsaveMaterial = async (
    materialId: string,
    onSuccess: () => void
  ) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    try {
      setIsLoading(true);
      await axiosInstance.get(`/material/unlike-product/${materialId}`);
      showToast({
        message: `Material removed from saved.`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log("error unsaving material", error);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    isUnliking: issLoading,
    handleUnsaveMaterial,
  };
};
