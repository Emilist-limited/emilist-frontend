import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "../context/AuthState";
import { axiosInstance } from "../api/axiosInstance";
import { promiseErrorFunction } from "../helpers/promiseError";
import { useToast } from "./useToast";

export const useInviteUsers = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    setIsOpen(false);
  };

  const handleInviteUser = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (!email) {
      showToast({
        message: "Please provide user email",
        type: "error",
      });
    }
    setIsLoading(true);
    try {
      await axiosInstance.get(`/auth/invite-user?email=${email}`);
      showToast({
        message: "Invite sent successfully",
        type: "success",
        duration: 8000,
      });
      setEmail("");
      onCancel();
    } catch (error) {
      console.log("error inviting user", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleInviteUser,
    isLoading,
    email,
    setEmail,
    isOpen,
    onCancel,
    setIsOpen,
  };
};
