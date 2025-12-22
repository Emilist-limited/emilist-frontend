"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import ContactExpertModal from "./modal/ContactExpertModal";
import CustomButton from "../atoms/CustomButton";
import PageLoader from "../atoms/PageLoader";
import ProfileImage from "../atoms/ProfileImage";

import { getLevelValue } from "@/lib/helpers/getLevelValue";
import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useGetUser } from "@/features/user/hooks/useGetUser";

const PublicUserProfileWrapper = ({ userId }: { userId: string }) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [openContactModal, setOpenContactModal] = useState(false);
  const { user, isLoading } = useGetUser(userId);

  const handleOpen = () => {
    if (!currentUser) {
      router.push(ROUTES.LOGIN);
      return;
    }
    setOpenContactModal(true);
  };

  return (
    <div className="py-28 max-sm:py-6 padding-ctn bg-[#F6FDF9]">
      {isLoading ? (
        <PageLoader height="h-[80vh]" />
      ) : (
        <div className="bg-white w-full rounded-lg py-10 px-14 max-sm:px-5">
          <h2 className="sm:text-xl font-bold text-lg ">Profile</h2>
          <div className="flex mt-6 mb-20 max-md:flex-col max-md:justify-center max-sm:items-center">
            <div className="">
              <div className="relative w-[170px] h-[170px]  max-sm:w-[120px] max-sm:h-[120px] max-md:mb-5">
                {user?.profileImage ? (
                  <ProfileImage
                    src={user?.profileImage}
                    alt={`${user?.userName || "user"}'s profile picture`}
                    className="w-full h-full"
                  />
                ) : (
                  <p className="w-[170px] h-[170px]  max-sm:w-[120px] max-sm:h-[120px] rounded-full bg-slate-200 mr-2 flex-c justify-center font-bold">
                    {user?.userName?.[0]?.toUpperCase()}
                  </p>
                )}
                {user?.isVerified && (
                  <Image
                    src="/icons/verify.svg"
                    alt="verify icon"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 min-h-6 min-w-6 absolute right-4 top-2 max-sm:max-h-5 max-sm:min-h-5 max-sm:max-w-5 max-sm:min-w-5"
                  />
                )}
                <p className="bg-primary-green  text-center text-[#FCFEFD] sm:text-sm text-xs rounded-[5px] capitalize absolute -bottom-[0.9rem] left-12 px-4 max-md:left-7">
                  level {user?.level && getLevelValue(user?.level)}
                </p>
              </div>
            </div>
            <div className="ml-6 mt-2">
              <div className="flex gap-8">
                <p className="sm:text-xl font-semibold capitalize ">
                  {user?.fullName || user?.userName}
                </p>
                <div className="flex-c gap-2">
                  <Image
                    src="/icons/location.svg"
                    alt="verify icon"
                    width={20}
                    height={20}
                    className="object-contain w-6 h-6 min-h-6 min-w-6 max-sm:max-h-5 max-sm:min-h-5 max-sm:max-w-5 max-sm:min-w-5"
                  />
                  <p className=" text-[#5E625F] font-medium max-sm:text-sm capitalize ">
                    {user?.location || "N/A"}
                  </p>
                </div>
              </div>
              {currentUser?._id !== user?._id && (
                <CustomButton onClick={handleOpen}>Contact me</CustomButton>
              )}
              <ContactExpertModal
                isOpen={openContactModal}
                onClose={() => setOpenContactModal(false)}
                user={user}
              />
            </div>
          </div>
          <h2 className="sm:text-xl font-semibold text-lg pb-8">About</h2>
          <div className="flex-c gap-16 flex-wrap">
            <div className="flex-c gap-8">
              <p className="font-semibold max-sm:text-sm capitalize ">
                Gender:
              </p>
              <p className="max-sm:text-sm capitalize ">
                {user?.gender || "N/A"}
              </p>
            </div>
            <div className="flex-c gap-8">
              <p className="font-semibold max-sm:text-sm capitalize ">Email:</p>
              <p className="max-sm:text-sm capitalize ">
                {user?.email || "N/A"}
              </p>
            </div>
            <div className="flex-c gap-8">
              <p className="font-semibold max-sm:text-sm capitalize ">
                Language:
              </p>
              <p className="max-sm:text-sm capitalize ">
                {user?.language || "N/A"}
              </p>
            </div>
          </div>
          <div className="my-10">
            <p className="font-semibold max-sm:text-sm capitalize my-3">Bio</p>
            <p className="max-sm:text-sm capitalize ">{user?.bio || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicUserProfileWrapper;
