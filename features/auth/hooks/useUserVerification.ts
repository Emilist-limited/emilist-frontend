import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useUserVerification = () => {
  const { showToast } = useToast();
  const [isUserValid, setIsUserValid] = useState<boolean | null>(null);

  const onBlurVerify = async (invite: string) => {
    if (!invite) {
      setIsUserValid(null);
      return;
    }

    try {
      await axiosInstance.get(`/auth/get-specific-user?user=${invite}`);
      setIsUserValid(true);
    } catch (error) {
      setIsUserValid(false);
      promiseErrorFunction(error, showToast);
      console.error("Error verifying user:", error);
    }
  };

  return { isUserValid, onBlurVerify };
};
