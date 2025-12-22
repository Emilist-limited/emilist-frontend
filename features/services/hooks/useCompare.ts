import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { CompareContext } from "@/lib/context/CompareState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";
import { useToast } from "@/lib/hooks/useToast";

export const useCompare = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const { reFetchComparedBusinesses } = useContext(CompareContext);

  const [isComparing, setIsComparing] = useState(false);

  const compare = async (
    serviceId: string,
    reFetchAllBusinesses?: () => void
  ) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    setIsComparing(true);
    try {
      await axiosInstance.patch(`/business/compare-business/${serviceId}`);
      showToast({
        message: "Compare business list updated!",
        type: "success",
        autoClose: false,
      });
      reFetchComparedBusinesses();
      if (reFetchAllBusinesses) reFetchAllBusinesses();
    } catch (error) {
      console.log("error adding business to compare", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsComparing(false);
    }
  };

  return {
    compare,
    isComparing,
  };
};
