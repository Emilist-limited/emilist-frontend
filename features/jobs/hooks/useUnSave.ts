import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useUnSave = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUnsaveJob = async (jobId: string, onSuccess: () => void) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    try {
      setIsLoading(true);
      await axiosInstance.post(`/jobs/unlike-job/${jobId}`);
      if (onSuccess) {
        onSuccess();
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log("error unsaving job", error);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    isLoading,
    handleUnsaveJob,
  };
};
