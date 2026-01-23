import GoogleAuthSection from "@/features/auth/components/GoogleAuthSection";
import SignUpForm from "../molecules/forms/SignUpForm";
import HaveAnAccount from "../molecules/HaveAnAccount";

const SignUpWrapper = () => {
  return (
    <div className="">
      <SignUpForm />
      <GoogleAuthSection />
      <HaveAnAccount />
    </div>
  );
};

export default SignUpWrapper;
