import { useState } from "react";

import { axiosInstance } from "../api/axiosInstance";
import { promiseErrorFunction } from "../helpers/promiseError";
import { useToast } from "./useToast";

export const useVerifyPaymentStatus = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | boolean>(null);

  const verifyPaymentStatus = async (referenceId: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/transaction/verify-paystack-payment/${referenceId}`
      );
      if (data?.message === "success") {
        setStatus(true);
      }
    } catch (error) {
      console.log("error verifying payment status", error);
      setStatus(false);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    status,
    verifyPaymentStatus,
  };
};
