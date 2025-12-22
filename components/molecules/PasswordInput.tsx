import Input from "../atoms/Input";
import Label from "../atoms/Label";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType: "text" | "password";
  toggleInputType: () => void;
  placeholder?: string;
  name?: string;
}

export const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  inputType,
  toggleInputType,
  placeholder,
  name,
}: PasswordInputProps) => (
  <div className="w-full space-y-1">
    <Label htmlFor={id}>{label}</Label>
    <div className="min-w-full w-full max-w-full rounded-lg px-2 bg-[#ececec] focus-within:border-primary-green focus-within:border-1  h-10 flex justify-between items-center gap-2">
      <input
        id={id}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ fontSize: "16px" }}
        className="outline-none flex-1 h-full bg-[#ececec] appearance-none"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 cursor-pointer mr-4"
        onClick={toggleInputType}
      >
        {inputType === "password" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        ) : (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </>
        )}
      </svg>
    </div>
  </div>
);
