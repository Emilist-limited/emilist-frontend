"use client";

import Link from "next/link";

import { FormInput } from "../FormInput";
import { hasLetter } from "@/lib/helpers";
import { ROUTES } from "@/lib/constants/routes";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

import CustomButton from "@/components/atoms/CustomButton";

const ForgotPasswordForm = () => {
  const { loading, setEmail, email, handleForgotPassword } =
    useForgotPassword();

  const isAllInputFilled = hasLetter(email);

  return (
    <form
      className="w-full flex flex-col gap-3 text-gray-600"
      onSubmit={handleForgotPassword}
    >
      <FormInput
        id="email"
        label="Enter Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div className="flex justify-end max-sm:text-sm">
        Remember password?
        <Link href={ROUTES?.LOGIN} className="text-primary-green pl-1">
          {" "}
          Login
        </Link>
      </div>
      <CustomButton
        type="submit"
        loading={loading}
        isAllInputFilled={isAllInputFilled}
        className="w-full"
      >
        Submit
      </CustomButton>
    </form>
  );
};

export default ForgotPasswordForm;
