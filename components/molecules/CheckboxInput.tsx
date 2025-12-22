import Image from "next/image";

import Label from "../atoms/Label";

interface CheckboxInputProps {
  id: string;
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CheckboxInput = ({
  id,
  name,
  value,
  onChange,
  label,
}: CheckboxInputProps) => {
  return (
    <Label htmlFor={id} className="flex-c w-fit py-2 gap-2 cursor-pointer">
      <input
        style={{ fontSize: "16px" }}
        type="checkbox"
        className="h-0 w-0 invisible"
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
      />
      <Image
        src={value ? "/icons/checkbox-filled.svg" : "/icons/checkbox.svg"}
        alt="checkbox"
        width={30}
        height={30}
        className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
      />
      <p>{label}</p>
    </Label>
  );
};

export default CheckboxInput;
