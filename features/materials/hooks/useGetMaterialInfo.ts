import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useGetMaterialInfo = (materialId: string, userId?: string) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [materialInfo, setMaterialInfo] = useState<any>({});

  const getMaterialInfo = async () => {
    let url = `/material/fetch-product/${materialId}${
      userId ? `?userId=${userId}` : ""
    }`;
    try {
      const { data } = await axiosInstance.get(url);
      setMaterialInfo(data?.data);
    } catch (error: any) {
      console.log("error getting material info", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMaterialInfo();
  }, [materialId, userId]);

  return {
    loading,
    getMaterialInfo,
    materialInfo,
  };
};
