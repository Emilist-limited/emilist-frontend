const NoMoreMessage = ({
  message,
  wrap = "whitespace-nowrap",
}: {
  message: string;
  wrap?: string;
}) => {
  return (
    <div className="flex items-center pr-5">
      <p className={`text-gray-500 text-center ${wrap}`}>{message}</p>
    </div>
  );
};

export default NoMoreMessage;
