import SignUpWrapper from "@/components/organisms/SignUpWrapper";
import AuthLayout from "@/components/templates/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout title="Create a free account">
      <SignUpWrapper />
    </AuthLayout>
  );
};

export default SignUpPage;
