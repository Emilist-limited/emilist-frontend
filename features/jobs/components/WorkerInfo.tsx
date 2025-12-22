"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

import CustomButton from "@/components/atoms/CustomButton";
import ProfileImage from "@/components/atoms/ProfileImage";
import ProfileInitial from "@/components/atoms/ProfileInitial";

import { useOpenChatState } from "@/features/messages/hooks/useOpenChatState";
import { User } from "@/types";
import { useMemoizedUser } from "@/features/auth/helpers";

const SideChatModal = dynamic(
  () => import("@/components/molecules/SideChatModal")
);

interface WorkerInfoProps {
  acceptedApplication: {
    user: User;
  };
}

const WorkerInfo = ({ acceptedApplication }: WorkerInfoProps) => {
  const { openChat, handleOpen } = useOpenChatState();

  const chatUser = useMemoizedUser(acceptedApplication?.user);

  return (
    <div className="w-full px-10 max-sm:px-5">
      <h6 className="font-semibold max-sm:text-sm">Workers Info</h6>
      {acceptedApplication ? (
        <div className="flex-c-b gap-5 flex-wrap mt-4">
          <div className="flex-c gap-2">
            {acceptedApplication?.user?.profileImage ? (
              <ProfileImage
                src={acceptedApplication?.user?.profileImage}
                alt="Worker profile picture"
                size={44}
                className="w-[44px] h-[44px] max-sm:w-[25px] max-sm:h-[25px]"
              />
            ) : (
              <ProfileInitial
                initial={
                  acceptedApplication?.user?.userName?.[0]?.toUpperCase() || ""
                }
                className="w-[44px] h-[44px] max-sm:w-[25px] max-sm:h-[25px]"
              />
            )}
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h6 className="sm:text-lg font-medium">
                  {acceptedApplication?.user?.fullName ||
                    acceptedApplication?.user?.userName}
                </h6>
              </div>
            </div>
          </div>

          <CustomButton onClick={handleOpen}>
            <Image
              src="/icons/messages.svg"
              alt="menu"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-1"
            />
            Chats
          </CustomButton>

          <SideChatModal
            toggle={handleOpen}
            user={chatUser}
            isOpen={openChat}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WorkerInfo;
