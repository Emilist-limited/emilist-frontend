import { useEffect } from "react";

import { getUserAppliedJobs } from "../api/getUserAppliedJobs";
import { useFetchJobState } from "./useFetchJobState";

export const useGetUserAppliedJobs = () => {
  const {
    allJobs,
    setAllJobs,
    isLoading,
    setIsLoading,
    currentPage,
    totalPages,
    setTotalPages,
    search,
    filterLocation,
    setFilterLocation,
    filterService,
    setFilterService,
    handleChange,
    handlePageChange,
    totalJobs,
    setTotalJobs,
  } = useFetchJobState();

  const getAllJobs = async () => {
    try {
      const { applications, total } = await getUserAppliedJobs({
        currentPage,
        search,
        filterLocation,
        filterService,
      });
      setAllJobs(applications);
      const totalJobs = total || 0;
      setTotalJobs(total);
      setTotalPages(Math.ceil(totalJobs / 10));
    } catch (error: any) {
      setIsLoading(false);
      console.log("error getting user applied jobs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return {
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
  };
};
