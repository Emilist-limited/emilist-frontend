import { useContext, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { ChatContext } from "@/lib/context/ChatState";

export const useGetChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages } = useContext(ChatContext);

  const getMessages = async (userId: string) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/chat/fetch-message/${userId}`);
      setMessages(data?.data?.messages || []);
    } catch (error) {
      console.log("error fetching chats of just a user", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getMessages,
    messages,
    isLoading,
  };
};
