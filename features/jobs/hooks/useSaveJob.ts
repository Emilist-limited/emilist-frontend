import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useSaveJob = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveJob = async (jobId: string, onSuccess: () => void) => {
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }
    try {
      setLoading(true);
      await axiosInstance.post(`/jobs/like-job/${jobId}`);
      if (onSuccess) {
        onSuccess();
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error saving job", error);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    loading,
    handleSaveJob,
  };
};
