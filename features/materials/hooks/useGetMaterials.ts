import { ChangeEvent, useContext, useEffect, useState } from "react";

import { getMaterials } from "../api/getMaterials";
import { AuthContext } from "@/lib/context/AuthState";

export const useGetMaterials = (material?: string, locationQuery?: string) => {
  const { currentUser } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currency, setCurrency] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState(true);
  const [allMaterials, setAllMaterials] = useState<any>([]);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(10000000000);
  const [noOfReviews, setNoOfReviews] = useState<string | undefined>(undefined);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleMinChange = (value: number) => {
    setMinValue(Math.min(value, maxValue));
  };

  const handleMaxChange = (value: number) => {
    setMaxValue(Math.max(value, minValue));
  };

  const fetchAllMaterials = async () => {
    setLoading(true);
    try {
      const {
        products: newProducts,
        totalPages,
        totalProducts,
      } = await getMaterials({
        page: currentPage,
        limit: 10,
        userId: currentUser?._id,
        search: search,
        rating: rating,
        noOfReviews: noOfReviews,
        locationQuery: locationQuery,
        material: material,
      });
      setAllMaterials(newProducts);
      setTotalProducts(totalProducts);
      setData((prev) => [...prev, ...newProducts]);
      setTotalPages(totalPages);
      if (currentPage >= totalPages) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.log("error fetching all materials", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllMaterials();
  }, [currentPage]);

  return {
    data,
    loading,
    hasMore,
    allMaterials,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    fetchAllMaterials,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    minValue,
    maxValue,
    noOfReviews,
    setNoOfReviews,
    totalProducts,
    setLoading,
    setCurrentPage,
    currency,
    setCurrency,
    isFetching,
    setIsFetching,
    refetchAllMaterials: fetchAllMaterials,
  };
};
