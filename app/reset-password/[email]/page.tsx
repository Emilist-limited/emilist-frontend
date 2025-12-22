import AuthLayout from "@/components/templates/AuthLayout";
import ResetPasswordWrapper from "@/components/organisms/ResetPasswordWrapper";

import { VerifyEmailParams } from "@/features/auth/types";

const ResetPasswordPage = ({ params }: { params: VerifyEmailParams }) => {
  const email = decodeURIComponent(params.email);

  return (
    <AuthLayout title="Reset Password">
      <ResetPasswordWrapper email={email} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
