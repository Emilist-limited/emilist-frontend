interface FilterApplyButtonProps {
  onClick: () => void;
}

const FilterApplyButton: React.FC<FilterApplyButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-primary-green text-center text-sm font-semibold w-[290px] py-4"
    >
      APPLY
    </button>
  );
};

export default FilterApplyButton;
