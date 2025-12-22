import { useRouter } from "next/navigation";

import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { useConfirmJobPaymentState } from "./useConfirmJobPaymentState";
import { initiateJobPayment } from "../api/jobPayment";

export const useConfirmJobPayment = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    currency,
    setCurrency,
    loadingPayment,
    setLoaingPayment,
    openPaymentModal,
    setOpenPaymentModal,
    isAdditionalAmount,
    setIsAdditionalAmount,
    paymentDetails,
    handlePaymentChange,
    onCancelPayment,
  } = useConfirmJobPaymentState();

  const emilistUrl = process.env.NEXT_PUBLIC_EMILIST_URL;

  const confirmPayment = async (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string,
    jobId: string
  ) => {
    e.preventDefault();

    const { paymentMethod, note } = paymentDetails;

    try {
      const data = await initiateJobPayment(
        paymentMethod,
        currency,
        milestoneId,
        note,
        isAdditionalAmount,
        jobId,
        setLoaingPayment,
        showToast
      );
      const { paymentLink } = data?.data;
      if (paymentMethod === "Card" && paymentLink) {
        router.push(paymentLink);
      }
      if (paymentMethod === "Wallet" && data?.message === "success") {
        router.push(`${emilistUrl}/status?status=success`);
      }
      setOpenPaymentModal(false);
    } catch (error) {
      console.log("error confirming payment", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoaingPayment(false);
    }
  };

  return {
    confirmPayment,
    loadingPayment,
    onCancelPayment,
    paymentDetails,
    handlePaymentChange,
    openPaymentModal,
    setOpenPaymentModal,
    currency,
    setCurrency,
    isAdditionalAmount,
    setIsAdditionalAmount,
  };
};
