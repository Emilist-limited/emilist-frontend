"use client";

import CustomButton from "@/components/atoms/CustomButton";
import Input from "@/components/atoms/Input";

import { hasLetter } from "@/lib/helpers";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail";
import { VerifyEmailParams } from "@/features/auth/types";

const EmailVerificationForm = ({ email }: VerifyEmailParams) => {
  const { handleResendOtp, load } = useResendOtp();
  const { handleVerifyEmail, loading, setOtp, otp } = useVerifyEmail();

  const isAllInputFilled = hasLetter(otp);

  return (
    <form
      className="w-full flex flex-col gap-3 text-gray-600"
      onSubmit={(e) => handleVerifyEmail(e, email)}
    >
      <Input
        id="otp"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <div className="flex justify-end sm:text-sm text-xs">
        Didn't recieve OTP?
        <button
          disabled={load}
          onClick={() => handleResendOtp(email)}
          className="text-primary-green pl-1"
          type="button"
        >
          {" "}
          {load ? "Resending..." : "Resend"}
        </button>
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

export default EmailVerificationForm;
