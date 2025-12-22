import Link from "next/link";

import { Dispatch, SetStateAction } from "react";
import { ROUTES } from "@/lib/constants/routes";

interface PromoteInsightWrapperProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PromoteInsightWrapper = ({ setIsOpen }: PromoteInsightWrapperProps) => {
  return (
    <div className="flex-c gap-3">
      <button
        className="text-primary-green font-medium max-sm:text-sm py-2 underline"
        onClick={() => setIsOpen(true)}
      >
        Promote
      </button>
      <Link
        href={ROUTES?.REPORT_INSIGHT}
        className="text-primary-green font-medium max-sm:text-sm py-2 underline"
      >
        Insight
      </Link>
    </div>
  );
};

export default PromoteInsightWrapper;
