import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useGetJobSummary = () => {
  const [jobAnalytics, setJobAnalytics] = useState<any>({});
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const getUserJobAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const { data } = await axiosInstance.get(`/jobs/fetch-job-count-creator`);
      setJobAnalytics(data?.data);
    } catch (error: any) {
      console.log("error fetching user job analytics", error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    getUserJobAnalytics();
  }, []);

  return {
    loadingAnalytics,
    jobAnalytics,
  };
};
