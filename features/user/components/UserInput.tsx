interface UserInputProps {
  editingField?: boolean;
  title: string;
  id: string;
  value: number | string | undefined;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UserInput = ({
  editingField = false,
  title,
  id,
  value,
  handleChange,
}: UserInputProps) => {
  return (
    <div className="space-y-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green col-span-1 w-full">
      <label htmlFor={id} className="font-semibold">
        {title}
      </label>{" "}
      {editingField ? (
        <input
          style={{ fontSize: "16px" }}
          type="text"
          name={id}
          id={id}
          value={value || ""}
          onChange={handleChange}
          className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
        />
      ) : (
        <p className="h-8">{value || "N/A"}</p>
      )}
    </div>
  );
};

export default UserInput;
