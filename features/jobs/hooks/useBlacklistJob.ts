import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useBlacklistJob = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const handleBlackListJob = async (jobId: string, onSuccess: () => void) => {
    if (!currentUser) {
      return router.push("/login");
    }

    try {
      await axiosInstance.get(`/jobs/mute-job/${jobId}`);
      showToast({
        message: `You have successfully blacklisted this job`,
        type: "error",
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.log(error);
      promiseErrorFunction(error, showToast);
    }
  };

  return {
    handleBlackListJob,
  };
};
