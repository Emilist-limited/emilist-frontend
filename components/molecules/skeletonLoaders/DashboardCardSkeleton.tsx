import { Skeleton } from "@/components/ui/skeleton";

const DashboardCardSkeleton = () => {
  return (
    <div className=" w-full lg:h-80 h-60">
      <Skeleton className="h-full w-full rounded-lg bg-slate-200" />
    </div>
  );
};

export default DashboardCardSkeleton;
