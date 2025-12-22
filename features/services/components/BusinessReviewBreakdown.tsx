import StarIcon from "@/components/atoms/StarIcon";
import ReviewPercentageBreakdown from "@/components/molecules/ReviewPercentageBreakdown";

import { StarCounts } from "@/types";

interface BusinessReviewBreakdownProps {
  starCount: StarCounts;
  communicationRating: number;
  serviceAsSeen: number | string | undefined;
}

const BusinessReviewBreakdown = ({
  starCount,
  communicationRating,
  serviceAsSeen,
}: BusinessReviewBreakdownProps) => {
  return (
    <div className="flex flex-wrap gap-10 py-10">
      <ReviewPercentageBreakdown starCount={starCount} />
      <div className="flex-1 flex flex-col gap-6">
        <p className="sm:text-xl font-semibold">Rating Breakdown</p>
        <div className="flex-c gap-10">
          <p className="max-sm:text-sm">Seller communication level</p>
          <div className="flex-c gap-2">
            <p className="max-sm:text-sm text-[#ff9933]">
              {communicationRating || 0}
            </p>
            <span className="text-xl">
              <StarIcon filled={true} className="w-5 h-5" />
            </span>
          </div>
        </div>
        <div className="flex-c gap-10">
          <p className="max-sm:text-sm">Service as described</p>
          <div className="flex-c gap-2">
            <p className="max-sm:text-sm text-[#ff9933]">
              {serviceAsSeen && serviceAsSeen}
            </p>
            <span className="text-xl">
              <StarIcon filled={true} className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessReviewBreakdown;
