import { useToast } from "@/lib/hooks/useToast";
import { useUploadInvoiceState } from "./useUploadInvoiceState";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useUploadInvoiceForMilestone = () => {
  const { showToast } = useToast();

  const {
    isSubmitting,
    setIsSubmitting,
    openInvoice,
    setOpenInvoice,
    invoiceInfo,
    setInvoiceInfo,
    handleChange,
  } = useUploadInvoiceState();

  const uploadInvoice = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    milestoneId: string,
    onSuccess: () => void
  ) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const { note, additionalAmount } = invoiceInfo;
      const remmoveCommasAdditionalAmount = removeCommas(additionalAmount);

      const innvoicePayload = {
        status: "completed",
        note,
        additionalAmount: remmoveCommasAdditionalAmount,
      };
      await axiosInstance.patch(
        `/jobs/update-milestone-status/${jobId}/milestone/${milestoneId}`,
        innvoicePayload
      );
      setInvoiceInfo({
        additionalAmount: "",
        note: "",
      });
      showToast({
        message: `Invoice sent!`,
        type: "success",
      });
      setOpenInvoice(false);
      onSuccess();
    } catch (error: any) {
      console.log("error uploading invoice for  milestone", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    uploadInvoice,
    isSubmitting,
    setOpenInvoice,
    openInvoice,
    handleChange,
    invoiceInfo,
  };
};
