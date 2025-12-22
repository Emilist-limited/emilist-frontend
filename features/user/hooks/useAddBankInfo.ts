import { useContext, useState } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";

interface BankType {
  number: string;
  holdersName: string;
  bank: string;
  password: string;
}

export const useAddBankInfo = () => {
  const { showToast } = useToast();
  const { currentUser, refreshUser } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [bankDetails, setBankDetails] = useState<BankType>({
    number: currentUser?.accountDetails?.number || "",
    holdersName: currentUser?.accountDetails?.holdersName || "",
    bank: currentUser?.accountDetails?.bank || "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: name === "number" ? formatInputTextNumber(value) : value,
    }));
  };

  const handleSubmitBankDetails = async () => {
    const { number, holdersName, bank, password } = bankDetails;
    if (!bank) {
      showToast({
        message: "Provide your bank name.",
        type: "error",
      });
      return;
    } else if (!number) {
      showToast({
        message: "Provide your account number.",
        type: "error",
      });
      return;
    } else if (!holdersName) {
      showToast({
        message: "Provide your account name.",
        type: "error",
      });
      return;
    } else if (!password) {
      showToast({
        message: "Provide your password.",
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        number,
        holdersName,
        bank,
        password,
      };
      await axiosInstance.patch(`/auth/update-account-details`, payload);
      setEdit(false);
      showToast({
        message: "Profile detail updated successfully",
        type: "success",
      });
      refreshUser();
    } catch (error) {
      console.log("error submiting bank details", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    inputType,
    setInputType,
    handleChange,
    bankDetails,
    handleSubmitBankDetails,
    edit,
    setEdit,
  };
};
