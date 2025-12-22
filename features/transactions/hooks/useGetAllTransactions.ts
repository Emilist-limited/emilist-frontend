import { useEffect } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { useTransactionState } from "./useTransactionState";

export const useGetAllTransactions = (query?: string) => {
  const {
    loading,
    setLoading,
    transactions,
    setTransactions,
    currentPage,
    totalPages,
    setTotalPages,
    limit,
    setLimit,
    totalTransactions,
    setTotalTransactions,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
  } = useTransactionState();

  const getAllTransactions = async () => {
    let url = `/transaction/fetch-all-user-transactions?page=${currentPage}&limit=${limit}${
      query ? `&paymentMethod=${query}` : ""
    }`;

    try {
      const { data } = await axiosInstance.get(url);
      const { totalTransactions, transactions } = data?.data;
      setTransactions(transactions);
      setTotalPages(Math.ceil(totalTransactions / limit));
      setTotalTransactions(totalTransactions);
    } catch (error) {
      console.log("error fetching all user transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [currentPage, limit, query]);

  return {
    loading,
    transactions,
    totalPages,
    getAllTransactions,
    totalTransactions,
    prevPage,
    nextPage,
    goToLastPage,
    goToFirstPage,
    isFirstPage,
    isLastPage,
    limit,
    setLimit,
    currentPage,
  };
};
