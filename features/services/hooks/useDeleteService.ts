import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useDeleteService = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser, refreshUser } = useContext(AuthContext);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleDeleteService = async (expertId: string) => {
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
      return;
    }
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(`/business/delete-business/${expertId}`);
      showToast({ message: `Business deleted!`, type: "success" });
      refreshUser();
      router.push(ROUTES?.DASHBOARD_EXPERT);
    } catch (error: any) {
      console.log("error deleting service", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsDeleteLoading(false);
    }
  };
  return {
    handleDeleteService,
    isDeleteLoading,
  };
};
