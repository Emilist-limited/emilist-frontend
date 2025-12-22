import Image from "next/image";

const CompareImage = ({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-cover ${className}`}
  />
);

export default CompareImage;
