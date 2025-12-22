import { ChangeEvent, useState } from "react";

import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { invoiceInfoType } from "../types";

export const useUploadInvoiceState = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openInvoice, setOpenInvoice] = useState<boolean>(false);
  const [invoiceInfo, setInvoiceInfo] = useState<invoiceInfoType>({
    additionalAmount: "",
    note: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInvoiceInfo({
      ...invoiceInfo,
      [name]:
        name === "additionalAmount"
          ? formatInputTextNumberWithCommas(value)
          : value,
    });
  };

  return {
    isSubmitting,
    setIsSubmitting,
    openInvoice,
    setOpenInvoice,
    invoiceInfo,
    setInvoiceInfo,
    handleChange,
  };
};
