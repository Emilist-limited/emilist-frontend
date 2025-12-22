import { useState, useEffect, useContext, ChangeEvent } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { getBusinesses } from "../api/getBusinesses";
import { useToast } from "@/lib/hooks/useToast";

export const useGetBusinesses = (
  serviceQuery?: string,
  locationQuery?: string
) => {
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("");
  const [totalBusinesses, setTotalBusinesses] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [expertType, setExpertType] = useState("");
  const [rating, setRating] = useState("");
  const [noOfReviews, setNoOfReviews] = useState<string | undefined>(undefined);
  const [noticePeriod, setNoticePeriod] = useState<number | undefined>(
    undefined
  );

  const handleMinChange = (value: number) => {
    setMinValue(Math.min(value, maxValue));
  };

  const handleMaxChange = (value: number) => {
    if (minValue > maxValue) {
      showToast({
        message: "Min price can't be greater than Max price!",
        type: "error",
      });
      return;
    }
    setMaxValue(Math.max(value, minValue));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const {
        business: newBusinesses,
        totalPages,
        totalBusinesses,
      } = await getBusinesses({
        page: currentPage,
        limit: 10,
        userId: currentUser?._id,
        search,
        serviceQuery,
        location,
        locationQuery,
        noticePeriod,
        noOfReviews,
        rating,
        expertType,
        minValue,
        maxValue,
        currency,
      });

      setData((prev) => [...prev, ...newBusinesses]);
      setBusinesses(newBusinesses);
      setTotalPages(totalPages);
      setTotalBusinesses(totalBusinesses);
      if (currentPage >= totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [currentPage, rating, currency, noticePeriod]);

  return {
    data,
    loading,
    hasMore,
    search,
    setSearch,
    businesses,
    totalPages,
    currentPage,
    handleChange,
    handlePageChange,
    fetchBusinesses,
    setLoading,
    setCurrentPage,
    minValue,
    maxValue,
    expertType,
    setExpertType,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    noOfReviews,
    setNoOfReviews,
    location,
    setLocation,
    noticePeriod,
    setNoticePeriod,
    totalBusinesses,
    currency,
    setCurrency,
    isFetching,
    setIsFetching,
    reFetchAllBusinesses: fetchBusinesses,
  };
};
