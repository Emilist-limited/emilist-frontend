"use client";

import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { FormInput } from "../FormInput";
import { PasswordInput } from "../PasswordInput";

import AcceptTermsOfUse from "../AcceptTermsOfUse";
import CustomButton from "@/components/atoms/CustomButton";

const SignUpForm = () => {
  const {
    loading,
    inputType,
    handleChange,
    handleInputType,
    checkAllFieldsFilled,
    handleSignUp,
    registerDetails,
  } = useSignUp();

  const isAllInputFilled = checkAllFieldsFilled(registerDetails);

  return (
    <form
      className="w-full flex flex-col gap-3 text-gray-600"
      onSubmit={handleSignUp}
    >
      <AcceptTermsOfUse />
      <FormInput
        id="userName"
        label="Enter Username"
        type="text"
        name="userName"
        value={registerDetails.userName}
        onChange={handleChange}
        placeholder="Enter your user name"
      />
      <FormInput
        id="email"
        label="Enter Email"
        type="email"
        name="email"
        value={registerDetails.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <PasswordInput
        id="password"
        label="Enter Password"
        name="password"
        value={registerDetails.password}
        onChange={handleChange}
        inputType={inputType}
        toggleInputType={handleInputType}
        placeholder="Enter your password"
      />
      <CustomButton
        type="submit"
        loading={loading}
        isAllInputFilled={isAllInputFilled}
        className="w-full"
      >
        Sign Up
      </CustomButton>
    </form>
  );
};

export default SignUpForm;
