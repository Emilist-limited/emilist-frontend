import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useState } from "react";

import { ChangePasswordType } from "@/features/auth/types";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useChangePassword = () => {
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState<"password" | "text">("password");
  const [password, setPassword] = useState<ChangePasswordType>({
    currentPassword: "",
    newPassword: "",
  });

  const toggleType = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
      return;
    }

    const { currentPassword, newPassword } = password;

    if (!currentPassword) {
      showToast({
        message: "Please enter current password",
        type: "error",
      });
      return;
    }
    if (!newPassword) {
      showToast({
        message: "`Please enter new password",
        type: "error",
      });
      return;
    }
    setLoading(true);

    try {
      const passwordDetails = {
        currentPassword,
        newPassword,
      };
      await axiosInstance.patch(`/auth/change-password`, passwordDetails);
      setPassword({
        currentPassword: "",
        newPassword: "",
      });
      setType("password");
      showToast({ message: "Password change successfully", type: "success" });
      setEdit(false);
    } catch (error: any) {
      console.error("error changing password", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleChange,
    handleSubmit,
    password,
    setEdit,
    edit,
    type,
    toggleType,
  };
};
