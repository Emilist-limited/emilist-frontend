import FilterApplyButton from "../atoms/FilterApplyButton";
import FilterHeading from "../atoms/FilterHeading";
import FilterInput from "../atoms/FilterInput";

interface ReviewFilterProps {
  reviews: string | undefined;
  setReviews: (review: string) => void;
  fetchData: () => Promise<void>;
}

const ReviewFilter = ({
  reviews,
  setReviews,
  fetchData,
}: ReviewFilterProps) => {
  return (
    <div className="border-b-1 py-6 w-full">
      <div className="w-full max-w-xs  pr-6">
        <FilterHeading title="Reviews" />
        <FilterInput
          value={reviews}
          onChange={setReviews}
          type="number"
          placeholder="Number of Reviews"
        />
        <FilterApplyButton onClick={fetchData} />
      </div>
    </div>
  );
};

export default ReviewFilter;
