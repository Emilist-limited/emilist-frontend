import { useState } from "react";

import { MilestonePer } from "../types";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { useToast } from "@/lib/hooks/useToast";
import { validateMilestoneAmounts } from "../helpers/validate";

export const useMilestones = (
  initialMilestones: MilestonePer[],
  budget: string,
) => {
  const { showToast } = useToast();

  const [milestonesData, setMilestonesData] =
    useState<MilestonePer[]>(initialMilestones);

  const updateMilestonesData = (
    value: string | number,
    index: number,
    field: keyof MilestonePer,
  ) => {
    const updatedMilestones: any = [...milestonesData];
    updatedMilestones[index][field] = value;

    if (field === "duration") {
      updatedMilestones[index].duration = formatInputTextNumber(
        value.toString(),
      );
    } else if (field === "percentage") {
      let numericValue = Number(value);
      if (isNaN(numericValue)) return;
      if (numericValue > 100) {
        showToast({
          type: "error",
          message: "Percentage cannot be more than 100%",
          duration: 8000,
        });
        return;
      }
      updatedMilestones[index].percentage = numericValue;
      const budgetAmount = removeCommas(budget);
      updatedMilestones[index].amount = parseFloat(
        ((numericValue / 100) * Number(budgetAmount)).toFixed(2),
      );
    } else {
      updatedMilestones[index][field] = value;
    }

    setMilestonesData(updatedMilestones);
    return validateMilestoneAmounts(updatedMilestones, budget);
  };

  const adjustMilestoneCount = (count: number) => {
    const newMilestones = [...milestonesData];
    while (newMilestones.length < count) {
      newMilestones.push({
        duration: "",
        durationType: "days",
        details: "",
        amount: 0,
        percentage: 0,
      });
    }
    while (newMilestones.length > count) {
      newMilestones.pop();
    }
    setMilestonesData(newMilestones);
  };

  return {
    milestonesData,
    updateMilestonesData,
    validateMilestoneAmounts,
    adjustMilestoneCount,
    setMilestonesData,
  };
};
