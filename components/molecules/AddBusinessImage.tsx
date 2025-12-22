"use client";

import Image from "next/image";

import { ShowToastFunction } from "@/types";
import { FetchedBusinessImageType } from "@/features/services/types";

import CloseIcon from "../atoms/CloseIcon";
import Label from "../atoms/Label";

interface AddBusinessImageProps {
  businessImages: File[];
  setBusinessImages: (image: File[] | ((prevImages: File[]) => File[])) => void;
  showToast: ShowToastFunction;
  fetchedBusinessFile?: FetchedBusinessImageType[];
  onDeleteFetchedBusinessImage?: (imgId: string) => void;
}

const AddBusinessImage = ({
  businessImages,
  setBusinessImages,
  showToast,
  fetchedBusinessFile,
  onDeleteFetchedBusinessImage,
}: AddBusinessImageProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newFiles = Array.from(e.target.files || []);
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInMB = 2 * 1024 * 1024;

    const filteredFiles = newFiles.filter((file) => {
      if (file.size > maxSizeInMB) {
        showToast({
          message: `File ${file.name} exceeds the 2MB size limit.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }
      if (!validExtensions.includes(file.type)) {
        showToast({
          message: `Unsupported file type for ${file.name}. Only jpg, jpeg, and png are allowed.`,
          type: "error",
          duration: 8000,
        });
        return false;
      }
      return true;
    });

    setBusinessImages((prevFiles: File[]) => [...prevFiles, ...filteredFiles]);
  };

  const handleDelete = (index: number) => {
    setBusinessImages((prevFiles: File[]) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="w-full pb-8 space-y-1">
      <Label
        htmlFor="business-pic "
        className="py-2 max-sm:text-sm font-medium"
      >
        Add images
      </Label>
      <div className="flex flex-wrap gap-4">
        {fetchedBusinessFile?.map((file) => (
          <div
            key={file._id}
            className="relative w-[216px] h-[210px] bg-[#ECECEC] rounded-md"
          >
            <Image
              src={file.imageUrl}
              alt={`business-picture-${file._id}`}
              width={300}
              height={300}
              className="object-cover w-full h-full rounded-md"
            />
            {onDeleteFetchedBusinessImage && (
              <CloseIcon
                onClick={() => onDeleteFetchedBusinessImage(file?._id)}
                extraStyle="absolute bottom-0 right-0"
              />
            )}
          </div>
        ))}
        {businessImages.map((file, index) => (
          <div
            key={index}
            className="relative w-[216px] h-[210px] bg-[#ECECEC] rounded-md"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`business-picture-${index}`}
              width={300}
              height={300}
              className="object-cover w-full h-full rounded-md"
            />
            <CloseIcon
              onClick={() => handleDelete(index)}
              extraStyle="absolute bottom-0 right-0"
            />
          </div>
        ))}
        <label
          htmlFor="business-pic"
          className="w-[216px] h-[210px] flex justify-center items-center bg-[#ECECEC] rounded-md cursor-pointer border-dashed border-1 border-gray-400"
        >
          <input
            id="business-pic"
            type="file"
            onChange={handleChange}
            name="businessImages"
            multiple
            className="hidden"
            style={{ fontSize: "16px" }}
          />
          <span>Add More</span>
        </label>
      </div>
    </div>
  );
};

export default AddBusinessImage;
