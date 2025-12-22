import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";

const HaveAnAccount = () => {
  return (
    <div className="w-full flex justify-center pt-5">
      <p className="max-sm:text-sm">
        Have an EmiList account?{" "}
        <Link href={ROUTES?.LOGIN} className="text-primary-green">
          Login
        </Link>
      </p>
    </div>
  );
};

export default HaveAnAccount;
