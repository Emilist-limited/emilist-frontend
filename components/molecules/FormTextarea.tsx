import Label from "../atoms/Label";
import Textarea from "../atoms/Textarea";

interface FormTextareaProps {
  id: string;
  label: string;
  rows: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
}

const FormTextarea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  name,
  rows,
}: FormTextareaProps) => {
  return (
    <div className="w-full space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        rows={rows}
      />
    </div>
  );
};

export default FormTextarea;
