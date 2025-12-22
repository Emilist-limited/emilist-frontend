import { useState } from "react";

import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export const useDeactivateUser = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeactivateUser = async () => {
    setIsLoading(true);
    try {
      axiosInstance.patch(`/auth/deactivate-user`);
      setIsOpen(false);
      showToast({
        message:
          "Your account has been deactivated successfully. Reach out to support to activate account",
        type: "success",
        autoClose: false,
      });
      router.push(ROUTES.HOME);
    } catch (error) {
      console.log("error deactivating user", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDeactivateUser,
    isLoading,
    onToggleModal,
    isOpen,
  };
};
