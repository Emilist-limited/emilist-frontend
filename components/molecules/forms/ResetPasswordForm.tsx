"use client";

import { VerifyEmailParams } from "@/features/auth/types";
import { FormInput } from "../FormInput";
import { PasswordInput } from "../PasswordInput";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";

import CustomButton from "@/components/atoms/CustomButton";
import DontRememberPassword from "@/components/atoms/DontRememberPassword";

const ResetPasswordForm = ({ email }: VerifyEmailParams) => {
  const {
    handleChange,
    handleResetPassword,
    resetPasswordDetails,
    loading,
    setInputType,
    inputType,
    checkAllFieldsFilled,
  } = useResetPassword();

  const isAllInputFilled = checkAllFieldsFilled(resetPasswordDetails);

  return (
    <form
      className="w-full flex flex-col gap-3 text-gray-600"
      onSubmit={(e) => handleResetPassword(e, email)}
    >
      <FormInput
        id="otp"
        label="Enter OTP"
        type="text"
        name="otp"
        value={resetPasswordDetails.otp}
        onChange={handleChange}
        placeholder="Enter OTP"
      />

      <PasswordInput
        id="newPassword"
        label="Enter New Password"
        name="newPassword"
        value={resetPasswordDetails.newPassword}
        onChange={handleChange}
        inputType={inputType}
        toggleInputType={() =>
          setInputType((prev) => (prev === "password" ? "text" : "password"))
        }
        placeholder="Enter your new password"
      />
      <DontRememberPassword />
      <CustomButton
        type="submit"
        loading={loading}
        isAllInputFilled={isAllInputFilled}
        className="w-full"
      >
        Reset Password
      </CustomButton>
    </form>
  );
};

export default ResetPasswordForm;
