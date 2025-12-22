import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useEffect } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { usePostJobState } from "./usePostJobState";
import { useMilestones } from "./useMilestones";
import { useImageUpload } from "./useImageUpload";
import { useLocation } from "@/lib/hooks/useLocation";
import { useMilestoneValidation } from "./useMilestoneValidation";
import { useUserVerification } from "@/features/auth/hooks/useUserVerification";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { handleLoginError } from "@/lib/helpers/handleLoginError";
import { useToast } from "@/lib/hooks/useToast";
import { handleInputFieldError } from "@/lib/helpers/handleInputFieldError";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { handleErrorCheck, isAllMilestoneFilled } from "../helpers";
import { ROUTES } from "@/lib/constants/routes";
import { isLocationFilled, validateUser } from "../helpers/validate";

export const useCreateDirectContract = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const {
    postJob: createDirectContractJob,
    setPostJob: setCreateDirectContractJob,
    handleChange,
    loading,
    setLoading,
    handleLevelChange,
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
    createDirectContractJob.budget
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
    if (createDirectContractJob.milestonesnumber) {
      adjustMilestoneCount(Number(createDirectContractJob.milestonesnumber));
    }
  }, [createDirectContractJob.milestonesnumber]);

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
      durationNumber: createDirectContractJob?.projectDuration,
      durationType: createDirectContractJob?.projectDurationType,
    };

    if (!currentUser) {
      return handleLoginError(showToast);
    }
    if (!validateUser(isUserValid, showToast)) {
      return;
    } else if (handleErrorCheck(createDirectContractJob, location, "direct")) {
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
      !validateMilestoneAmounts(milestonesData, createDirectContractJob.budget)
    ) {
      return showToast({
        message: "Milestone amounts must add up to the total budget.",
        type: "error",
        duration: 8000,
      });
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
      } = createDirectContractJob;

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
      formData.append("type", "direct");
      formData.append("achievementDetails", payload.achievementDetails);
      formData.append("currency", payload.currency);
      formData.append("artisan", payload?.invite);

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

      for (let i = 0; i < selectedImageFiles?.length; i++) {
        formData.append("files", selectedImageFiles[i]);
      }

      await axiosInstance.post(`/jobs/create-job`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast({
        message: "Direct contract created successfully!",
        type: "success",
        duration: 8000,
      });
      setCreateDirectContractJob({
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
    createDirectContractJob,
    setCreateDirectContractJob,
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
  };
};
