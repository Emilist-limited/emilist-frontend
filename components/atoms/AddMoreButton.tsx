import Image from "next/image";

const AddMoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="w-full flex items-center justify-end gap-1"
      onClick={onClick}
    >
      <Image
        src="/icons/add.svg"
        alt="logo"
        width={130}
        height={30}
        className="object-contain w-5 h-5"
      />{" "}
      <p className="text-primary-green font-medium max-sm:text-sm">ADD MORE</p>
    </button>
  );
};

export default AddMoreButton;
