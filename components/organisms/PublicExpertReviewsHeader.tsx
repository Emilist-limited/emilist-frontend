import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";

interface PublicExpertReviewsHeaderProps {
  data: [];
  businessId: string;
}

const PublicExpertReviewsHeader = ({
  data,
  businessId,
}: PublicExpertReviewsHeaderProps) => {
  return (
    <section className=" max-w-[676px] w-full flex-c-b pb-6 flex-wrap gap-2">
      <h6 className="sm:text-2xl text-lg font-semibold whitespace-nowrap">
        What people loved about this seller
      </h6>
      {data?.length > 0 && (
        <Link
          href={ROUTES?.EXPERT_REVIEWS(businessId)}
          className="max-sm:text-sm text-primary-green whitespace-nowrap"
        >
          See all reviews
        </Link>
      )}
    </section>
  );
};

export default PublicExpertReviewsHeader;
