import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";

const DontRememberPassword = () => {
  return (
    <div className="flex items-center justify-end">
      <Link
        href={ROUTES?.FORGOT_PASSWORD}
        className="font-semibold max-sm:text-sm py-2 hover:text-primary-green transition-all duration-300"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default DontRememberPassword;
