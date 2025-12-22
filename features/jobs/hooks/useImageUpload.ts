import { useState } from "react";

import { useToast } from "@/lib/hooks/useToast";
import { JobFilesType } from "../types";

export const useImageUpload = () => {
  const { showToast } = useToast();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [fetchedImages, setFetchedImages] = useState<JobFilesType[] | []>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInMB = 2 * 1024 * 1024;
    const maxImages = 5;

    // Check if adding new files would exceed the limit
    const totalImages = selectedImageFiles.length + selectedFiles.length;
    if (totalImages > maxImages) {
      showToast({
        message: `You can only upload a maximum of ${maxImages} images. Currently selected: ${selectedImageFiles.length}`,
        type: "error",
        duration: 8000,
      });
      return;
    }

    // Check if user already has maximum images
    if (selectedImageFiles.length >= maxImages) {
      showToast({
        message: `Maximum of ${maxImages} images allowed. Please remove some images before adding new ones.`,
        type: "error",
        duration: 8000,
      });
      return;
    }

    const newImages: File[] = [];
    const newImageUrls: string[] = [];

    Array.from(selectedFiles).forEach((file: File) => {
      // Stop processing if we've reached the limit
      if (selectedImageFiles.length + newImages.length >= maxImages) {
        return;
      }

      if (file.size > maxSizeInMB) {
        showToast({
          message: `File ${file.name} exceeds the 2MB size limit.`,
          type: "error",
          duration: 8000,
        });
        return;
      }
      if (!validExtensions.includes(file.type)) {
        showToast({
          message: `Unsupported file type for ${file.name}. Only jpg, jpeg, and png are allowed.`,
          type: "error",
          duration: 8000,
        });
        return;
      }
      newImages.push(file);
      newImageUrls.push(URL.createObjectURL(file));
    });

    // Show warning if some files were not added due to limit
    if (
      selectedFiles.length > newImages.length &&
      selectedImageFiles.length + newImages.length === maxImages
    ) {
      showToast({
        message: `Only ${newImages.length} image(s) were added. Maximum of ${maxImages} images allowed.`,
        type: "error",
        duration: 8000,
      });
    }

    setSelectedImages((prev) =>
      prev ? prev.concat(newImageUrls) : newImageUrls
    );
    setSelectedImageFiles((prev) => [...prev, ...newImages]);
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...selectedImageFiles];
    newImages.splice(index, 1);
    setSelectedImageFiles(newImages);
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    selectedImages,
    selectedImageFiles,
    onSelectFile,
    handleImageDelete,
    setSelectedImageFiles,
    setSelectedImages,
    fetchedImages,
    setFetchedImages,
  };
};
