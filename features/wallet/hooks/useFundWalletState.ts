import { useToast } from "@/lib/hooks/useToast";
import { ChangeEvent, useState } from "react";
import { FundInfoType, WalletType } from "../types";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";

export const useFundWalletState = () => {
  const { showToast } = useToast();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [fundInfo, setFundInfo] = useState<FundInfoType>({
    amount: "",
    paymentMethod: "",
  });

  const [walletInfo, setWalletInfo] = useState<WalletType>({
    _id: "",
    currency: "",
    balance: 0,
  });

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFundInfo((prev) => ({
      ...prev,
      [name]:
        name === "amount" ? formatInputTextNumberWithCommas(value) : value,
    }));
  };

  const handleDelete = () => {
    setPaymentProof(null);
  };

  function handleChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInMB = 2 * 1024 * 1024;
    if (file) {
      if (file.size > maxSizeInMB) {
        showToast({
          message: `File ${file.name} exceeds the 2MB size limit.`,
          type: "error",
          duration: 8000,
        });
        return;
      }
      if (!validExtensions.includes(file.type)) {
        showToast({
          message: `Unsupported file type for ${file.name}. Only jpg, jpeg, and png are allowed.`,
          type: "error",
          duration: 8000,
        });
        return;
      }
      setPaymentProof(file);
    }
  }

  return {
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
  };
};
