interface FilterInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  value,
  onChange,
  placeholder,
  type,
}) => {
  return (
    <input
      style={{ fontSize: "16px" }}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border-1 rounded w-full text-sm p-2 mt-4 bg-white outline-none focus:border-primary-green border-gray-300"
    />
  );
};

export default FilterInput;
