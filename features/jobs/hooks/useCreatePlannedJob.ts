import { FormEventHandler, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLocation } from "@/lib/hooks/useLocation";
import { useImageUpload } from "./useImageUpload";
import { usePostJobState } from "./usePostJobState";
import { useMilestoneValidation } from "./useMilestoneValidation";
import { useUserVerification } from "@/features/auth/hooks/useUserVerification";
import { useMilestones } from "./useMilestones";
import { useToast } from "@/lib/hooks/useToast";
import { AuthContext } from "@/lib/context/AuthState";
import { handleLoginError } from "@/lib/helpers/handleLoginError";
import {
  isLocationFilled,
  validatePlannedJob,
  validateUser,
} from "../helpers/validate";
import { handleErrorCheck, isAllMilestoneFilled } from "../helpers";
import { handleInputFieldError } from "@/lib/helpers/handleInputFieldError";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";

export const useCreatePlannedJob = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const {
    postJob: plannedMaintenance,
    setPostJob: setPlannedMaintenance,
    loading,
    setLoading,
    handleChange,
    handleLevelChange,
    nextPage,
    setNextPage,
    plannedJob,
    setPlannedJob,
    handleChangePlannedJob,
    reminderDates,
    setReminderDates,
    addReminder,
    removeReminder,
    handleReminderDatesChange,
  } = usePostJobState();

  const {
    milestonesData,
    updateMilestonesData,
    validateMilestoneAmounts,
    adjustMilestoneCount,
    setMilestonesData,
  } = useMilestones(
    [
      {
        duration: "",
        durationType: "days",
        details: "",
        amount: 0,
        percentage: 0,
      },
    ],
    plannedMaintenance.budget
  );

  const {
    selectedImages,
    selectedImageFiles,
    onSelectFile,
    handleImageDelete,
    setSelectedImageFiles,
    setSelectedImages,
  } = useImageUpload();
  const { location, setLocation, validateLocation } = useLocation();
  const { validateMilestoneDuration } = useMilestoneValidation();
  const { isUserValid, onBlurVerify } = useUserVerification();

  useEffect(() => {
    if (plannedMaintenance.milestonesnumber) {
      adjustMilestoneCount(Number(plannedMaintenance.milestonesnumber));
    }
  }, [plannedMaintenance.milestonesnumber]);

  const transformedData = milestonesData.map((milestone) => ({
    timeFrame: {
      number: Number(milestone.duration),
      period: milestone.durationType,
    },
    achievement: milestone.details,
    amount: milestone.amount,
  }));

  const handleSubmitPostJob: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const projectDuration = {
      durationNumber: plannedMaintenance?.projectDuration,
      durationType: plannedMaintenance?.projectDurationType,
    };

    if (!currentUser) {
      return handleLoginError(showToast);
    }
    if (!validateUser(isUserValid, showToast)) {
      return;
    } else if (handleErrorCheck(plannedMaintenance, location, "direct")) {
      return handleInputFieldError(showToast);
    } else if (isAllMilestoneFilled(milestonesData)) {
      return showToast({
        message: "Please fill all milestone fields.",
        type: "error",
        duration: 8000,
      });
    } else if (!isLocationFilled(location, showToast)) {
      return;
    } else if (!(await validateLocation(location))) {
      return showToast({
        message: "Please select a valid location.",
        type: "error",
        duration: 8000,
      });
    } else if (!validateMilestoneDuration(projectDuration, milestonesData)) {
      return showToast({
        message: "Total milestones duration can't exceed project duration!",
        type: "error",
        duration: 8000,
      });
    } else if (
      !validateMilestoneAmounts(milestonesData, plannedMaintenance.budget)
    ) {
      return showToast({
        message: "Milestone amounts must add up to the total budget.",
        type: "error",
        duration: 8000,
      });
    } else if (!validatePlannedJob(plannedJob, showToast)) {
      return;
    }

    setLoading(true);
    try {
      const {
        invite,
        category,
        service,
        projectTitle,
        description,
        projectDuration,
        projectDurationType,
        expertLevel,
        budget,
        currency,
      } = plannedMaintenance;

      const { frequency, startDate, endDate } = plannedJob;

      const properProjectDuration = {
        number: Number(projectDuration),
        period: projectDurationType,
      };

      const payload: any = {
        invite,
        title: projectTitle,
        category,
        service,
        location,
        description,
        currency,
        budget: Number(removeCommas(budget)),
        expertLevel,
        duration: properProjectDuration,
        milestones: transformedData,
        frequency,
        startDate,
        endDate,
        reminderDates,
        achievementDetails: "gg",
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
      formData.append("budget", payload.budget);
      //   formData.append("type", "direct");
      formData.append("achievementDetails", payload.achievementDetails);
      formData.append("currency", payload.currency);
      formData.append("artisan", payload?.invite);
      formData.append("frequency", payload?.frequency);
      formData.append("startDate", payload?.startDate);
      formData.append("endDate", payload?.endDate);

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

      payload?.reminderDates.forEach((reminder: any, index: number) => {
        formData.append(`reminderDates[${index}][day]`, reminder);
      });

      for (let i = 0; i < selectedImageFiles?.length; i++) {
        formData.append("files", selectedImageFiles[i]);
      }

      await axiosInstance.post(`/jobs/create-recurring-job`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast({
        message: "Planned Maintenance created successfully!",
        type: "success",
        duration: 8000,
      });
      setPlannedMaintenance({
        invite: "",
        category: "",
        service: "",
        projectTitle: "",
        description: "",
        projectDuration: "",
        projectDurationType: "days",
        budget: "",
        maximumPrice: "",
        bidRange: "",
        currency: "NGN",
        expertLevel: "four",
        milestonesnumber: 1,
      });
      setLocation("");
      setSelectedImageFiles([]);
      setSelectedImages([]);
      setMilestonesData([
        {
          duration: "",
          durationType: "days",
          details: "",
          amount: 0,
          percentage: 0,
        },
      ]);
      setPlannedJob({
        frequency: "",
        startDate: "",
        endDate: "",
      });
      setReminderDates([]);
      setNextPage(1);
      router.push(ROUTES?.DASHBOARD_USER_JOBS);
    } catch (error: any) {
      console.log("error creating direct contract", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSelectFile,
    handleImageDelete,
    handleChange,
    milestonesData,
    plannedJob,
    plannedMaintenance,
    handleSubmitPostJob,
    loading,
    selectedImages,
    setSelectedImages,
    updateMilestonesData,
    location,
    setLocation,
    isUserValid,
    onBlurVerify,
    handleLevelChange,
    addReminder,
    removeReminder,
    nextPage,
    setNextPage,
    handleReminderDatesChange,
    handleChangePlannedJob,
    reminderDates,
  };
};
