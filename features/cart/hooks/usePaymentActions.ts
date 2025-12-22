import { useRouter } from "next/navigation";
import { useState } from "react";

import { initiateOrderPayment } from "../api/checkout";
import { useToast } from "@/lib/hooks/useToast";

export const usePaymentActions = () => {
  const router = useRouter();

  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("");

  const emilistUrl = process.env.NEXT_PUBLIC_EMILIST_URL;

  const handleOrderPayment = async (cartId: string) => {
    setLoading(true);
    try {
      const data = await initiateOrderPayment(
        cartId,
        paymentMethod,
        currency,
        showToast
      );
      const { paymentLink } = data?.data;

      if (paymentMethod === "Card" && paymentLink) {
        router.push(paymentLink);
      }

      if (paymentMethod === "Wallet" && data?.message === "success") {
        router.push(`${emilistUrl}/status?status=success`);
      }

      setCurrency("");
      setPaymentMethod("");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleOrderPayment,
    loading,
    paymentMethod,
    currency,
    setPaymentMethod,
    setCurrency,
  };
};
