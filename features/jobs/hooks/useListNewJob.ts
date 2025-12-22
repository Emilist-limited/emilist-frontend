import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useEffect } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useToast } from "@/lib/hooks/useToast";
import { usePostJobState } from "./usePostJobState";
import { useMilestones } from "./useMilestones";
import { useImageUpload } from "./useImageUpload";
import { useLocation } from "@/lib/hooks/useLocation";
import { useMilestoneValidation } from "./useMilestoneValidation";
import { ROUTES } from "@/lib/constants/routes";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { isLocationFilled } from "../helpers/validate";
import { handleErrorCheck, isAllMilestoneFilled } from "../helpers";
import { handleInputFieldError } from "@/lib/helpers/handleInputFieldError";
import { handleLoginError } from "@/lib/helpers/handleLoginError";

export const useListNewJob = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const {
    postJob: postJobDetails,
    setPostJob: setPostJobDetails,
    handleChange,
    loading,
    setLoading,
    projectType,
    handleLevelChange,
    handleProjectTypeChange,
  } = usePostJobState();

  const amount =
    projectType === "biddable"
      ? postJobDetails.maximumPrice
      : postJobDetails?.budget;

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
    amount
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

  useEffect(() => {
    if (postJobDetails.milestonesnumber) {
      adjustMilestoneCount(Number(postJobDetails.milestonesnumber));
    }
  }, [postJobDetails.milestonesnumber]);

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
      durationNumber: postJobDetails?.projectDuration,
      durationType: postJobDetails?.projectDurationType,
    };

    if (!currentUser) {
      return handleLoginError(showToast);
    } else if (
      projectType === "biddable" &&
      handleErrorCheck(postJobDetails, location, "biddable")
    ) {
      return handleInputFieldError(showToast);
    } else if (
      projectType === "regular" &&
      handleErrorCheck(postJobDetails, location, "regular")
    ) {
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
        message: `Total milestones duration must add up to ${postJobDetails?.projectDuration} ${postJobDetails?.projectDurationType} project duration!`,
        type: "error",
        duration: 8000,
      });
    } else if (!validateMilestoneAmounts(milestonesData, amount)) {
      return showToast({
        message: `Milestone amounts must add up to the total ${
          projectType === "biddable" ? "maximum price" : "budget"
        }.`,
        type: "error",
        duration: 8000,
      });
    }

    setLoading(true);
    try {
      const {
        category,
        service,
        projectTitle,
        description,
        projectDuration,
        projectDurationType,
        expertLevel,
        budget,
        bidRange,
        maximumPrice,
        currency,
      } = postJobDetails;

      const properProjectDuration = {
        number: Number(projectDuration),
        period: projectDurationType,
      };

      const payload: any = {
        title: projectTitle,
        category,
        service,
        location,
        description,
        currency,
        budget: Number(removeCommas(budget)),
        maximumPrice: Number(removeCommas(maximumPrice)),
        bidRange: Number(removeCommas(bidRange)),
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
      formData.append("achievementDetails", payload.achievementDetails);
      formData.append("currency", payload.currency);
      if (projectType === "biddable") {
        formData.append("type", "biddable");
        formData.append("maximumPrice", payload.maximumPrice);
        formData.append("bidRange", payload.bidRange);
      } else if (projectType === "regular") {
        formData.append("type", "regular");
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

      await axiosInstance.post(`/jobs/create-job`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast({
        message: "Job posted successfully!",
        type: "success",
        duration: 8000,
      });
      setPostJobDetails({
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
    postJobDetails,
    setPostJobDetails,
    handleSubmitPostJob,
    loading,
    selectedImages,
    setSelectedImages,
    updateMilestonesData,
    location,
    setLocation,
    projectType,
    handleLevelChange,
    handleProjectTypeChange,
  };
};
