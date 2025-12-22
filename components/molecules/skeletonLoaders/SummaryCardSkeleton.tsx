import { Skeleton } from "@/components/ui/skeleton";

const SummaryCardSkeleton = () => {
  return (
    <>
      {["", "", "", "", "", ""].map((skeleton, index) => (
        <div
          key={index}
          className="w-[340px] max-w-[340px] min-w-[340px] rounded-lg max-sm:max-w-full max-sm:min-w-[300px] max-sm:w-[340px]"
        >
          <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
        </div>
      ))}
    </>
  );
};

export default SummaryCardSkeleton;
