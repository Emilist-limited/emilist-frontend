import { Dispatch, SetStateAction } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { ShowToastFunction } from "@/types";

export const initiateJobPayment = async (
  paymentMethod: string,
  currency: string,
  milestoneId: string,
  note: string,
  isAdditionalAmount: boolean,
  jobId: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  showToast: ShowToastFunction
) => {
  if (!paymentMethod) {
    showToast({
      message: `Please select payment method`,
      type: "error",
      duration: 8000,
    });
    return;
  }
  if (!currency) {
    showToast({
      message: `Please select currency`,
      type: "error",
      duration: 8000,
    });
    return;
  }
  setIsLoading(true);
  try {
    const paymentData = {
      jobId,
      milestoneId,
      currency,
      paymentMethod,
      note,
      isAdditionalAmount,
    };

    const { data } = await axiosInstance.post(`/jobs/pay-for-job`, paymentData);
    return data;
  } catch (error) {
    console.log("error confirming payment", error);
    throw error;
  }
};
