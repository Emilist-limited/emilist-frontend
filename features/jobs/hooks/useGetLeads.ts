import { ChangeEvent, useEffect, useState } from "react";

import { axiosInstance } from "@/lib/api/axiosInstance";

export const useGetLeads = () => {
  const [leads, setLeads] = useState<any>([]);
  const [errMsg, setErrMsg] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterService, setFilterService] = useState("");
  const [totalJobs, setTotalJobs] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getLeads = async () => {
    let url = `/jobs/leads?page=${currentPage}&limit=10`;

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
    try {
      const { data } = await axiosInstance.get(url);

      const { leadJobs: newJobs, totalPages, totalLeads } = data?.data;
      setLeads(newJobs);
      setTotalPages(totalPages);
      setTotalJobs(totalLeads);
    } catch (error: any) {
      if (
        error?.response?.data?.message ===
        "Basic subscription does not include the ability to fetch leads."
      ) {
        setErrMsg(true);
        return;
      }
      console.log("error fetching all leads", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeads();
  }, [currentPage]);

  return {
    isLoading,
    leads,
    search,
    handleChange,
    getLeads,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    errMsg,
    setIsLoading,
    totalJobs,
  };
};
