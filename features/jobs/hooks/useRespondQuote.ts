import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useApplyJobState } from "./useApplyJobState";
import { validateTotalPercentage } from "../helpers/validate";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useRespondQuote = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const {
    isApplying: isSubmitting,
    setIsApplying: setIsSubmitting,
    openBidModal: isOpen,
    setOpenBidModal: setIsOpen,
    percentage,
    setPercentage,
    maxPrice: amount,
    setMaxPrice: setAmount,
    milestones,
    setMilestones,
    handleChange,
    handleCancelBidModal: onCancelModal,
    handleAchievementChange,
    handleSetPercentage,
  } = useApplyJobState();

  const handlePercentageBlur = useCallback(() => {
    if (percentage.length > 0 && Number(percentage[0]) !== 0) {
      validateTotalPercentage(percentage, showToast);
    }
  }, [percentage, validateTotalPercentage]);

  const respondQuote = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    onSuccess: () => void
  ) => {
    e.preventDefault();
    if (!currentUser) {
      return router.push(ROUTES?.LOGIN);
    }

    if (!amount) {
      return showToast({
        message: `Please provide Price/amount!`,
        type: "error",
      });
    }
    if (!validateTotalPercentage(percentage, showToast)) {
      return;
    }
    setIsSubmitting(true);
    try {
      await axiosInstance.patch(`/jobs/post-quote`, {
        jobId,
        totalAmount: Number(removeCommas(amount.toString())),
        milestones,
      });
      showToast({ message: "Quote sent!", type: "success", duration: 8000 });
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.log("error responding to quote", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    amount,
    setAmount,
    milestones,
    respondQuote,
    handleChange,
    onCancelModal,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
    handleSetPercentage,
    isOpen,
    setIsOpen,
    handlePercentageBlur,
  };
};
