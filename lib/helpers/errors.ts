import { ShowToastFunction } from "@/types";

export const validatePromoStates = (
  endDate: string,
  startDate: string,
  target: string,
  expectedClicks: string,
  showToast: ShowToastFunction
) => {
  if (!endDate || !startDate || !target || !expectedClicks) {
    showToast({
      message: "Please fill all fields",
      type: "error",
      duration: 80000,
    });
    return false;
  }
  return true;
};
