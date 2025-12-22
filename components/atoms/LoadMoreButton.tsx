import Image from "next/image";

const LoadMoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="text-primary-green flex-c gap-2 font-medium"
      onClick={onClick}
    >
      <Image
        src="/icons/add.svg"
        width={8}
        height={8}
        alt="add"
        className="w-6 h-6 object-contain"
      />
      Load more
    </button>
  );
};

export default LoadMoreButton;
