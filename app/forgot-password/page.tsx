import AuthLayout from "@/components/templates/AuthLayout";
import ForgotPasswordForm from "@/components/molecules/forms/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Forgot Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
