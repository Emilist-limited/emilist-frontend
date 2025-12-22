import { axiosInstance } from "@/lib/api/axiosInstance";

export const getUserRecurringJobs = async ({ currentPage = 1 }) => {
  try {
    let url = `/jobs/fetch-recurring-jobs?page=${currentPage}&limit=10`;

    const { data } = await axiosInstance.get(url);
    return data?.data;
  } catch (error) {
    console.error("error: fetching current user recurring jobs", error);
    throw error;
  }
};
