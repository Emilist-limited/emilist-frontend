import { ChangeEvent, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { useToast } from "@/lib/hooks/useToast";

export const useGetJobsByStatus = () => {
  const { showToast } = useToast();
  const ITEMS_PER_PAGE = 10;

  const [search, setSearch] = useState("");
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [allJobs, setAllJobs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllJobsByStatus = async (status: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/jobs/fetch-jobs-by-status?status=${status}`
      );
      setAllJobs(data?.data);
      const totalJobs = data?.data?.length || 0;
      setTotalJobs(totalJobs);
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.error("Error fetching jobs by status", error);
      showToast({
        message: "Internal Server Error!",
        type: "error",
        autoClose: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    allJobs,
    search,
    handleChange,
    getAllJobsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
    totalJobs,
  };
};
