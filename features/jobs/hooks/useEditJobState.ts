import { ChangeEvent, useEffect, useState } from "react";

import { Jobs, Milestone, MilestonePer, TimeFrameType } from "../types";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { useToast } from "@/lib/hooks/useToast";
import { validatePercentages } from "../helpers/validate";
import { removeCommas } from "@/lib/helpers/removeCommas";

export const useEditJobState = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [percentage, setPercentage] = useState<number[]>([]);
  const [jobInfo, setJobInfo] = useState<Jobs>({
    _id: "",
    category: "",
    service: "",
    title: "",
    description: "",
    type: "",
    budget: undefined,
    maximumPrice: undefined,
    bidRange: undefined,
    location: "",
    expertLevel: "",
    achievementDetails: "",
    currency: "",
    status: "",
    milestoneNumber: 1,
    userId: {
      _id: "",
      email: "",
      userName: "",
      fullName: "",
      profileImage: "",
      level: "",
      location: "",
    },
    isRequestForQuote: false,
    isClosed: "",
    createdAt: new Date(),
    liked: false,
    milestones: [],
    applications: [],
    jobFiles: [],
    clicks: {
      users: [],
      clickCount: undefined,
    },
    acceptedApplicationId: "",
    startDate: undefined,
    dueDate: undefined,
    milestoneProgress: undefined,
    currentMilestoneDueDate: undefined,
    overallDueDate: undefined,
    duration: {
      number: "",
      period: "",
    },
  });

  const handleLevelChange = (levelNumber: string) => {
    setJobInfo((prev) => ({
      ...prev,
      expertLevel: levelNumber,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setJobInfo((prevJob) => {
      if (name === "number" || name === "period") {
        return {
          ...prevJob,
          duration: {
            ...prevJob.duration,
            [name]: name === "number" ? formatInputTextNumber(value) : value,
          },
        };
      }
      return {
        ...prevJob,
        [name]:
          name === "maximumPrice" || name === "bidRange" || name === "budget"
            ? formatInputTextNumberWithCommas(value)
            : value,
      };
    });
  };

  const handleMilestoneInputChange = (
    index: number,
    parentField: keyof Milestone,
    childField: keyof TimeFrameType,
    value: any
  ) => {
    setJobInfo((prevJob) => {
      const newMilestones = [...prevJob.milestones];

      if (parentField === "timeFrame") {
        newMilestones[index] = {
          ...newMilestones[index],
          [parentField]: {
            ...(newMilestones[index][parentField] as TimeFrameType),
            [childField]:
              childField === "number" ? formatInputTextNumber(value) : value,
          },
        };
      }

      return {
        ...prevJob,
        milestones: newMilestones,
      };
    });
  };

  const handleMilestoneChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newMilestones = [...jobInfo.milestones];
    newMilestones[index] = {
      ...newMilestones[index],
      [name]: name === "milestoneNumber" ? Number(value) : value,
    };
    setJobInfo((prevJob) => ({
      ...prevJob,
      milestones: newMilestones,
    }));
  };

  const handleMilestoneNumberChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newMilestoneNumber = Number(e.target.value);
    setJobInfo((prevJob) => {
      let newMilestoneDetails = [...prevJob.milestones];

      if (newMilestoneNumber > prevJob.milestoneNumber) {
        // Add new milestones
        const milestonesToAdd = newMilestoneNumber - prevJob.milestoneNumber;
        for (let i = 0; i < milestonesToAdd; i++) {
          newMilestoneDetails.push({
            timeFrame: {
              number: "",
              period: "days",
            },
            achievement: "",
            amount: 0,
          });
        }
      } else if (newMilestoneNumber < prevJob.milestoneNumber) {
        // Remove excess milestones
        newMilestoneDetails = newMilestoneDetails.slice(0, newMilestoneNumber);
      }

      return {
        ...prevJob,
        milestoneNumber: newMilestoneNumber,
        milestones: newMilestoneDetails,
      };
    });
  };

  const handlePercentageChange = (index: number, newPercentage: number) => {
    setPercentage((prevPercentages) => {
      const updatedPercentages = [...prevPercentages];
      updatedPercentages[index] = newPercentage;
      return updatedPercentages;
    });

    // Calculate new milestone amount based on updated percentage
    setJobInfo((prevJob) => {
      const updatedMilestones = [...prevJob.milestones];
      const amount = prevJob.maximumPrice || prevJob.budget || 0;
      const maxPrice = removeCommas(amount.toString());
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        amount: (newPercentage / 100) * Number(maxPrice),
      };
      return {
        ...prevJob,
        milestones: updatedMilestones,
      };
    });
  };

  const UpdatedMilestone = (): MilestonePer[] => {
    return jobInfo?.milestones.map((item) => ({
      duration: item.timeFrame?.number.toString(),
      durationType: item.timeFrame?.period,
      details: item.achievement,
      amount: item.amount,
      percentage: 0,
    }));
  };

  const handleBlur = () => {
    validatePercentages(percentage, showToast);
  };

  useEffect(() => {
    if (!jobInfo?.milestones?.length || percentage.length > 0) return;

    const totalAmount =
      jobInfo.type === "biddable"
        ? removeCommas((jobInfo.maximumPrice || 0).toString())
        : removeCommas((jobInfo.budget || 0).toString());

    if (Number(totalAmount) === 0) return;

    const initialPercentages = jobInfo.milestones.map((milestone) =>
      Number(totalAmount) > 0
        ? (milestone.amount / Number(totalAmount)) * 100
        : 0
    );

    setPercentage(initialPercentages);
  }, [
    jobInfo?.milestones,
    jobInfo?.type,
    jobInfo?.maximumPrice,
    jobInfo?.budget,
  ]);

  useEffect(() => {
    if (!jobInfo?.milestones || !percentage?.length) return;

    const totalAmount =
      jobInfo.type === "biddable"
        ? removeCommas((jobInfo.maximumPrice || 0).toString())
        : removeCommas((jobInfo.budget || 0).toString());

    // Only update if amounts would actually change (prevent infinite loop)
    const shouldUpdate = jobInfo.milestones.some((milestone, index) => {
      const expectedAmount = (percentage[index] / 100) * Number(totalAmount);
      return Math.abs(milestone.amount - expectedAmount) > 0.01;
    });

    if (!shouldUpdate) return;

    setJobInfo((prevJob) => {
      const updatedMilestones = prevJob.milestones.map((milestone, index) => {
        const newAmount = (percentage[index] / 100) * Number(totalAmount);
        return {
          ...milestone,
          amount: isNaN(newAmount) ? 0 : newAmount,
        };
      });

      return {
        ...prevJob,
        milestones: updatedMilestones,
      };
    });
  }, [jobInfo?.maximumPrice, jobInfo?.budget, percentage]);

  return {
    loading,
    setLoading,
    percentage,
    isFetching,
    setIsFetching,
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
  };
};
