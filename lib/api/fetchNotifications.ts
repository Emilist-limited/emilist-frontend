import { axiosInstance } from "./axiosInstance";

export const fetchNotifications = async () => {
  try {
    const { data } = await axiosInstance.get(
      "/notification/fetch-user-notification"
    );
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
