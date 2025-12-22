"use client";

import { FormInput } from "../FormInput";
import { PasswordInput } from "../PasswordInput";
import { useLogin } from "@/features/auth/hooks/useLogin";

import CustomButton from "@/components/atoms/CustomButton";
import DontRememberPassword from "@/components/atoms/DontRememberPassword";

export const LoginForm = () => {
  const {
    handleLogin,
    formData,
    loading,
    inputType,
    handleChange,
    handleInputType,
    checkAllFieldsFilled,
  } = useLogin();
  const isAllInputFilled = checkAllFieldsFilled(formData);

  return (
    <form
      className="w-full flex flex-col gap-3 text-gray-600"
      onSubmit={handleLogin}
    >
      <FormInput
        id="email"
        label="Enter Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Enter your email"
      />
      <div className="w-full">
        <PasswordInput
          id="password"
          label="Enter Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          inputType={inputType}
          toggleInputType={handleInputType}
          placeholder="Enter your password"
        />
        <DontRememberPassword />
      </div>
      <CustomButton
        type="submit"
        loading={loading}
        isAllInputFilled={isAllInputFilled}
        className="w-full"
      >
        Login
      </CustomButton>
    </form>
  );
};
