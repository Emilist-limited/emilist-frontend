import { useContext, useEffect } from "react";

import { getJobs } from "../api/getJobs";
import { AuthContext } from "@/lib/context/AuthState";
import { useFetchJobState } from "./useFetchJobState";

export const useFetchJobs = (q?: string) => {
  const { currentUser } = useContext(AuthContext);

  const {
    data,
    setData,
    hasMore,
    setHasMore,
    allJobs,
    setAllJobs,
    currency,
    setCurrency,
    isFetching,
    setIsFetching,
    isLoading,
    setIsLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    search,
    filterLocation,
    setFilterLocation,
    filterName,
    setFilterName,
    totalJobs,
    setTotalJobs,
    filterService,
    setFilterService,
    minValue,
    maxValue,
    handleChange,
    handlePageChange,
    handleMinChange,
    handleMaxChange,
  } = useFetchJobState();

  const getAllJobs = async () => {
    setIsLoading(true);
    try {
      const {
        jobs: newJobs,
        totalPages,
        totalJobs,
      } = await getJobs({
        currentPage: currentPage,
        userId: currentUser?._id,
        search: search || q || "",
        filterName: filterName,
        filterLocation: filterLocation,
        filterService: filterService,
      });
      setAllJobs(newJobs);
      setTotalJobs(totalJobs);
      setData((prev) => [...prev, ...newJobs]);
      setTotalPages(totalPages);
      if (currentPage >= totalPages) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.log("error fetching all product", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [currentPage, q]);

  return {
    isLoading,
    isFetching,
    allJobs,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    data,
    hasMore,
    setIsLoading,
    setCurrentPage,
    currency,
    setCurrency,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    totalJobs,
    setIsFetching,
  };
};
