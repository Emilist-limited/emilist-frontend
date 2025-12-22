import { axiosInstance } from "@/lib/api/axiosInstance";

export const logout = async () => {
  try {
    await axiosInstance.get(`/auth/log-out`);
  } catch (error) {
    console.log("error logging out", error);
  }
};
