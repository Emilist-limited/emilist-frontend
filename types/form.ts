export interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  min?: string;
  max?: string;
}
