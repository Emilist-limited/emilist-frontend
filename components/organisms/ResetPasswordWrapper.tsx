import { VerifyEmailParams } from "@/features/auth/types";

import HaveAnAccount from "../molecules/HaveAnAccount";
import ResetPasswordForm from "../molecules/forms/ResetPasswordForm";

const ResetPasswordWrapper = ({ email }: VerifyEmailParams) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="max-sm:text-sm">
        Enter the otp sent to {email && email} and your new password to reset
        your password.
      </p>
      <ResetPasswordForm email={email} />
      <HaveAnAccount />
    </div>
  );
};

export default ResetPasswordWrapper;
