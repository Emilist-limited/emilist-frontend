import { ChangeEvent, useState } from "react";

export const useFetchJobState = () => {
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [allJobs, setAllJobs] = useState<any>([]);
  const [currency, setCurrency] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterName, setFilterName] = useState("");
  const [totalJobs, setTotalJobs] = useState(0);
  const [filterService, setFilterService] = useState("");
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(10000000000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleMinChange = (value: number) => {
    setMinValue(Math.min(value, maxValue));
  };

  const handleMaxChange = (value: number) => {
    setMaxValue(Math.max(value, minValue));
  };

  return {
    data,
    setData,
    hasMore,
    setHasMore,
    allJobs,
    setAllJobs,
    currency,
    setCurrency,
    isFetching,
    setIsFetching,
    isLoading,
    setIsLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    search,
    setSearch,
    filterLocation,
    setFilterLocation,
    filterName,
    setFilterName,
    totalJobs,
    setTotalJobs,
    filterService,
    setFilterService,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    handleChange,
    handlePageChange,
    handleMinChange,
    handleMaxChange,
  };
};
