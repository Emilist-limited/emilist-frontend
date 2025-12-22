import { useState } from "react";

import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useBlacklistBusiness = () => {
  const { showToast } = useToast();

  const [load, setLoad] = useState(false);

  const handleBlacklistBuisness = async (businessId: string) => {
    setLoad(true);
    try {
      await axiosInstance.patch(`/business/mute-business/${businessId}`);
      showToast({
        message: "Business  blacklisted",
        type: "success",
      });
      window.history.back();
    } catch (error) {
      console.log("error blacklisting business", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoad(false);
    }
  };
  return {
    load,
    handleBlacklistBuisness,
  };
};
