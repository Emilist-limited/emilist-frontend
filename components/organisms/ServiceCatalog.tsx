"use client";

import { useContext } from "react";
import { useSearchParams } from "next/navigation";

import { BusinessListProps, FilterServiceWrapperProps } from "@/types";
import { CompareContext } from "@/lib/context/CompareState";
import { ROUTES } from "@/lib/constants/routes";
import { useGetBusinesses } from "@/features/services/hooks/useGetBusinesses";

import FeatureContentHeader from "./FeatureContentHeader";
import FilterServiceWrapper from "./FilterServiceWrapper";
import FilterPanel from "./FilterPanel";
import ServiceList from "./ServiceList";
import PageLoader from "../atoms/PageLoader";
import CompareSearch from "../molecules/CompareSearch";

const ServiceCatalog = () => {
  const searchParams = useSearchParams();

  const service = searchParams.get("q") || "";
  const locationQuery = searchParams.get("location") || "";

  const { compareServices } = useContext(CompareContext);
  const {
    fetchBusinesses,
    search,
    businesses,
    totalPages,
    currentPage,
    handleChange,
    handlePageChange,
    minValue,
    maxValue,
    expertType,
    setExpertType,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    noOfReviews,
    setNoOfReviews,
    location,
    setLocation,
    noticePeriod,
    setNoticePeriod,
    totalBusinesses,
    currency,
    setCurrency,
    reFetchAllBusinesses,
    isFetching,
    setIsFetching,
  } = useGetBusinesses(service, locationQuery);

  const filterProps: FilterServiceWrapperProps = {
    minValue,
    maxValue,
    expertType,
    setExpertType,
    handleMinChange,
    handleMaxChange,
    rating,
    setRating,
    noOfReviews,
    setNoOfReviews,
    location,
    setLocation,
    noticePeriod,
    setNoticePeriod,
    fetchBusinesses,
    currency,
    setCurrency,
  };

  const listProps: BusinessListProps = {
    totalBusinesses,
    totalPages,
    currentPage,
    handlePageChange,
    reFetchAllBusinesses,
    businesses,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await reFetchAllBusinesses();
  };

  return (
    <div className="pt-10 padding-ctn">
      <FeatureContentHeader
        search={search}
        handleSearchChange={handleChange}
        handleSearchSubmit={handleSubmit}
        title={
          service
            ? service
            : locationQuery
            ? locationQuery
            : "Explore Businesses"
        }
        description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
  amet sint. Velit officia consequat duis enimt."
      />
      {compareServices?.length > 0 && (
        <CompareSearch title="businesses" link={ROUTES?.COMPARE_BUSINESSES} />
      )}
      {isFetching ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-10 pt-10 no-scroll">
          <FilterPanel>
            <FilterServiceWrapper {...filterProps} />
          </FilterPanel>
          <ServiceList {...listProps} />
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;
