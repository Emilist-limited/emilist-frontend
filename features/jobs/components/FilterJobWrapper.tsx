import CurrencyFilter from "@/components/molecules/CurrencyFilter";
import PriceRangeSelectorWrapper from "@/components/organisms/PriceRangeSelectorWrapper";

import { FilterJobWrapperProps } from "../types";
import LocationFilter from "@/components/molecules/LocationFilter";
import CategoryFilter from "@/components/molecules/CategoryFilter";

const FilterJobWrapper = ({
  minValue,
  maxValue,
  handleMinChange,
  handleMaxChange,
  currency,
  setCurrency,
  getAllJobs,
  filterLocation,
  setFilterLocation,
  filterService,
  setFilterService,
}: FilterJobWrapperProps) => {
  return (
    <>
      {/* <PriceRangeSelectorWrapper
        minValue={minValue}
        maxValue={maxValue}
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
        fetchData={getAllJobs}
      />
      <CurrencyFilter
        currency={currency}
        setCurrency={setCurrency}
        fetchData={getAllJobs}
      /> */}
      <CategoryFilter
        category={filterService}
        setCategory={setFilterService}
        fetchData={getAllJobs}
      />
      <LocationFilter
        location={filterLocation}
        setLocation={setFilterLocation}
        fetchData={getAllJobs}
      />
    </>
  );
};

export default FilterJobWrapper;
