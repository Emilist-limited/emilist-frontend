import Image from "next/image";

import CurrencyFilter from "../molecules/CurrencyFilter";
import Rating from "../molecules/Rating";
import PriceRangeSelectorWrapper from "./PriceRangeSelectorWrapper";

import { FilterMaterialWrapperProps } from "@/types";
import { serviceRating } from "@/lib/constants";
import RatingFilter from "../molecules/RatingFilter";
import ReviewFilter from "../molecules/ReviewFilter";

const FilterMaterialWrapper = ({
  minValue,
  maxValue,
  handleMinChange,
  handleMaxChange,
  currency,
  setCurrency,
  rating,
  setRating,
  noOfReviews,
  setNoOfReviews,
  getAllMaterials,
}: FilterMaterialWrapperProps) => {
  return (
    <>
      <PriceRangeSelectorWrapper
        minValue={minValue}
        maxValue={maxValue}
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
        fetchData={getAllMaterials}
      />
      <CurrencyFilter
        currency={currency}
        setCurrency={setCurrency}
        fetchData={getAllMaterials}
      />
      <RatingFilter
        rating={rating}
        setRating={setRating}
        fetchData={getAllMaterials}
      />
      <ReviewFilter
        reviews={noOfReviews}
        setReviews={setNoOfReviews}
        fetchData={getAllMaterials}
      />
    </>
  );
};

export default FilterMaterialWrapper;
