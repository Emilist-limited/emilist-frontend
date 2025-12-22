const UnEditableInput = ({
  title,
  className = "h-10",
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`min-w-full w-full max-w-full flex-c rounded-lg px-2 bg-[#ececec] cursor-not-allowed opacity-50 ${className}`}
    >
      {title}
    </div>
  );
};

export default UnEditableInput;
