import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";

export const useVerifyEmail = () => {
  const router = useRouter();

  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");

  const handleVerifyEmail = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string
  ) => {
    e.preventDefault();
    if (!email) {
      showToast({
        message: "No email! contact support",
        type: "error",
        duration: 8000,
        autoClose: true,
      });
      return;
    }
    if (!otp) {
      showToast({
        message: "Please enter OTP!",
        type: "error",
        duration: 8000,
        autoClose: true,
      });
      return;
    }
    try {
      setLoading(true);
      const verifyEmailPayload = {
        email,
        otp,
      };
      await axiosInstance.post(`/auth/verify-email`, verifyEmailPayload);
      showToast({
        message: `Email verified successfully`,
        type: "success",
        autoClose: false,
      });
      setOtp("");
      setLoading(false);
      router.push(ROUTES?.LOGIN);
    } catch (error: any) {
      console.log("error verifying email", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleVerifyEmail,
    loading,
    setOtp,
    otp,
  };
};
