import { axiosInstance } from "@/lib/api/axiosInstance";
import { FetchJobsParams } from "../types";

export const getUserAppliedJobs = async ({
  currentPage = 1,
  search = "",
  filterLocation = "",
  filterService = "",
}: FetchJobsParams) => {
  try {
    let url = `/jobs/fetch-applied-jobs-by-status?limit=10&page=${currentPage}`;

    if (search) {
      url += `&search=${search}`;
    } else {
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
    console.error("error: fetching user applied job:", error);
    throw error;
  }
};
