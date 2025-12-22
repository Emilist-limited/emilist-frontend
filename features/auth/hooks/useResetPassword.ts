import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { ResetPasswordType } from "../types";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";
import { checkAllFieldsFilled } from "@/lib/helpers/checkAllFieldsFilled";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useResetPassword = () => {
  const router = useRouter();

  const { showToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [resetPasswordDetails, setResetPasswordDetails] =
    useState<ResetPasswordType>({
      otp: "",
      newPassword: "",
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetPasswordDetails({
      ...resetPasswordDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string
  ) => {
    e.preventDefault();
    if (!email) {
      showToast({
        message: "Please provide email!",
        type: "error",
      });
      router.push(ROUTES?.FORGOT_PASSWORD);
      return;
    }

    if (!checkAllFieldsFilled(resetPasswordDetails)) {
      return showToast({
        message: "Please enter OTP & new password",
        type: "error",
      });
    } else if (resetPasswordDetails.newPassword?.length < 6) {
      return showToast({
        message: "Password can't be less than 6",
        type: "error",
      });
    }
    setLoading(true);
    try {
      const { otp, newPassword } = resetPasswordDetails;
      const resetPasswordPayload = {
        otp,
        email,
        newPassword,
      };

      await axiosInstance.post(`/auth/reset-password`, resetPasswordPayload);
      showToast({
        message: `Password reset successfully`,
        type: "success",
        duration: 8000,
      });
      setResetPasswordDetails({
        otp: "",
        newPassword: "",
      });
      router.push(ROUTES?.LOGIN);
    } catch (error: any) {
      console.log("error resetting password", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleResetPassword,
    resetPasswordDetails,
    loading,
    setInputType,
    inputType,
    checkAllFieldsFilled,
  };
};
