"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useAddClicks } from "@/lib/hooks/useAddClicks";
import { useFetchJobs } from "@/features/jobs/hooks/useFetchJobs";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";
import { JobSkeleton } from "../molecules/skeletonLoaders/JobSkeleton";

import JobCard from "../molecules/cards/JobCard";
import NoMoreMessage from "../atoms/NoMoreMessage";

const PopularJobData = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { addClicks } = useAddClicks();
  const { isLoading, data, setCurrentPage, hasMore } = useFetchJobs();
  const { containerRef, handleScroll } = useHorizontalScroll(
    () => setCurrentPage((prev) => prev + 1),
    hasMore
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex w-full overflow-x-scroll gap-4 sm:mt-6 py-4 hide-scrollbar"
    >
      {data?.map((job, i) => (
        <JobCard key={i} job={job} userId={userId} addClicks={addClicks} />
      ))}
      {isLoading && <JobSkeleton />}
      {!hasMore && data?.length > 10 && (
        <NoMoreMessage message="No more jobs" />
      )}
    </div>
  );
};

export default PopularJobData;
