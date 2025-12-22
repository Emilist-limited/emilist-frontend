import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useLikeBusiness = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleLikeBusiness = async (
    businessId: string,
    reFetchAllBusiness: () => void
  ) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    try {
      setLoading(true);
      await axiosInstance.patch(`/business/like-business/${businessId}`);
      if (reFetchAllBusiness) reFetchAllBusiness();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error saving job", error);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    isLoading,
    handleLikeBusiness,
  };
};
