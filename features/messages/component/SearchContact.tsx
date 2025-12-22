import Image from "next/image";

const SearchContact = () => {
  return (
    <div className="px-6 max-md:px-3">
      <div className="flex my-5 items-center border-1 border-[#CBD5E1] bg-[#FAFAFA] rounded-[4.65px] px-2 h-11 focus-within:border-primary-green">
        <Image
          src="/icons/search-icon.svg"
          width={20}
          height={20}
          alt="search"
          className="object-contain w-6 h-6"
        />
        <input
          type="text"
          placeholder="search"
          className="pl-2  bg-transparent flex-1 outline-none text-[#304155] text-sm"
          style={{ fontSize: "16px" }}
        />
      </div>
    </div>
  );
};

export default SearchContact;
