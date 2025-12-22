import SignUpForm from "../molecules/forms/SignUpForm";
import SocialSignUpSection from "@/features/auth/components/SocialSignUpSection";
import HaveAnAccount from "../molecules/HaveAnAccount";

const SignUpWrapper = () => {
  return (
    <div className="">
      <SignUpForm />
      <SocialSignUpSection />
      <HaveAnAccount />
    </div>
  );
};

export default SignUpWrapper;
