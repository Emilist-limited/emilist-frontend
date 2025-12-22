import { Dispatch, SetStateAction } from "react";

import FilterHeading from "../atoms/FilterHeading";
import FilterApplyButton from "../atoms/FilterApplyButton";

import { serviceList } from "@/lib/constants";

interface CategoryFilterProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  fetchData: () => Promise<void>;
}

const CategoryFilter = ({
  category,
  setCategory,
  fetchData,
}: CategoryFilterProps) => {
  return (
    <div className="w-full border-b-1 py-6">
      <div className="w-full max-w-xs pr-6">
        <FilterHeading title="Category" />
        <select
          style={{ fontSize: "16px" }}
          id="filter"
          className="border-1 mt-4 outline-none rounded w-full focus:border-primary-green border-gray-300 max-md:text-sm p-2 bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option defaultValue=""> Select</option>
          {serviceList?.map((service, index) => (
            <option key={index} value={service} className="capitalize">
              {service}
            </option>
          ))}
        </select>
        <FilterApplyButton onClick={fetchData} />
      </div>
    </div>
  );
};

export default CategoryFilter;
