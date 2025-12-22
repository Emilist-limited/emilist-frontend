import Image from "next/image";

interface ThumbnailImageProps {
  src: string;
  alt: string;
  isActive: boolean;
  onClick: () => void;
}

const ThumbnailImage = ({
  src,
  alt,
  isActive,
  onClick,
}: ThumbnailImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={122}
      height={122}
      className={`${
        isActive ? "opacity-100" : "opacity-50"
      } object-cover w-28 h-28 max-sm:w-20 max-sm:h-20 rounded-md cursor-pointer hover:border-1  hover:border-primary-green transition-all duration-300 border-primary-green border-1`}
      onClick={onClick}
    />
  );
};

export default ThumbnailImage;
