import { useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";

export const useDeleteJob = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteJob = async (jobId: string) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/jobs/delete-job/${jobId}`);
      showToast({
        message: "Job deleted successfully",
        type: "success",
      });
      router.push(ROUTES?.DASHBOARD_USER_JOBS);
    } catch (error: any) {
      console.log("error deleting  jobb", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteJob,
    isDeleting,
  };
};
