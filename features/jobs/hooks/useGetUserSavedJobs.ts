import { useEffect } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { useFetchJobState } from "./useFetchJobState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useGetUserSavedJobs = () => {
  const { showToast } = useToast();
  const {
    data: allUserSavedJobs,
    setData: setAllUserSavedJobs,
    isLoading,
    setIsLoading,
    currentPage,
    totalPages,
    setTotalPages,
    totalJobs,
    setTotalJobs,
    handlePageChange,
  } = useFetchJobState();

  const getAllUserSavedJobs: any = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/jobs/fetch-liked-jobs?page=${currentPage}&limit=10`
      );
      setAllUserSavedJobs(data?.data?.jobs);
      const totalJobs = data?.data?.totalLikedJobs;
      setTotalJobs(totalJobs);
      setTotalPages(Math.ceil(totalJobs / 10));
    } catch (error: any) {
      console.log("error getting user saved jobs", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUserSavedJobs();
  }, []);

  return {
    totalJobs,
    isLoading,
    allUserSavedJobs,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedJobs,
  };
};
