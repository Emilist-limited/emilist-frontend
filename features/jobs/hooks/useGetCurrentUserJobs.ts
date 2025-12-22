import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useFetchJobState } from "./useFetchJobState";
import { getCurrentUserJobs } from "../api/getCurrentUserJobs";
import { ROUTES } from "@/lib/constants/routes";

export const useGetCurrentUserJobs = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const {
    data: currentUserJobs,
    setData: setCurrentUserJobs,
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
    setTotalJobs,
    totalJobs,
  } = useFetchJobState();

  const getAllUserJobs = async () => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }

    try {
      const { jobs, totalJobs } = await getCurrentUserJobs({
        currentPage,
        search,
        filterLocation,
        filterService,
      });
      setCurrentUserJobs(jobs);
      setTotalJobs(totalJobs);
      setTotalPages(Math.ceil(totalJobs / 10));
    } catch (error: any) {
      console.log("error fetching user jobs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUserJobs();
  }, [currentUser]);

  return {
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
  };
};
