import { axiosInstance } from "@/lib/api/axiosInstance";

export const loginUser = async (email: string, password: string) => {
  try {
    const loginPayload = { email, password };
    const { data } = await axiosInstance.post(`/auth/login`, loginPayload);
    return data;
  } catch (error: any) {
    throw error;
  }
};
