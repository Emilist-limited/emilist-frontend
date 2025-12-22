import AuthLayout from "@/components/templates/AuthLayout";
import EmailVerificationWrapper from "@/components/organisms/EmailVerificationWrapper";

import { VerifyEmailParams } from "@/features/auth/types";

const VerifyEmailPage = ({ params }: { params: VerifyEmailParams }) => {
  const email = decodeURIComponent(params.email);

  return (
    <AuthLayout title="Email Verification">
      <EmailVerificationWrapper email={email} />
    </AuthLayout>
  );
};

export default VerifyEmailPage;
