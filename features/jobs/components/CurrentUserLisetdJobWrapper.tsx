"use client";

import { Jobs } from "../types";
import { useGetCurrentUserJobs } from "../hooks/useGetCurrentUserJobs";
import { useSaveJob } from "../hooks/useSaveJob";
import { useUnSave } from "../hooks/useUnSave";

import PageLoader from "@/components/atoms/PageLoader";
import GeneralSearchForm from "@/components/molecules/GeneralSearchForm";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import CustomPagination from "@/components/molecules/CustomPagination";
import JobFilterPanel from "./JobFilterPanel";
import JobViewCard from "./JobViewCard";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import EmptyState from "@/components/atoms/EmptyState";

const CurrentUserLisetdJobWrapper = () => {
  const { loading, handleSaveJob } = useSaveJob();
  const { isLoading: isUnliking, handleUnsaveJob } = useUnSave();
  const {
    currentUserJobs,
    isLoading,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterService,
    setFilterService,
    getAllUserJobs,
    setIsLoading,
    totalJobs,
  } = useGetCurrentUserJobs();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    await getAllUserJobs();
  };

  const onSaveJob = (jobId: string) => {
    handleSaveJob(jobId, () => {
      getAllUserJobs();
    });
  };
  const onUnSaveJob = (jobId: string) => {
    handleUnsaveJob(jobId, () => {
      getAllUserJobs();
    });
  };

  const isSubmitting = loading || isUnliking;
  const checkAll = search || filterLocation || filterService;

  return (
    <div className="padding-ctn sm:py-28 pt-14">
      {isSubmitting && <WhiteBgLoader />}
      {currentUserJobs?.length < 1 ? (
        <EmptyState
          title="No Job Listed"
          description="You do not have any job listed. Please click the button below to list a new job."
          link="/dashboard/job/list-new-job"
          btnTitle="List new job"
        />
      ) : (
        <>
          {" "}
          <h1 className="sm:text-3xl font-bold text-xl my-4">My Listed Jobs</h1>
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
                {currentUserJobs?.length < 1 ? (
                  <NoMoreMessage
                    message={
                      checkAll
                        ? "No job matched your search or filter, Try something else."
                        : "No job listed"
                    }
                  />
                ) : (
                  <>
                    {currentUserJobs?.map((job: Jobs) => (
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
                  getAllJobs={getAllUserJobs}
                />
              </section>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentUserLisetdJobWrapper;
