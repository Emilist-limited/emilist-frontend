"use client";

import { useContext } from "react";

import { ROUTES } from "@/lib/constants/routes";
import { CompareContext } from "@/lib/context/CompareState";
import { useGetBusinesses } from "../hooks/useGetBusinesses";
import { BusinessListProps, FilterServiceWrapperProps } from "@/types";

import CompareSearch from "@/components/molecules/CompareSearch";
import FeatureContentHeader from "@/components/organisms/FeatureContentHeader";
import FeatureLinksWrapper from "@/components/organisms/FeatureLinksWrapper";
import FilterPanel from "@/components/organisms/FilterPanel";
import FilterServiceWrapper from "@/components/organisms/FilterServiceWrapper";
import PageLoader from "@/components/atoms/PageLoader";
import ServiceList from "@/components/organisms/ServiceList";

const BusinessListWrapper = () => {
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
  } = useGetBusinesses();

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
    <div className="sm:pt-10 padding-ctn">
      <FeatureLinksWrapper />
      <FeatureContentHeader
        search={search}
        handleSearchChange={handleChange}
        handleSearchSubmit={handleSubmit}
        title="Explore Businesses"
        description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enimt."
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

export default BusinessListWrapper;
