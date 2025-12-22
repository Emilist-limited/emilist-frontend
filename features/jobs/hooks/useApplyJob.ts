import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";
import { useApplyJobState } from "./useApplyJobState";
import { useToast } from "@/lib/hooks/useToast";
import { validateBusiness, validateTotalPercentage } from "../helpers/validate";

type JobType = "regular" | "biddable";

export const useApplyJob = (type: JobType) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const {
    isApplying,
    setIsApplying,
    openBidModal,
    setOpenBidModal,
    percentage,
    setPercentage,
    maxPrice,
    setMaxPrice,
    milestones,
    setMilestones,
    handleChange,
    handleCancelBidModal,
    handleAchievementChange,
    handleSetPercentage,
  } = useApplyJobState();

  const handlePercentageBlur = useCallback(() => {
    if (percentage?.length > 0 && Number(percentage[0]) !== 0) {
      validateTotalPercentage(percentage, showToast);
    }
  }, [percentage, validateTotalPercentage]);

  const applyForBiddableJob = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    businessId: string,
    onSuccess: () => void
  ) => {
    e.preventDefault();

    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
    }

    if (!validateBusiness(currentUser, businessId, showToast)) {
      return;
    }

    if (type === "biddable") {
      if (!validateTotalPercentage(percentage, showToast)) {
        return;
      }
    }
    setIsApplying(true);

    try {
      const basePayload = {
        jobId,
        type,
        businessId,
      };

      const payload =
        type === "biddable"
          ? {
              ...basePayload,
              maximumPrice: Number(removeCommas(maxPrice.toString())),
              milestones,
            }
          : basePayload;

      await axiosInstance.post(`/jobs/apply-job`, payload);
      showToast({
        message: "Successfully applied for the job",
        type: "success",
        duration: 8000,
      });
      setOpenBidModal(false);
      onSuccess();
    } catch (error: any) {
      console.log("error applying for biddable job", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsApplying(false);
    }
  };

  return {
    applyForBiddableJob,
    isApplying,
    handleSetPercentage,
    setMaxPrice,
    maxPrice,
    milestones,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
    handleAchievementChange,
    setMilestones,
    setPercentage,
    percentage,
    handleChange,
    handlePercentageBlur,
  };
};
