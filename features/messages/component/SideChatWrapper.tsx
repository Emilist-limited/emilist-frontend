import Image from "next/image";
import dynamic from "next/dynamic";

import CustomButton from "@/components/atoms/CustomButton";

import { useOpenChatState } from "../hooks/useOpenChatState";
import { User } from "@/types";

const SideChatModal = dynamic(
  () => import("@/components/molecules/SideChatModal")
);

const SideChatWrapper = ({ chatUser }: { chatUser: User }) => {
  const { openChat, handleOpen } = useOpenChatState();
  return (
    <>
      {" "}
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
      <SideChatModal toggle={handleOpen} user={chatUser} isOpen={openChat} />
    </>
  );
};

export default SideChatWrapper;
