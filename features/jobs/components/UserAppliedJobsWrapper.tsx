"use client";

import { Jobs } from "../types";
import { useSaveJob } from "../hooks/useSaveJob";
import { useUnSave } from "../hooks/useUnSave";
import { useGetUserAppliedJobs } from "../hooks/useGetUserAppliedJobs";

import GeneralSearchForm from "@/components/molecules/GeneralSearchForm";
import PageLoader from "@/components/atoms/PageLoader";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import CustomPagination from "@/components/molecules/CustomPagination";
import JobViewCard from "./JobViewCard";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import JobFilterPanel from "./JobFilterPanel";

const UserAppliedJobsWrapper = () => {
  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading: isUnliking, handleUnsaveJob } = useUnSave();
  const {
    isLoading,
    allJobs,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    filterService,
    setFilterService,
    filterLocation,
    setFilterLocation,
    setIsLoading,
    totalJobs,
  } = useGetUserAppliedJobs();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    await getAllJobs();
  };

  const onSaveJob = (jobId: string) => {
    handleSaveJob(jobId, () => {
      getAllJobs();
    });
  };
  const onUnSaveJob = (jobId: string) => {
    handleUnsaveJob(jobId, () => {
      getAllJobs();
    });
  };

  const isSubmitting = loading || isUnliking;
  const checkAll = search || filterLocation || filterService;

  return (
    <div className="padding-ctn sm:py-28 pt-14">
      {isSubmitting && <WhiteBgLoader />}
      <h1 className="sm:text-3xl font-bold text-xl my-4">Applications</h1>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-3 gap-10">
          <section className="col-span-2 max-md:col-span-3 space-y-6">
            <div className="md:hidden max-w-[350px] w-full">
              <GeneralSearchForm
                onSubmit={handleSubmit}
                search={search}
                onChange={handleChange}
              />
            </div>
            {allJobs.length < 1 ? (
              <NoMoreMessage
                message={
                  checkAll
                    ? "No job matched your search or filter, Try something else."
                    : "No applications found"
                }
              />
            ) : (
              <>
                {allJobs.map((job: Jobs) => (
                  <JobViewCard
                    key={job._id}
                    job={job}
                    onSaveJob={onSaveJob}
                    onUnSaveJob={onUnSaveJob}
                    shadow
                  />
                ))}
                {totalJobs > 10 && (
                  <div className="md:w-2/3 w-full pt-2">
                    <CustomPagination
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </div>
                )}
              </>
            )}
          </section>
          <section className="col-span-1 max-md:hidden w-full">
            <JobFilterPanel
              search={search}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              filterService={filterService}
              setFilterService={setFilterService}
              filterLocation={filterLocation}
              setFilterLocation={setFilterLocation}
              getAllJobs={getAllJobs}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default UserAppliedJobsWrapper;
