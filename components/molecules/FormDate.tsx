import Input from "../atoms/Input";
import Label from "../atoms/Label";
import { FormInputProps } from "@/types/form";

const FormDate = ({
  id,
  label,
  type = "date",
  value,
  onChange,
  placeholder,
  name,
  onBlur,
  min,
  max,
}: FormInputProps) => {
  return (
    <div className="w-full space-y-1 overflow-x-hidden">
      <Label htmlFor={id} className="capitalize">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        min={min}
        max={max}
        bg="bg-gray-500 text-white"
      />
    </div>
  );
};

export default FormDate;
