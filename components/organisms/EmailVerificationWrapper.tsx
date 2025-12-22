import { VerifyEmailParams } from "@/features/auth/types";
import EmailVerificationForm from "../molecules/forms/EmailVerificationForm";

const EmailVerificationWrapper = ({ email }: VerifyEmailParams) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="max-sm:text-sm">
        Please enter otp sent to {email && email} to complete registration
      </p>
      <EmailVerificationForm email={email} />
    </div>
  );
};

export default EmailVerificationWrapper;
