import { axiosInstance } from "@/lib/api/axiosInstance";

export const getCurrentUserJobs = async ({
  currentPage = 1,
  search = "",
  filterLocation = "",
  filterService = "",
}) => {
  try {
    let url = `/jobs/fetch-listed-jobs?page=${currentPage}&limit=10`;

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
    console.error("error: fetching current user listed jobs", error);
    throw error;
  }
};
