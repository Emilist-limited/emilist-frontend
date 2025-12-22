import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useState } from "react";

import { RegisterType } from "../types";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { signUpUser } from "../api/signUpUser";
import { checkAllFieldsFilled } from "@/lib/helpers/checkAllFieldsFilled";
import { ROUTES } from "@/lib/constants/routes";

export const useSignUp = () => {
  const router = useRouter();

  const { showToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [registerDetails, setRegisterDetails] = useState<RegisterType>({
    email: "",
    userName: "",
    password: "",
  });

  const handleInputType = () => {
    setInputType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!checkAllFieldsFilled(registerDetails)) {
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
      const { userName, email, password } = registerDetails;
      const data = await signUpUser(userName, email, password);
      setRegisterDetails({
        email: "",
        userName: "",
        password: "",
      });
      showToast({
        message: "Registration successful",
        type: "success",
        autoClose: false,
      });
      router.push(ROUTES?.VERIFY_EMAIL(data?.data?.email));
    } catch (error) {
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    inputType,
    handleChange,
    handleInputType,
    checkAllFieldsFilled,
    handleSignUp,
    registerDetails,
  };
};
