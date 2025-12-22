import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";

export const useGetProjectAnalytics = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [projectAnalytics, setProjectAnalytics] = useState<any>({});

  const getUserProjectAnalytics = async () => {
    if (!currentUser) {
      router.push(ROUTES.LOGIN);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/jobs/fetch-project-count`);
      setProjectAnalytics(data?.data);
    } catch (error: any) {
      console.log("error getting project analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProjectAnalytics();
  }, [currentUser?.unique_id]);

  return {
    loading,
    projectAnalytics,
  };
};
