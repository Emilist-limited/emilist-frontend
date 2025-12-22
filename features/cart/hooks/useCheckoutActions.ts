import { useState } from "react";

import { initiateCheckout } from "../api/checkout";
import { useToast } from "@/lib/hooks/useToast";

export const useCheckoutActions = () => {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    setOpen(false);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await initiateCheckout(showToast);
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onCancel,
    handleCheckout,
    isLoading,
    open,
  };
};
