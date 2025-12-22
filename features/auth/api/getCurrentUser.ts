import { axiosInstance } from "@/lib/api/axiosInstance";
import { errorMessages } from "../helpers/errors";
import { ApiError } from "@/types/apiResponse";

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/current-user");
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Failed to fetch user:", apiError);
    const message =
      errorMessages[apiError.status || 500] || "An error occurred";
    throw new Error(message);
  }
};
