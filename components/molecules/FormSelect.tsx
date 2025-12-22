import { optionsType } from "@/types";

import Label from "../atoms/Label";
import Select from "../atoms/Select";

interface FormSelectProps {
  id: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  options: optionsType[];
}

const FormSelect = ({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  options,
}: FormSelectProps) => {
  return (
    <div className="w-full space-y-1">
      <Label htmlFor={id} className="capitalize">
        {label}
      </Label>
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
      />
    </div>
  );
};

export default FormSelect;
