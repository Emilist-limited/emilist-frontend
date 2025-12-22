import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useGetUser = (userId: string) => {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/auth/user-details/${userId}`);
      setUser(data?.data);
    } catch (error) {
      console.log("error getting user info", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return {
    user,
    isLoading,
    getUserInfo,
  };
};
