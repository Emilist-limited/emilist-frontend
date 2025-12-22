import Image from "next/image";

interface IconInfoProps {
  imgUrl: string;
  value: string | number;
  title: string;
  alt: string;
}

const IconInfo = ({ imgUrl, value, title, alt }: IconInfoProps) => {
  return (
    <div className="flex gap-2">
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={alt}
          width={20}
          height={20}
          className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
        />
      )}
      <div className="flex flex-col  gap-1">
        <h6 className=" text-lg font-semibold max-sm:text-[14px]">{value}</h6>
        <p className="text-[#474C48] max-sm:text-xs">{title}</p>
      </div>
    </div>
  );
};

export default IconInfo;
