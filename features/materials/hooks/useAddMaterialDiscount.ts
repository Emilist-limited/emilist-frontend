import { useState } from "react";

import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";
import { removeCommas } from "@/lib/helpers/removeCommas";

export const useAddMaterialDiscount = () => {
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<string>("");

  const handleChangeDiscountPrice = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const commasToValue = formatInputTextNumberWithCommas(value);
    setDiscountPrice(commasToValue);
  };

  const addDiscountPrice = async (
    materialId: string,
    originalPrice: number,
    onSuccess: () => void
  ) => {
    const discountedPriceValue = Number(removeCommas(discountPrice));
    if (!discountedPriceValue) {
      return showToast({
        type: "error",
        message: "Please enter a discount price.",
      });
    }
    if (discountedPriceValue >= originalPrice) {
      return showToast({
        type: "error",
        message: "Discount price must be less than the original price.",
      });
    }
    setIsLoading(true);
    try {
      await axiosInstance.patch(
        `/material/add-product-discount/${materialId}`,
        {
          discount: discountedPriceValue,
        }
      );
      showToast({
        type: "success",
        message: "Discount price added successfully!",
      });
      setIsOpen(false);
      onSuccess();
      setDiscountPrice("");
    } catch (error) {
      console.log("error adding discount price", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isLoading,
    discountPrice,
    handleChangeDiscountPrice,
    addDiscountPrice,
  };
};
