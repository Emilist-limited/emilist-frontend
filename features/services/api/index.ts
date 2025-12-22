import { axiosInstance } from "@/lib/api/axiosInstance";

export const getServiceInfo = async ({
  businessId,
  userId,
}: {
  businessId: string;
  userId: string;
}) => {
  try {
    const url = `/business/fetch-single-business/${businessId}${
      userId ? `?userId=${userId}` : ""
    }`;
    const { data } = await axiosInstance.get(url);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBusinessItem = async ({
  businessId,
  itemId,
  itemType,
}: {
  businessId: string;
  itemId: string;
  itemType: string;
}) => {
  try {
    const url = `/business/delete-business-item/${businessId}/${itemId}/${itemType}`;
    const { data } = await axiosInstance.delete(url);
    return data;
  } catch (error) {
    throw error;
  }
};
