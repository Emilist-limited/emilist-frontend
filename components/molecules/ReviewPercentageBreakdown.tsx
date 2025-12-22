import { getRatingPercentage } from "@/lib/helpers/getRatingPercentage";
import { StarCounts } from "@/types";

const ReviewPercentageBreakdown = ({
  starCount,
}: {
  starCount: StarCounts;
}) => {
  return (
    <div className="flex-1 flex flex-col gap-5">
      {Array.from({ length: 5 }, (_, index) => {
        const starRating = 5 - index;
        const percentage = starCount
          ? getRatingPercentage(starCount, starRating)
          : "0%";
        const count = starCount?.[starRating] || 0;

        return (
          <div key={starRating} className="flex-c gap-4">
            <p className="text-[#054753] font-semibold max-sm:text-sm">
              {starRating} Stars
            </p>
            <div className="h-[16px] sm:min-w-[480px] sm:w-[480px] min-w-[260px] w-[260px] rounded-full bg-slate-300">
              <div
                className="h-full bg-[#ff9933] rounded-full"
                style={{ width: percentage }}
              ></div>
            </div>
            <p className="text-[#054753] max-sm:text-sm">({count})</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewPercentageBreakdown;
