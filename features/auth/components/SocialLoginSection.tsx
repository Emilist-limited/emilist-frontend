import OrDivider from "./OrDivider";
import { SocialButton } from "./SocialButton";

const SocialLoginSection = () => {
  return (
    <div className="w-full flex flex-col gap-3 pt-4">
      <OrDivider />
      <SocialButton provider="Google" />
      <SocialButton provider="Facebook" />
    </div>
  );
};

export default SocialLoginSection;
