import Image from "next/image";

const EllipsisButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <Image
        src="/icons/Menu.svg"
        height={20}
        width={20}
        alt="menu-dot"
        className="object-contain h-8 w-6"
      />
    </button>
  );
};

export default EllipsisButton;
