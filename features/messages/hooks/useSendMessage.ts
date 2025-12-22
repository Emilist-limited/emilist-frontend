import { useContext, useState } from "react";

import { ChatContext } from "@/lib/context/ChatState";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";

export const useSendMessage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const { messages, setMessages } = useContext(ChatContext);

  const handleSendMessage = async (
    e: any,
    userId: string,
    onSuccess?: () => void
  ) => {
    e.preventDefault();
    if (!message) return;
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(
        `/chat/send-message/${userId}`,
        {
          content: message,
        }
      );
      setMessages([...messages, data?.data]);
      setMessage("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log("error sending message", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    message,
    setMessage,
    handleSendMessage,
  };
};
