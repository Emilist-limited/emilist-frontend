import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useJobAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobAnalytics, setJobAnalytics] = useState<any>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState<any>("");

  const currentYear = new Date().getFullYear();

  const handleGetJobAnalytics = async () => {
    try {
      const monthQuery = month ? `&month=${month}` : "";
      const { data } = await axiosInstance.get(
        `/jobs/user-job-analytics?year=${year || currentYear}${monthQuery}`
      );
      setJobAnalytics(data?.data);
    } catch (error) {
      console.log("error fetching job analytics", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetJobAnalytics();
  }, [month, year]);

  return {
    isLoading,
    jobAnalytics,
    handleGetJobAnalytics,
    setMonth,
    setYear,
    month,
    year,
  };
};
