import { FormEventHandler, useContext, useEffect } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { Milestone } from "../types";
import { useImageUpload } from "./useImageUpload";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useEditJobState } from "./useEditJobState";
import { useMilestoneValidation } from "./useMilestoneValidation";
import { AuthContext } from "@/lib/context/AuthState";
import { handleLoginError } from "@/lib/helpers/handleLoginError";
import { handleEditJobErrorCheck, isMilestoneFilled } from "../helpers";
import { handleInputFieldError } from "@/lib/helpers/handleInputFieldError";
import { useLocation } from "@/lib/hooks/useLocation";
import { validate100Percentage } from "../helpers/validate";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { goBack } from "@/lib/helpers/goBack";
import { m } from "framer-motion";

export const useEditJob = (jobId: string) => {
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const { validateLocation } = useLocation();
  const { validateMilestoneDuration } = useMilestoneValidation();

  const {
    loading,
    setLoading,
    isFetching,
    setIsFetching,
    percentage,
    setPercentage,
    jobInfo,
    setJobInfo,
    UpdatedMilestone,
    handleLevelChange,
    handleInputChange,
    handleMilestoneChange,
    handlePercentageChange,
    handleMilestoneInputChange,
    handleMilestoneNumberChange,
    handleBlur,
  } = useEditJobState();

  const {
    selectedImages,
    selectedImageFiles,
    onSelectFile,
    handleImageDelete,
    setSelectedImages,
    fetchedImages,
    setFetchedImages,
  } = useImageUpload();

  const getJobInfo = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/jobs/fetch-job-by-id?id=${jobId}`
      );
      const jobData = data?.data?.job;

      setJobInfo(jobData);
      setFetchedImages(jobData?.jobFiles);
      const milestoneLength = jobData?.milestones?.length || 0;

      const biddableInitialPercentages = jobData.milestones.map(
        (milestone: Milestone) =>
          (milestone.amount / jobData.maximumPrice) * 100
      );

      const initialPercentages = jobData.milestones.map(
        (milestone: Milestone) => (milestone.amount / jobData.budget) * 100
      );

      setPercentage(
        jobData?.type === "biddable"
          ? biddableInitialPercentages
          : initialPercentages
      );

      setJobInfo((prevJob) => ({
        ...prevJob,
        milestoneNumber: milestoneLength,
      }));
      setIsFetching(false);
    } catch (error: any) {
      console.log("error getting job info", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getJobInfo();
  }, [jobId]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const projectDuration = {
      durationNumber: jobInfo?.duration?.number.toString(),
      durationType: jobInfo?.duration?.period,
    };

    if (!currentUser) {
      return handleLoginError(showToast);
    } else if (
      jobInfo?.type === "biddable" &&
      handleEditJobErrorCheck(jobInfo, "biddable")
    ) {
      return handleInputFieldError(showToast);
    } else if (
      jobInfo?.type === "regular" &&
      handleEditJobErrorCheck(jobInfo, "regular")
    ) {
      return handleInputFieldError(showToast);
    } else if (
      jobInfo?.type === "direct" &&
      handleEditJobErrorCheck(jobInfo, "direct")
    ) {
      return handleInputFieldError(showToast);
    } else if (!(await validateLocation(jobInfo?.location))) {
      return showToast({
        message: "Please select a valid location.",
        type: "error",
        duration: 8000,
      });
    } else if (
      !validateMilestoneDuration(projectDuration, UpdatedMilestone())
    ) {
      return showToast({
        message: `Total milestones duration must add up to ${jobInfo?.duration?.number} ${jobInfo?.duration?.period} project duration!`,
        type: "error",
        duration: 8000,
      });
    } else if (!validate100Percentage(percentage, showToast)) {
      return;
    } else if (isMilestoneFilled(jobInfo.milestones)) {
      return showToast({
        message: "Please fill all milestone fields.",
        type: "error",
        duration: 8000,
      });
    }

    const {
      category,
      service,
      title,
      type,
      description,
      duration,
      location,
      expertLevel,
      maximumPrice,
      bidRange,
      budget,
      milestones,
      currency,
    } = jobInfo;

    const budgetedAmount = budget || 0;
    const maxPrice = maximumPrice || 0;
    const bid = bidRange || 0;
    setLoading(true);
    try {
      const payload: any = {
        title,
        category,
        service,
        location,
        description,
        type,
        expertLevel,
        duration,
        budget: removeCommas(budgetedAmount.toString()),
        bidRange: removeCommas(bid.toString()),
        maximumPrice: removeCommas(maxPrice.toString()),
        milestones,
        currency,
      };

      const formData = new FormData();
      formData.append("category", payload.category);
      formData.append("service", payload.service);
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("duration[number]", payload.duration.number);
      formData.append("duration[period]", payload.duration.period);
      formData.append("location", payload.location);
      formData.append("expertLevel", payload.expertLevel);
      formData.append("currency", payload.currency);
      formData.append("type", payload.type);

      if (payload.type === "biddable") {
        formData.append("maximumPrice", payload.maximumPrice);
        formData.append("bidRange", payload.bidRange);
      } else {
        formData.append("budget", payload.budget);
      }

      payload.milestones.forEach((milestone: any, index: number) => {
        formData.append(
          `milestones[${index}][timeFrame][number]`,
          milestone.timeFrame.number
        );
        formData.append(
          `milestones[${index}][timeFrame][period]`,
          milestone.timeFrame.period
        );
        formData.append(
          `milestones[${index}][achievement]`,
          milestone.achievement
        );
        formData.append(`milestones[${index}][amount]`, milestone.amount);
      });

      for (let i = 0; i < selectedImageFiles.length; i++) {
        formData.append("files", selectedImageFiles[i]);
      }

      await axiosInstance.put(`/jobs/update-job/${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast({
        message: "Job edited successfully!",
        type: "success",
        duration: 8000,
      });
      goBack();
    } catch (error: any) {
      console.log("error editing biddable job", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobInfo,
    setJobInfo,
    getJobInfo,
    onSelectFile,
    handleSubmit,
    percentage,
    isFetching,
    loading,
    handleImageDelete,
    setSelectedImages,
    fetchedImages,
    selectedImages,
    handleLevelChange,
    handleInputChange,
    handleMilestoneChange,
    handlePercentageChange,
    handleMilestoneInputChange,
    handleMilestoneNumberChange,
    handleBlur,
  };
};
