"use client";

import OrDivider from "./OrDivider";
import { SocialButton } from "./SocialButton";

import { useGoogleSignUp } from "../hooks/useGoogleSignUp";

const SocialSignUpSection = () => {
  const { googleAuth } = useGoogleSignUp();

  return (
    <div className="w-full flex flex-col gap-3 pt-4">
      <OrDivider />
      <SocialButton onClick={googleAuth} provider="Google" />
      <SocialButton provider="Facebook" />
    </div>
  );
};

export default SocialSignUpSection;
