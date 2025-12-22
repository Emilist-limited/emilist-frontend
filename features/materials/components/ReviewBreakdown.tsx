import ReviewPercentageBreakdown from "@/components/molecules/ReviewPercentageBreakdown";

import { StarCounts } from "@/types";

interface ReviewBreakdownProps {
  starCount: StarCounts;
}

const ReviewBreakdown = ({ starCount }: ReviewBreakdownProps) => {
  return (
    <div className="flex flex-wrap gap-10 py-10">
      <ReviewPercentageBreakdown starCount={starCount} />
    </div>
  );
};

export default ReviewBreakdown;
