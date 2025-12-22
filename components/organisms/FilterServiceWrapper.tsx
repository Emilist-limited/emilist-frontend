import { FilterServiceWrapperProps } from "@/types";

import CurrencyFilter from "../molecules/CurrencyFilter";
import PriceRangeSelectorWrapper from "./PriceRangeSelectorWrapper";
import RatingFilter from "../molecules/RatingFilter";
import ReviewFilter from "../molecules/ReviewFilter";
import LocationFilter from "../molecules/LocationFilter";
import NoticePeriodFilter from "../molecules/NoticePeriodFilter";

const FilterServiceWrapper = ({
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
}: FilterServiceWrapperProps) => {
  return (
    <>
      {" "}
      <PriceRangeSelectorWrapper
        minValue={minValue}
        maxValue={maxValue}
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
        fetchData={fetchBusinesses}
      />
      <CurrencyFilter
        currency={currency}
        setCurrency={setCurrency}
        fetchData={fetchBusinesses}
      />
      <RatingFilter
        rating={rating}
        setRating={setRating}
        fetchData={fetchBusinesses}
      />
      <ReviewFilter
        reviews={noOfReviews}
        setReviews={setNoOfReviews}
        fetchData={fetchBusinesses}
      />
      <LocationFilter
        location={location}
        setLocation={setLocation}
        fetchData={fetchBusinesses}
      />
      <NoticePeriodFilter
        noticePeriod={noticePeriod}
        setNoticePeriod={setNoticePeriod}
        fetchData={fetchBusinesses}
      />
    </>
  );
};

export default FilterServiceWrapper;
