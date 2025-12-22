import { axiosInstance } from "@/lib/api/axiosInstance";

export const subscribeToNewsletter = async (email: string) => {
  try {
    const emailData = { email };
    await axiosInstance.post("/auth/subscribe-newsletter", emailData);
  } catch (error) {
    console.log("error subscribing newsletters", error);
    throw error;
  }
};
