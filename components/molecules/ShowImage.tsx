"use client";

import Image from "next/image";
import { useState } from "react";

import ImageModal from "../organisms/modal/ImageModal";

interface ShowImageProps {
  alt: string;
  src: string;
  extraStyle: string;
  size?: number;
}

const ShowImage = ({ alt, src, extraStyle, size = 60 }: ShowImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={extraStyle} onClick={() => setIsOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={`object-cover cursor-pointer ${extraStyle}`}
        />
      </div>
      <ImageModal
        alt={alt}
        src={src}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default ShowImage;
