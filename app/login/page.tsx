import LoginWrapper from "@/components/organisms/LoginWrapper";
import AuthLayout from "@/components/templates/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="Log In to EmiList">
      <LoginWrapper />
    </AuthLayout>
  );
};

export default LoginPage;
