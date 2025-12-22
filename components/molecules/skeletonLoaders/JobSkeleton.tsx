import { Skeleton } from "@/components/ui/skeleton";

export const JobSkeleton = ({
  className = "w-80 min-w-80 h-40",
}: {
  className?: string;
}) => {
  return (
    <>
      {["", "", "", "", "", "", "", ""].map((skeleton, index) => (
        <div key={index} className={className}>
          <Skeleton className="h-full w-full rounded-lg bg-slate-200" />
        </div>
      ))}
    </>
  );
};
