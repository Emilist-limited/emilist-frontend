import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";
import { LoginForm } from "../molecules/forms/LoginForm";

import SocialLoginSection from "@/features/auth/components/SocialLoginSection";

const LoginWrapper = () => {
  return (
    <div className="">
      <LoginForm />
      <SocialLoginSection />
      <div className="w-full flex justify-center pt-5">
        <p className="max-sm:text-sm">
          Don't have an EmiList account{" "}
          <Link href={ROUTES?.SIGN_UP} className="text-primary-green">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginWrapper;
