import { useContext } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/navigation";

import { useFundWalletState } from "./useFundWalletState";
import { removeCommas } from "@/lib/helpers/removeCommas";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";

export const useFundWallet = () => {
  const router = useRouter();

  const { currentUser, refreshUser } = useContext(AuthContext);
  const { showToast } = useToast();

  const {
    loading,
    setLoading,
    paymentProof,
    setPaymentProof,
    fundInfo,
    setFundInfo,
    walletInfo,
    setWalletInfo,
    handleChange,
    handleDelete,
    handleChangeFile,
    openModal,
    setOpenModal,
    toggleModal,
  } = useFundWalletState();

  const handleFundWallet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      router.push(ROUTES.LOGIN);
    }
    if (!fundInfo.amount) {
      showToast({
        message: "Please provide amount!",
        type: "error",
      });
      return;
    }
    if (!fundInfo.paymentMethod) {
      showToast({ message: "Please select payment method", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        currency: walletInfo?.currency,
        walletId: walletInfo?._id,
        amount: removeCommas(fundInfo.amount),
        paymentMethod: fundInfo?.paymentMethod,
      };

      const formData = new FormData();

      formData.append("currency", payload.currency);
      formData.append("walletId", payload.walletId);
      formData.append("amount", payload.amount);
      formData.append("paymentMethod", payload.paymentMethod);

      if (paymentProof) {
        formData.append("image", paymentProof);
      }

      const { data } = await axiosInstance.post(
        "/wallet/initiate-wallet-funding",
        formData
      );

      const { paymentLink } = data?.data;

      if (payload.paymentMethod === "Card" && paymentLink) {
        router.push(paymentLink);
      }
      if (payload.paymentMethod === "BankTransfer") {
        showToast({
          message:
            "Your funds will reflect on your wallet once payment is confirmed.",
          type: "success",
          autoClose: false,
        });
      }
      setOpenModal(false);
      setFundInfo({
        amount: "",
        paymentMethod: "",
      });
      setWalletInfo({
        _id: "",
        currency: "",
        balance: 0,
      });
      setPaymentProof(null);
      refreshUser();
    } catch (error) {
      console.log("error funding wallet ", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleFundWallet,
    loading,
    setWalletInfo,
    paymentProof,
    fundInfo,
    handleChangeFile,
    handleDelete,
    openModal,
    toggleModal,
  };
};
