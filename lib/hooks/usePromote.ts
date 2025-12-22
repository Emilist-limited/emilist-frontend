import { axiosInstance } from "../api/axiosInstance";
import { validatePromoStates } from "../helpers/errors";
import { promiseErrorFunction } from "../helpers/promiseError";
import { usePromoteState } from "./usePromoteState";
import { useToast } from "./useToast";

export const usePromote = () => {
  const { showToast } = useToast();
  const {
    isOpen,
    setIsOpen,
    endDate,
    setEndDate,
    isLoad,
    setIsLoad,
    startDate,
    setStartDate,
    target,
    setTarget,
    expectedClicks,
    handleClickChange,
    setExpectedClicks,
  } = usePromoteState();

  const handlePromote = async (type: string, id: string) => {
    if (
      !validatePromoStates(
        endDate,
        startDate,
        target,
        expectedClicks,
        showToast
      )
    ) {
      return;
    }
    setIsLoad(true);
    try {
      const payload = {
        target,
        startDate,
        endDate,
        type,
        expectedClicks: Number(expectedClicks),
      };
      await axiosInstance.post(`/subscription/promote/${id}`, payload);
      showToast({
        message: "Promotion successful!",
        type: "success",
        duration: 8000,
      });
      setEndDate("");
      setStartDate("");
      setTarget("");
      setExpectedClicks("");
      setIsOpen(false);
    } catch (error) {
      console.log("error promoting", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoad(false);
    }
  };

  return {
    expectedClicks,
    handleClickChange,
    target,
    setTarget,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoad,
    handlePromote,
    isOpen,
    setIsOpen,
  };
};
