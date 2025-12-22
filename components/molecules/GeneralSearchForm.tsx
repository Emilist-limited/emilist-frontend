interface GeneralSearchFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const GeneralSearchForm = ({
  onSubmit,
  search,
  onChange,
  className,
}: GeneralSearchFormProps) => (
  <form
    onSubmit={onSubmit}
    className={`flex-1 flex items-center gap-2 px-2 h-12 rounded-lg border-[#737774] border-1 focus-within:border-primary-green max-sm:h-11 shadow-lg max-w-[500px] ${className}`}
  >
    <button type="submit" className="text-xl text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    <input
      style={{ fontSize: "16px" }}
      type="text"
      placeholder="Search"
      value={search}
      onChange={onChange}
      className="focus:outline-none max-md:text-14 w-full bg-white"
    />
  </form>
);

export default GeneralSearchForm;
