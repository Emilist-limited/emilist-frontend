import { ChangeEvent, useState } from "react";

import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { useToast } from "@/lib/hooks/useToast";

interface Milestone {
  milestoneId: string;
  achievement: string;
  amount: number;
}

export const useApplyJobState = () => {
  const { showToast } = useToast();

  const [isApplying, setIsApplying] = useState(false);
  const [openBidModal, setOpenBidModal] = useState(false);
  const [percentage, setPercentage] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | string>(0);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      milestoneId: "",
      achievement: "",
      amount: 0,
    },
  ]);

  const handleCancelBidModal = () => {
    setOpenBidModal(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maximumPrice = formatInputTextNumberWithCommas(value);
    setMaxPrice(maximumPrice);
  };

  const handleSetPercentage = (index: number, value: string) => {
    if (!maxPrice) {
      showToast({
        message: "Please set a maximum price first",
        type: "error",
        duration: 8000,
      });
      return;
    }
    const updatedPercentages = [...percentage];
    updatedPercentages[index] = value;

    const maximumPrice = removeCommas(maxPrice.toString());

    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, i) =>
        i === index
          ? {
              ...milestone,
              amount: (Number(value) / 100) * Number(maximumPrice),
            }
          : milestone
      )
    );

    setPercentage(updatedPercentages);
  };

  const handleAchievementChange = (index: number, newAchievement: string) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, i) =>
        i === index ? { ...milestone, achievement: newAchievement } : milestone
      )
    );
  };

  return {
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
  };
};
