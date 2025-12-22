import { memo } from "react";
import Image from "next/image";

import { JobFilesType } from "../types";

interface FileUploadProps {
  selectedImages: string[] | null;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
  fetchedImages?: JobFilesType[] | [];
  onDeleteFetchedJobImage?: (imageId: string) => void;
  isMaterial?: boolean;
}

const JobFileUpload: React.FC<FileUploadProps> = memo(
  ({
    selectedImages,
    setSelectedImages,
    onSelectFile,
    handleImageDelete,
    fetchedImages,
    onDeleteFetchedJobImage,
    isMaterial,
  }) => {
    const isFetchedTrue = fetchedImages && fetchedImages?.length > 0;
    return (
      <div className="w-full">
        <label
          className="flex items-center gap-1 text-primary-green py-2 font-medium max-sm:text-sm cursor-pointer max-w-fit"
          htmlFor="attach-file"
        >
          <Image
            src="/icons/add.svg"
            alt="logo"
            width={130}
            height={30}
            className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
          />
          Attach a file
        </label>
        <input
          style={{ fontSize: "16px" }}
          type="file"
          id="attach-file"
          className="h-0 w-0 invisible"
          name="files"
          accept="image/*"
          multiple
          onChange={onSelectFile}
        />
        <div className="flex items-center gap-2 w-full flex-wrap">
          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <div className="relative w-20 h-20" key={index}>
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute bottom-0 right-0 text-red-600 font-bold bg-white border-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedImages(
                        selectedImages?.filter((e) => e !== image)
                      );
                      handleImageDelete(index);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              );
            })}
          {isFetchedTrue &&
            fetchedImages?.map((image) => {
              const imageId = isMaterial ? image?._id : image?.id;
              return (
                <div className="relative w-20 h-20" key={imageId}>
                  <img
                    src={image?.url || image?.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {onDeleteFetchedJobImage && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 absolute bottom-0 right-0 text-red-600 font-bold bg-white border-gray-100 cursor-pointer"
                      onClick={() => onDeleteFetchedJobImage(imageId || "")}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
);

export default JobFileUpload;
