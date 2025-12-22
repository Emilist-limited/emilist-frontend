"use client";

import { useSearchParams } from "next/navigation";

import { useFetchJobs } from "@/features/jobs/hooks/useFetchJobs";
import { FilterJobWrapperProps, JobListProps } from "@/features/jobs/types";

import FeatureLinksWrapper from "./FeatureLinksWrapper";
import FeatureContentHeader from "./FeatureContentHeader";
import PageLoader from "../atoms/PageLoader";
import FilterPanel from "./FilterPanel";
import FilterJobWrapper from "@/features/jobs/components/FilterJobWrapper";
import JobList from "@/features/jobs/components/JobList";

const JobsListWrapper = () => {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const {
    isLoading,
    allJobs,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterService,
    setFilterService,
    currency,
    setCurrency,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    totalJobs,
  } = useFetchJobs(q);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getAllJobs();
  };

  const filterProps: FilterJobWrapperProps = {
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    currency,
    setCurrency,
    getAllJobs,
    filterLocation,
    setFilterLocation,
    filterService,
    setFilterService,
  };

  const listProps: JobListProps = {
    allJobs,
    totalJobs,
    currentPage,
    totalPages,
    handlePageChange,
    getAllJobs,
  };

  return (
    <div className="pt-10 padding-ctn">
      <FeatureLinksWrapper />
      <FeatureContentHeader
        search={search}
        handleSearchChange={handleChange}
        handleSearchSubmit={handleSubmit}
        title={q || "Explore Job Opportunities"}
        description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
        amet sint. Velit officia consequat duis enimt."
      />
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-10 pt-10 no-scroll">
          <FilterPanel>
            <FilterJobWrapper {...filterProps} />
          </FilterPanel>
          <JobList {...listProps} />
        </div>
      )}
    </div>
  );
};

export default JobsListWrapper;
