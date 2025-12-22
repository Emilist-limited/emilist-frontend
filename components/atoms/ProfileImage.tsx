import Image from "next/image";

import { ProfileImageProps } from "@/types";

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  size = 60,
  className,
}) => (
  <Image
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`object-cover rounded-full ${className}`}
  />
);

export default ProfileImage;
