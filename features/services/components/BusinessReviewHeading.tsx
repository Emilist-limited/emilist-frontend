import Rating from "@/components/molecules/Rating";

import { formatReviewCount } from "../helpers/formatReviewCount";
import { numberWithCommas } from "@/lib/helpers";

interface BusinessReviewHeadingProps {
  reviewCount: number;
  averageRating: number;
}

const BusinessReviewHeading = ({
  reviewCount,
  averageRating,
}: BusinessReviewHeadingProps) => {
  return (
    <div className="flex items-center gap-2">
      <h4 className="sm:text-3xl text-xl font-bold">
        {formatReviewCount(reviewCount)}
      </h4>
      <div className="flex-c gap-1">
        <Rating rating={averageRating || 0} />
        <p className="sm:text-sm text-xs text-gray-300">
          ({reviewCount && numberWithCommas(reviewCount)})
        </p>
      </div>
    </div>
  );
};

export default BusinessReviewHeading;
