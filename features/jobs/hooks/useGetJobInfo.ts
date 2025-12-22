import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { useToast } from "@/lib/hooks/useToast";

export const useGetJobInfo = (jobId: string) => {
  const { showToast } = useToast();
  const [jobInfo, setJobInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [currentMilestone, setCurrentMilestone] = useState<any>({});
  const [analytics, setAnalytics] = useState<any>({});

  const getJobInfo = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/jobs/fetch-job-by-id?id=${jobId}`
      );
      setJobInfo(data?.data?.job);
      setAnalytics(data?.data);
      setCurrentMilestone(data?.data?.job?.milestones[0]);
    } catch (error: any) {
      console.log("error getting job info", error);
      showToast({
        message: "Network error, try again later",
        type: "error",
        autoClose: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobInfo();
  }, [jobId]);

  return {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
    analytics,
  };
};
