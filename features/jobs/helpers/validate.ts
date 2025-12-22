import { ShowToastFunction } from "@/types";
import { MilestonePer, PlannedJobType } from "../types";
import { removeCommas } from "@/lib/helpers/removeCommas";

export const validateTotalPercentage = (
  percentage: string[],
  showToast: ShowToastFunction
) => {
  const totalPercentage = percentage.reduce((sum, p) => sum + Number(p), 0);
  if (totalPercentage !== 100) {
    showToast({
      message: "Total percentage sum must equal 100%",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
};

export const validateBusiness = (
  currentUser: any,
  businessId: string,
  showToast: ShowToastFunction
): boolean => {
  if (!currentUser?.businesses?.length) {
    showToast({
      message: "Please create a business before applying for a job",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  if (!businessId) {
    showToast({
      message: "Please select a business before applying for a job",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
};

export const validateUser = (
  isUserValid: boolean | null,
  showToast: ShowToastFunction
) => {
  if (!isUserValid) {
    showToast({
      message: "Invalid user invite. Please check the email or username.",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
};

export const isLocationFilled = (
  location: string,
  showToast: ShowToastFunction
) => {
  if (!location) {
    showToast({
      message: "Please select a location.",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
};

export const validatePercentages = (
  percentage: number[],
  showToast: ShowToastFunction
) => {
  const totalPercentage = percentage.reduce((sum, p) => sum + p, 0);
  if (totalPercentage > 100) {
    showToast({
      message: "Total percentage cannot exceed 100",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
};

export const validate100Percentage = (
  percentage: number[],
  showToast: ShowToastFunction
) => {
  const totalPercentage = percentage.reduce((sum, p) => sum + p, 0);
  if (totalPercentage !== 100) {
    showToast({
      message: "Total percentage must equal 100",
      type: "error",
      duration: 8000,
    });
    return false;
  }
  return true;
};

export const validateMilestoneAmounts = (
  milestones: MilestonePer[],
  budget: string
) => {
  const totalAmount = milestones.reduce((total, milestone) => {
    const amount = Number(milestone.amount);
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);
  const budgetAmount = Number(removeCommas(budget));
  return totalAmount === budgetAmount;
};

export const validatePlannedJob = (
  plannedJob: PlannedJobType,
  showToast: ShowToastFunction
) => {
  const { frequency, startDate, endDate } = plannedJob;

  if (!frequency) {
    showToast({
      message: "Please select a frequency for the planned job.",
      type: "error",
      duration: 8000,
    });
    return false;
  }

  if (!startDate || !endDate) {
    showToast({
      message: "Please select both start and end dates.",
      type: "error",
      duration: 8000,
    });
    return false;
  }

  if (new Date(startDate) >= new Date(endDate)) {
    showToast({
      message: "Start date must be before the end date.",
      type: "error",
      duration: 8000,
    });
    return false;
  }

  return true;
};
