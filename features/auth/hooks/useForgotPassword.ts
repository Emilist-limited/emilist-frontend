import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";

export const useForgotPassword = () => {
  const router = useRouter();

  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast({
        message: "Please provide email!",
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post(`/auth/forgot-password`, { email });
      showToast({
        message: "OTP has been sent to your email",
        type: "success",
      });
      router.push(ROUTES?.RESET_PASSWORD(email));
    } catch (error) {
      console.log("error from forgot password", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    setEmail,
    email,
    handleForgotPassword,
  };
};
