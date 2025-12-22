import { useState } from "react";

import SliderInputField from "../atoms/SliderInputField";
import RangeSlider from "../molecules/RangeSlider";
import FilterApplyButton from "../atoms/FilterApplyButton";

interface PriceRangeSelectorProps {
  minPrice: number;
  maxPrice: number;
  minValue: number;
  maxValue: number;
  handleMinChange: (minValue: number) => void;
  handleMaxChange: (maxValue: number) => void;
  fetchData: () => Promise<void>;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  minPrice,
  maxPrice,
  minValue,
  maxValue,
  handleMaxChange,
  handleMinChange,
  fetchData,
}) => {
  return (
    <div className="w-full max-w-xs py-6 pr-6 space-y-4 border-b-1">
      <h6 className="text-lg font-semibold max-sm:text-sm">Price</h6>
      <RangeSlider
        minPrice={minPrice}
        maxPrice={maxPrice}
        minValue={minValue}
        maxValue={maxValue}
        onMinChange={handleMinChange}
        onMaxChange={handleMaxChange}
      />
      <div className="flex justify-between">
        <SliderInputField
          label="Min Price"
          value={minValue}
          onChange={handleMinChange}
          min={minPrice}
          max={maxValue}
        />

        <SliderInputField
          label="Max Price"
          value={maxValue}
          onChange={handleMaxChange}
          min={minValue}
          max={maxPrice}
        />
      </div>
      <FilterApplyButton onClick={fetchData} />
    </div>
  );
};

export default PriceRangeSelector;
