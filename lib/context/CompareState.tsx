"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { readAuthCookie } from "../helpers/cookieHelper";
import { axiosInstance } from "../api/axiosInstance";

type Props = {
  children: React.ReactNode;
};

interface CompareContextType {
  compareLoading: boolean;
  compareServices: any[];
  reFetchComparedBusinesses: () => Promise<void>;
}

export const CompareContext = createContext<CompareContextType>({
  compareLoading: false,
  compareServices: [],
  reFetchComparedBusinesses: async () => {},
});

const CompareState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");

  const [compareLoading, setLoading] = useState(true);
  const [compareServices, setCompareServices] = useState([]);

  const getComparedServices = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(
        `/business/fetch-compared-business`
      );
      setCompareServices(data?.data?.enhancedBusinesses);
    } catch (error) {
      console.log("error getting compared services", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getComparedServices();
    } else {
      setLoading(false);
    }
  }, []);

  const reFetchComparedBusinesses = useCallback(async () => {
    if (token) {
      await getComparedServices();
    }
  }, [getComparedServices]);

  const value = {
    compareLoading,
    compareServices,
    reFetchComparedBusinesses,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export default CompareState;
