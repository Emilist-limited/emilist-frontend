"use client";

import { useState } from "react";

import MainImage from "@/components/atoms/MainImage";
import ThumbnailGallery from "../ThumbnailGallery";

import { ProductImage } from "@/features/materials/types";

interface ImageSliderProps {
  images: ProductImage[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const prevImg = () => {
    const isFirstSlide = currentImage === 0;
    const newIndex = isFirstSlide ? images?.length - 1 : currentImage - 1;
    setCurrentImage(newIndex);
  };

  const nextImg = () => {
    const isLastSlide = currentImage === images?.length - 1;
    const newIndex = isLastSlide ? 0 : currentImage + 1;
    setCurrentImage(newIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className="max-w-2xl w-full">
      <div className="flex flex-col w-full gap-4 relative">
        {images?.length > 0 && (
          <>
            <MainImage
              src={images[currentImage].imageUrl || ""}
              alt="service image"
              onPrev={prevImg}
              onNext={nextImg}
            />
            <ThumbnailGallery
              images={images}
              currentIndex={currentImage}
              onThumbnailClick={handleThumbnailClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
