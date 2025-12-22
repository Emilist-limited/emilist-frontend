import { axiosInstance } from "@/lib/api/axiosInstance";
import { FetchJobsParams } from "../types";

export const getJobs = async ({
  currentPage = 1,
  userId = "",
  search = "",
  filterName = "",
  filterLocation = "",
  filterService = "",
}: FetchJobsParams) => {
  try {
    let url = `/jobs/fetch-all-jobs?page=${currentPage}&limit=10${
      userId ? `&userId=${userId}` : ""
    }`;

    if (search) {
      url += `&search=${search}`;
    } else {
      if (filterName) {
        url += `&title=${filterName}`;
      }
      if (filterLocation) {
        url += `&location=${filterLocation}`;
      }
      if (filterService) {
        url += `&service=${filterService}`;
      }
    }
    const { data } = await axiosInstance.get(url);
    return data?.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};
