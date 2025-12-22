import Logo from "@/components/atoms/Logo";
import CustomButton from "@/components/atoms/CustomButton";

import { ROUTES } from "@/lib/constants/routes";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex-c justify-center">
      <div className="padding-ctn">
        <div className="flex flex-col justify-center items-center gap-4">
          <Logo />
          <h1 className="text-3xl font-bold text-center">
            404 - Page Not Found
          </h1>
          <p className="text-center">
            Oops! The page you're looking for doesn't exist.
          </p>
          <CustomButton href={ROUTES.HOME}>Go back to Home</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
