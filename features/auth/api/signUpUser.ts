import { axiosInstance } from "@/lib/api/axiosInstance";

export const signUpUser = async (
  userName: string,
  email: string,
  password: string
) => {
  try {
    const signUpPayload = { userName, email, password };
    const { data } = await axiosInstance.post(`/auth/sign-up`, signUpPayload);
    return data;
  } catch (error) {
    console.log("error signing up user:", error);
    throw error;
  }
};
