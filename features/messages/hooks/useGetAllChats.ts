import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { CoversationType } from "../types";

export const useGetAllChats = () => {
  const [isLoading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<CoversationType[] | []>(
    []
  );

  const getAllCoversations = async () => {
    try {
      const { data } = await axiosInstance.get(`/chat/fetch-all-chat`);
      setConversations(data?.data);
    } catch (error) {
      console.log("error fetching all user conversations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCoversations();
  }, []);

  return {
    conversations,
    isLoading,
    getAllCoversations,
  };
};
