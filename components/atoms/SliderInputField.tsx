import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatInputTextNumberWithCommas";

interface SliderInputFieldProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
}

const SliderInputField: React.FC<SliderInputFieldProps> = ({
  value,
  onChange,
  min,
  max,
  label,
}) => {
  const displayValue = formatInputTextNumberWithCommas(value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    const newValue = Number(rawValue);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col w-1/2 px-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        className="p-2 border border-gray-300 bg-white rounded outline-none focus:border-primary-green"
        min={min}
        max={max}
      />
    </div>
  );
};
export default SliderInputField;
