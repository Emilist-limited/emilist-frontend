import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useUnlikeBusiness = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { showToast } = useToast();

  const [isLoad, setIsLoading] = useState<boolean>(false);

  const handleUnlikeBusiness = async (
    businessId: string,
    reFetchAllBusiness: () => void
  ) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    try {
      setIsLoading(true);
      await axiosInstance.patch(`/business/unlike-business/${businessId}`);
      if (reFetchAllBusiness) reFetchAllBusiness();
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log("error unsaving job", error);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    isLoad,
    handleUnlikeBusiness,
  };
};
