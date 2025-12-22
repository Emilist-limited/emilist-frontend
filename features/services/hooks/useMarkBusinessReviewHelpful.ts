import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useMarkBusinessReviewHelpful = () => {
  const { showToast } = useToast();

  const markReviewBusinessHelpful = async (
    reviewId: string,
    status: boolean
  ) => {
    try {
      await axiosInstance.patch(`/business/mark-helpul-review/${reviewId}`, {
        isHelpful: status,
      });
      showToast({
        message: "Thanks for your feedback!",
        type: "error",
      });
    } catch (error) {
      console.log("error updating business review helpful", error);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    markReviewBusinessHelpful,
  };
};
