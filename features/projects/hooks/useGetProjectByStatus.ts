import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useGetProjectByStatus = (status: string) => {
  const [allProjects, setAllProjects] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProject, setTotalProjects] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllProjectsByStatus = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/jobs/fetch-applied-jobs-by-status?limit=10&page=${currentPage}&status=${status}`
      );

      setAllProjects(data?.data?.applications);
      const totalProjects = data?.data?.total || 0;
      setTotalProjects(totalProjects);
      setTotalPages(Math.ceil(totalProjects / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.error("Error fetching projects by status", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProjectsByStatus();
  }, [status]);

  return {
    isLoading,
    allProjects,
    handlePageChange,
    totalPages,
    currentPage,
    totalProject,
  };
};
