import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useResendOtp = () => {
  const { showToast } = useToast();

  const [load, setLoad] = useState(false);

  const handleResendOtp = async (email: string) => {
    if (!email) {
      showToast({
        message: "No email! contact support",
        type: "error",
        duration: 8000,
        autoClose: true,
      });
      return;
    }

    setLoad(true);
    try {
      await axiosInstance.post(`/auth/resend-otp`, { email });
      showToast({
        message: "OTP has been resent!",
        type: "success",
        duration: 8000,
        autoClose: true,
      });
    } catch (error: any) {
      console.log("error resending otp", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoad(false);
    }
  };
  return {
    handleResendOtp,
    load,
  };
};
