"use client";

import CustomModal from "@/components/atoms/CustomModal";

import { useSocketContext } from "@/lib/context/SocketContext";

import ChatUserProfile from "@/features/messages/component/ChatUserProfile";
import ChatForm from "@/features/messages/component/ChatForm";

import { ChatMessages } from "@/features/messages/component/ChatMessages";

interface ContactExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const ContactExpertModal = ({
  isOpen,
  onClose,
  user,
}: ContactExpertModalProps) => {
  const { onlineUsers } = useSocketContext();

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} width="lg">
      <div className="max-w-full w-full h-full flex flex-col sm:py-4 pt-2 pb-4 overflow-x-hidden">
        <ChatUserProfile user={user} onlineUsers={onlineUsers} />
        <ChatMessages user={user} />
        <ChatForm user={user} />
      </div>
    </CustomModal>
  );
};

export default ContactExpertModal;
