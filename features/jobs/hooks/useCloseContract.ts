import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { useCloseContractState } from "./useCloseContractState";

export const useCloseContract = () => {
  const { showToast } = useToast();
  const {
    onCancel,
    loadingContract,
    setLoaingContract,
    openContractModal,
    setOpenContractModal,
    rateServiceProvider,
    setRateServiceProvider,
    rateServiceRendered,
    setRateServiceRendered,
    contractDetails,
    handleContractChange,
  } = useCloseContractState();

  const closeContract = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    onSuccess: () => void
  ) => {
    e.preventDefault();

    const { review, recommendVendor } = contractDetails;
    if (!review || !recommendVendor) {
      showToast({
        message: `Please fill all fields`,
        type: "error",
        duration: 8000,
      });
      return;
    }
    let isRecommendVendor =
      recommendVendor === "Yes"
        ? true
        : recommendVendor === "No"
        ? false
        : null;

    setLoaingContract(true);
    try {
      const contractData = {
        isRecommendVendor,
        rating: rateServiceProvider,
        rateCommunication: rateServiceRendered,
        note: review,
      };
      await axiosInstance.patch(`/jobs/close-contract/${jobId}`, contractData);
      showToast({
        message: `Congrats 🎊🎊, Contract closed successfully`,
        type: "success",
        duration: 8000,
      });
      if (onSuccess) {
        onSuccess();
      }
      setOpenContractModal(false);
    } catch (error: any) {
      console.log("error closing job contract", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoaingContract(false);
    }
  };

  return {
    closeContract,
    loadingContract,
    onCancel,
    contractDetails,
    handleContractChange,
    openContractModal,
    setOpenContractModal,
    setRateServiceRendered,
    setRateServiceProvider,
    rateServiceProvider,
    rateServiceRendered,
  };
};
