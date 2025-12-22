import { useContext, useEffect, useRef, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { AuthContext } from "@/lib/context/AuthState";

export const useGetSimilarMaterials = (materialId: string) => {
  const { currentUser } = useContext(AuthContext);

  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllSimilarMaterials = async () => {
    if (!hasMore) return;
    const userId = currentUser?._id || "";
    let url = `/material/fetch-similar-products/${materialId}?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;

    try {
      const { data } = await axiosInstance.get(url);
      const { products: newProducts, totalPages, totalProducts } = data?.data;

      setData((prev) => [...prev, ...newProducts]);
      setTotalPages(totalPages);
      if (currentPage >= newProducts) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.log("error fetching all materials", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHorizontalScroll = () => {
    const container = containerRef.current;

    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Check if scrolled to the end
      if (scrollLeft + clientWidth >= scrollWidth - 10 && hasMore) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    getAllSimilarMaterials();
  }, [materialId]);

  return {
    loading,
    data,
    getAllSimilarMaterials,
    handleHorizontalScroll,
    containerRef,
    hasMore,
  };
};
