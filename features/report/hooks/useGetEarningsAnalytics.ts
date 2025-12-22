import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useGetEarningsAnalytics = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [earnings, setEarnings] = useState<any>([]);
  const [currency, setCurrency] = useState("");

  const getUserEarnings = async () => {
    setIsLoad(true);
    let url = `/transaction/fetch-user-earning?year=${year || currentYear}${
      currency ? `&currency=${currency}` : ""
    }`;
    try {
      const { data } = await axiosInstance.get(url);
      setEarnings(data?.data);
    } catch (error) {
      console.log("error getting user earnings", error);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    getUserEarnings();
  }, [currency, year]);

  return {
    isLoad,
    earnings,
    currency,
    setCurrency,
    year,
    setYear,
  };
};
