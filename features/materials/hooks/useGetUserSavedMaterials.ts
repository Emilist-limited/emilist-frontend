import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useGetUserSavedMaterials = () => {
  const [saveLoading, setLoading] = useState<boolean>(true);
  const [allUserSavedMaterials, setAllUserSavedMaterials] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setToatCount] = useState(0);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllUserSavedMaterials: any = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/material/fetch-liked-products`
      );
      setAllUserSavedMaterials(data?.data?.products);
      const totalJobs = data?.data?.totalLikedProducts;
      setToatCount(totalJobs);
      setTotalPages(Math.ceil(totalJobs / 10));
    } catch (error: any) {
      console.log("error getting user saved jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUserSavedMaterials();
  }, []);

  return {
    saveLoading,
    allUserSavedMaterials,
    totalCount,
    handlePageChange,
    currentPage,
    totalPages,
    getAllUserSavedMaterials,
  };
};
