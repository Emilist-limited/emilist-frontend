import { useState } from "react";

import { subscribeToNewsletter } from "../api/newsletterService";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

interface UseSubscribeNewsLetterReturn {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useSubscribeNewsLetter = (): UseSubscribeNewsLetterReturn => {
  const { showToast } = useToast();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast({
        message: "Please enter a valid email",
        type: "error",
        duration: 8000,
        autoClose: true,
      });
      return;
    }

    setLoading(true);
    try {
      await subscribeToNewsletter(email);
      showToast({
        message: "You have successfully subscribed to our newsletter",
        type: "success",
        duration: 6000,
        autoClose: true,
      });
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, handleSubmit };
};
