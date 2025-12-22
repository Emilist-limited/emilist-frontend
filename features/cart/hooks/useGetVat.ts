import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useGetVat = () => {
  const [vat, setVat] = useState(0);
  const [load, setLoad] = useState(false);

  const getVat = async () => {
    setLoad(true);
    try {
      const { data } = await axiosInstance.get(`/transaction/fetch-vat`);
      setVat(data?.data);
    } catch (error) {
      console.log("error getting vat", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getVat();
  }, []);

  return {
    vat,
    load,
  };
};
