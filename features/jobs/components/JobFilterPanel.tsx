import { Dispatch, SetStateAction } from "react";

import CategoryFilter from "@/components/molecules/CategoryFilter";
import GeneralSearchForm from "@/components/molecules/GeneralSearchForm";
import LocationFilter from "@/components/molecules/LocationFilter";

interface JobFilterPanelProps {
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  filterService: string;
  setFilterService: Dispatch<SetStateAction<string>>;
  filterLocation: string;
  setFilterLocation: (location: string) => void;
  getAllJobs: () => Promise<void>;
}

const JobFilterPanel = ({
  search,
  handleChange,
  handleSubmit,
  filterService,
  setFilterService,
  filterLocation,
  setFilterLocation,
  getAllJobs,
}: JobFilterPanelProps) => {
  return (
    <div className="space-y-4 max-w-xs w-full">
      <div className="pr-6">
        <GeneralSearchForm
          onSubmit={handleSubmit}
          search={search}
          onChange={handleChange}
        />
      </div>
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
    </div>
  );
};

export default JobFilterPanel;
