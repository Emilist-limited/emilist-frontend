import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";

const AcceptTermsOfUse = () => {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        name="terms"
        id="terms"
        className="mt-1 bg-white checkbox checkbox-success h-4 w-4 rounded"
        required
      />
      <p className="text-sm">
        By signing up with email, Facebook, or Google, you agree to our{" "}
        <Link href={ROUTES?.TERMS_OF_USE} className="text-primary-green">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href={ROUTES?.POLICY} className="text-primary-green">
          Privacy Policy.
        </Link>
      </p>
    </div>
  );
};

export default AcceptTermsOfUse;
