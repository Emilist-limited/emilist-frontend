const RemoveCartItem = ({ onClick }: { onClick: () => Promise<void> }) => {
  return (
    <button
      className="text-red-400 sm:text-sm text-xs font-medium w-fit text-start"
      onClick={onClick}
    >
      Remove
    </button>
  );
};

export default RemoveCartItem;
