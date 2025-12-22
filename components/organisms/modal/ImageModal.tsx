"use client";

import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onCancel: () => void;
}

const ImageModal = ({ src, alt, isOpen, onCancel }: ImageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 w-full h-screen cursor-zoom-out"
      onClick={onCancel}
    >
      <div
        className="relative h-full  p-8 flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors"
          onClick={onCancel}
        >
          ×
        </button>

        <Image
          src={src}
          alt={alt}
          width={1700}
          height={1000}
          className="object-contain w-auto h-full rounded-lg cursor-default"
        />
      </div>
    </div>
  );
};

export default ImageModal;
