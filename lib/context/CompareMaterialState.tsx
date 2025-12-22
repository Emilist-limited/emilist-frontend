"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { axiosInstance } from "../api/axiosInstance";
import { readAuthCookie } from "../helpers/cookieHelper";

type Props = {
  children: React.ReactNode;
};

interface CompareMaterialContextType {
  compareLoading: boolean;
  compareMaterials: any[];
  reFetchComparedMaterials: () => Promise<void>;
}

export const CompareMaterialContext = createContext<CompareMaterialContextType>(
  {
    compareLoading: false,
    compareMaterials: [],
    reFetchComparedMaterials: async () => {},
  }
);

const CompareMaterialState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");

  const [rrerender, setRerender] = useState(false);
  const [compareLoading, setLoading] = useState(true);
  const [compareMaterials, setCompareMaterials] = useState([]);

  const getComparedMaterials = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(
        `material/fetch-compared-products`
      );
      setCompareMaterials(data?.data?.enhancedProducts);
    } catch (error) {
      console.log("error getting compared materials", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getComparedMaterials();
    } else {
      setLoading(false);
    }
  }, []);

  const reFetchComparedMaterials = useCallback(async () => {
    if (token) {
      await getComparedMaterials();
    }
  }, [getComparedMaterials]);

  const value = {
    compareLoading,
    compareMaterials,
    reFetchComparedMaterials,
  };

  return (
    <CompareMaterialContext.Provider value={value}>
      {children}
    </CompareMaterialContext.Provider>
  );
};

export default CompareMaterialState;
