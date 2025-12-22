import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useProjectAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectAnalytics, setProjectAnalytics] = useState<any>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState<any>("");

  const currentYear = new Date().getFullYear();

  const handleGetProjectAnalytics = async () => {
    try {
      const monthQuery = month ? `&month=${month}` : "";
      const { data } = await axiosInstance.get(
        `/jobs/user-project-analytics?year=${year || currentYear}${monthQuery}`
      );
      setProjectAnalytics(data?.data);
    } catch (error) {
      console.log("error fetching job analytics", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetProjectAnalytics();
  }, [month, year]);

  return {
    isLoading,
    projectAnalytics,
    setMonth,
    setYear,
    month,
    year,
  };
};
