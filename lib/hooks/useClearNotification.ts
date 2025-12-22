import { useState } from "react";

import { axiosInstance } from "../api/axiosInstance";
import { useToast } from "./useToast";
import { promiseErrorFunction } from "../helpers/promiseError";

export const useClearNotification = () => {
  const { showToast } = useToast();
  const [load, setLoad] = useState(false);

  const clearNotification = async (
    notificationId: string,
    onSuccess?: () => void
  ) => {
    setLoad(true);
    try {
      await axiosInstance.delete(
        `/notification/clear-notification/${notificationId}`
      );
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("error clearing notification", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoad(false);
    }
  };

  return {
    load,
    clearNotification,
  };
};
