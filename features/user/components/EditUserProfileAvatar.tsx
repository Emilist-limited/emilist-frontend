import Image from "next/image";
import { useState } from "react";

import Rating from "@/components/molecules/Rating";
import VerifyUserModal from "@/components/organisms/modal/VerifyUserModal";
import CustomButton from "@/components/atoms/CustomButton";

interface EditUserProfileAvatarProps {
  currentImage: string | null;
  profileImage: File | null;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
  showSave: boolean;
}

const EditUserProfileAvatar = ({
  currentImage,
  handleChangeFile,
  profileImage,
  handleUpdate,
  showSave,
}: EditUserProfileAvatarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex-c-b max-sm:flex-col">
      <div className="">
        <div className="flex gap-4 items-end">
          <div className="relative w-[109px] h-[109px]  max-sm:w-[90px] max-sm:h-[90px] bg-[#F0FDF5] rounded-full border-1">
            <Image
              src={currentImage ? currentImage : "/images/user-profile.svg"}
              alt="profile picture"
              width={109}
              height={109}
              className="object-cover w-full h-full min-h-full min-w-full rounded-full"
            />
            <input
              style={{ fontSize: "16px" }}
              type="file"
              name="image"
              id="profileImage"
              onChange={handleChangeFile}
              className="h-0 w-0 invisible"
            />
            <Image
              src="/icons/verify.svg"
              alt="verify icon"
              width={20}
              height={20}
              className="object-contain w-6 h-6 min-h-6 min-w-6 absolute right-0 top-2 max-sm:max-h-5 max-sm:min-h-5 max-sm:max-w-5 max-sm:min-w-5"
            />
            <p className="bg-primary-green  text-center text-[#FCFEFD] text-sm max-sm:text-xs rounded capitalize absolute -bottom-[0.9rem] left-4 px-4 max-sm:left-2">
              level 5
            </p>
          </div>
          {profileImage?.name && showSave ? (
            <button
              onClick={handleUpdate}
              type="button"
              className="text-white bg-primary-green rounded-full px-4 py-1"
            >
              Save
            </button>
          ) : (
            <label
              htmlFor="profileImage"
              className="border-1 border-primary-green rounded-full px-4 py-1 cursor-pointer"
            >
              Change profile
            </label>
          )}
        </div>

        <div className="flex items-center gap-1 my-8">
          <Rating rating={4} />
        </div>
      </div>
      <CustomButton onClick={showModal}> Request Verification</CustomButton>
      <VerifyUserModal onCancel={onCancel} isOpen={isModalOpen} />
    </div>
  );
};

export default EditUserProfileAvatar;
