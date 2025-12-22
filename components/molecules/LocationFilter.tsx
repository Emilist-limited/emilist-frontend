import FilterApplyButton from "../atoms/FilterApplyButton";
import FilterHeading from "../atoms/FilterHeading";
import FilterInput from "../atoms/FilterInput";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  fetchData: () => Promise<void>;
}

const LocationFilter = ({
  location,
  setLocation,
  fetchData,
}: LocationFilterProps) => {
  return (
    <div className="border-b-1 py-6 w-full">
      <div className="w-full max-w-xs pr-6">
        <FilterHeading title="Location" />
        <FilterInput
          value={location}
          onChange={setLocation}
          placeholder="Enter location"
          type="text"
        />
        <FilterApplyButton onClick={fetchData} />
      </div>
    </div>
  );
};

export default LocationFilter;
