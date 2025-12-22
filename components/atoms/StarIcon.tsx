import Image from "next/image";

import { StarIconProps } from "@/types";

const StarIcon = ({
  filled,
  size = 16,
  className,
}:StarIconProps) => (
  <Image
    src={filled ? "/icons/star-fill.svg" : "/icons/star.svg"}
    alt="rate"
    width={size}
    height={size}
    className={`object-contain ${className}`}
  />
);

export default StarIcon;
