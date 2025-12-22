import Image from "next/image";

interface CheckIconProps {
  className?: string;
  imgUrl: string;
  alt: string;
  size?: number;
}

const CheckIcon = ({
  size = 20,
  alt,
  className = "w-7 h-7",
  imgUrl,
}: CheckIconProps) => {
  return (
    <Image
      src={imgUrl}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain cursor-pointer ${className}`}
    />
  );
};

export default CheckIcon;
