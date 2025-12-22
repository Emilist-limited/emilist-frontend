import { useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useAcceptQuote = () => {
  const { showToast } = useToast();

  const [loadingAcceptQuote, setLoadingAceeptQuote] = useState(false);
  const [openQuoteInfoModal, setOpenQuoteInfoModal] = useState(false);

  const onToggleQuoteInfo = () => {
    setOpenQuoteInfoModal((prev) => !prev);
  };

  const acceptQuote = async (
    quoteId: string,
    status: string,
    onSuccess: () => void
  ) => {
    setLoadingAceeptQuote(true);
    try {
      const acceptQuotePayload = {
        status,
      };

      await axiosInstance.patch(
        `/jobs/update-quote-status/${quoteId}`,
        acceptQuotePayload
      );
      showToast({
        message: `Quote accepted successfully`,
        type: "success",
        duration: 8000,
      });
      setLoadingAceeptQuote(false);
      setOpenQuoteInfoModal(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.log("error accepting quote", error);
      setLoadingAceeptQuote(false);
      promiseErrorFunction(error, showToast);
    }
  };
  return {
    acceptQuote,
    loadingAcceptQuote,
    onToggleQuoteInfo,
    openQuoteInfoModal,
  };
};
