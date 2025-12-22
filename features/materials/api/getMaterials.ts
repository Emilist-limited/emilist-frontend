import { axiosInstance } from "@/lib/api/axiosInstance";

interface FetchMaterialParams {
  page: number;
  limit?: number;
  userId?: string;
  search?: string;
  locationQuery?: string;
  rating?: string;
  noOfReviews?: string;
  material?: string;
}

export const getMaterials = async ({
  page,
  limit = 10,
  userId = "",
  search = "",
  rating,
  noOfReviews,
  locationQuery,
  material,
}: FetchMaterialParams) => {
  try {
    let url = `/material/fetch-all-products?page=${page}&limit=${limit}${
      userId ? `&userId=${userId}` : ""
    }`;
    if (search) {
      url += `&search=${search}`;
    } else if (material) {
      url += `&search=${material}`;
    }
    if (locationQuery) {
      url += `&location=${locationQuery}`;
    }
    // if (minValue) {
    //   url += `&minPrice=${minValue}`;
    // }
    // if (maxValue) {
    //   url += `&maxPrice=${maxValue}`;
    // }
    if (rating) {
      url += `&minRating=${rating}`;
    }
    if (noOfReviews) {
      url += `&minReviews=${noOfReviews}`;
    }
    const { data } = await axiosInstance.get(url);
    return data?.data;
  } catch (error) {
    console.error("Error fetching material:", error);
    throw error;
  }
};
