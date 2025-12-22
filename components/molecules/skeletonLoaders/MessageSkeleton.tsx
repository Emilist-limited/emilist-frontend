import { Skeleton } from "@/components/ui/skeleton";

const MessageSkeleton = () => {
  return (
    <>
      {["", "", "", "", ""].map((skeleton, index) => (
        <div key={index} className=" h-12 w-full rounded-lg sm:px-6 px-2 my-2">
          <Skeleton className={`h-full w-full rounded-l bg-slate-200`} />
        </div>
      ))}
    </>
  );
};

export default MessageSkeleton;
