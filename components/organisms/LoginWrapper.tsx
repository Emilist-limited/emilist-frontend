import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";
import { LoginForm } from "../molecules/forms/LoginForm";

import GoogleAuthSection from "@/features/auth/components/GoogleAuthSection";

const LoginWrapper = () => {
  return (
    <div className="">
      <LoginForm />
      <GoogleAuthSection />
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
