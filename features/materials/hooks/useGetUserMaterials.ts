import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useGetUserMaterials = () => {
  const { showToast } = useToast();

  const [userMaterials, setUserMaterials] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setToatCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllMaterials = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/material/fetch-user-products`);
      setUserMaterials(data?.data?.products);
      const totalMaterials = data?.data?.totalProducts;
      setToatCount(totalMaterials);
      setTotalPages(Math.ceil(totalMaterials / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error fetching materials", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMaterials();
  }, []);

  return {
    handlePageChange,
    isLoading,
    getAllMaterials,
    totalPages,
    currentPage,
    userMaterials,
    totalCount,
  };
};
