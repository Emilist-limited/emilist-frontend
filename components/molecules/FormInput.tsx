import { FormInputProps } from "@/types/form";

import Input from "../atoms/Input";
import Label from "../atoms/Label";

export const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  onBlur,
}: FormInputProps) => (
  <div className="w-full space-y-1">
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
    />
  </div>
);
