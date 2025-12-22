import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useState } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { checkAllFieldsFilled } from "@/lib/helpers/checkAllFieldsFilled";
import { createAuthCookie } from "@/lib/helpers/cookieHelper";
import { loginUser } from "../api/loginUser";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";

export const useLogin = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const handleInputType = () => {
    setInputType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!checkAllFieldsFilled(formData)) {
      showToast({
        message: "Please fill all input fields.",
        type: "error",
        duration: 8000,
        autoClose: true,
      });
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(formData.email, formData.password);
      const { userData, token } = data?.data;
      setCurrentUser(userData);
      createAuthCookie("sessionId", token);
      showToast({
        message: "Login successful!",
        type: "success",
        duration: 8000,
        autoClose: true,
      });
      router.push(ROUTES?.DASHBOARD_JOB);
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      console.error("Login error:", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    formData,
    loading,
    inputType,
    handleChange,
    handleInputType,
    checkAllFieldsFilled,
  };
};
