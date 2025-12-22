const NoMoreMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center pr-5">
      <p className="text-gray-500 text-center whitespace-nowrap">{message}</p>
    </div>
  );
};

export default NoMoreMessage;
