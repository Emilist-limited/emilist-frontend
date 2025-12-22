import Image from "next/image";
import { FC } from "react";

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const AppImage: FC<AppImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-contain ${className}`}
    priority={priority}
  />
);

export default AppImage;
