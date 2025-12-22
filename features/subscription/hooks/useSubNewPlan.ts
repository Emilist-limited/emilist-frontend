import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useSubNewPlan = () => {
  const router = useRouter();

  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymenntMethod] = useState("");

  const emilistUrl = process.env.NEXT_PUBLIC_EMILIST_URL;

  const handleSubNewPlan = async (
    e: React.FormEvent,
    planId: string,
    isRenew: boolean,
    durationType: "monthly" | "yearly"
  ) => {
    e.preventDefault();

    if (!paymentMethod) {
      return showToast({
        message: "Please select payment method",
        type: "error",
      });
    }
    if (!currency) {
      return showToast({ message: "Please select currency", type: "error" });
    }

    setLoading(true);
    try {
      const payload = {
        planId,
        paymentMethod,
        currency,
        durationType,
        isRenew,
      };
      const { data } = await axiosInstance.post(
        `/subscription/subscribe-plan`,
        payload
      );
      setIsOpen(false);
      const { paymentLink } = data?.data;
      if (payload.paymentMethod === "Card" && paymentLink) {
        router.push(paymentLink);
      }

      if (payload.paymentMethod === "Wallet" && data?.message === "success") {
        router.push(`${emilistUrl}/status?status=success`);
      }
    } catch (error) {
      console.log("error creating subscrip[tion plan", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    currency,
    setCurrency,
    loading,
    paymentMethod,
    setPaymenntMethod,
    handleSubNewPlan,
  };
};
