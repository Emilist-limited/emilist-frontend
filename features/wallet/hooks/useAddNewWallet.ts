import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";
import { useToast } from "@/lib/hooks/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useAddNewWallet = () => {
  const { showToast } = useToast();
  const { currentUser, refreshUser } = useContext(AuthContext);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [isDefault, setDefault] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onCancel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
      return;
    }
    if (!currency) {
      showToast({
        message: "Please select a currency",
        type: "error",
      });
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        currency,
        isDefault,
      };
      await axiosInstance.post(`/wallet/create-wallet`, payload);
      showToast({ message: "Wallet successfully added.", type: "success" });
      setIsOpen(false);
      refreshUser();
    } catch (error) {
      console.log("error creating wallet", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    setDefault,
    currency,
    setCurrency,
    isLoading,
    handleSubmit,
    onCancel,
    isOpen,
  };
};
