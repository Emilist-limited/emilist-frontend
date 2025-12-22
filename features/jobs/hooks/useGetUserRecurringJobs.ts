import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useFetchJobState } from "./useFetchJobState";
import { getCurrentUserJobs } from "../api/getCurrentUserJobs";
import { ROUTES } from "@/lib/constants/routes";
import { getUserRecurringJobs } from "../api/getUserRecurringJobs";

export const useGetUserRecurringJobs = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const {
    data: recurringJobs,
    setData: setRecurringJobs,
    isLoading,
    setIsLoading,
    currentPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    setTotalJobs,
    totalJobs,
  } = useFetchJobState();

  const getRecurringJobs = async () => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }

    try {
      const { jobs, totalJobs } = await getUserRecurringJobs({
        currentPage,
      });
      setRecurringJobs(jobs);
      setTotalJobs(totalJobs);
      setTotalPages(Math.ceil(totalJobs / 10));
    } catch (error: any) {
      console.log("error fetching user jobs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecurringJobs();
  }, [currentUser]);

  return {
    recurringJobs,
    isLoading,
    handlePageChange,
    totalPages,
    currentPage,
    getRecurringJobs,
    totalJobs,
  };
};
