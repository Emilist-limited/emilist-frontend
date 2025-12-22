"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { useGetAllChats } from "../hooks/useGetAllChats";
import { ChatContext } from "@/lib/context/ChatState";
import { useSocketContext } from "@/lib/context/SocketContext";

import ChatContacts from "./ChatContacts";
import MainChatArea from "./MainChatArea";
import EmptyContactsState from "./EmptyContactsState";
import PageLoader from "@/components/atoms/PageLoader";

const MessageWrapper = () => {
  const { currentUser } = useContext(AuthContext);
  const { conversations, isLoading, getAllCoversations } = useGetAllChats();
  const { selectedConversation, setSelectedConversation } =
    useContext(ChatContext);

  const { onlineUsers } = useSocketContext();

  const currentUserId = currentUser?._id;

  return (
    <div className="padding-ctn pb-28 max-h-screen">
      <div className="h-[10vh]" />
      <div className="border-1 border-[#DEE5ED] sm:max-h-[85vh] sm:h-[85vh] max-h-[70vh] h-[70vh] overflow-hidden flex sm:mt-6 mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <PageLoader height="h-[40vh]" />
          </div>
        ) : (
          <>
            {conversations?.length < 1 || !conversations ? (
              <EmptyContactsState />
            ) : (
              <>
                <ChatContacts
                  onlineUsers={onlineUsers}
                  isLoading={isLoading}
                  conversations={conversations}
                  selectedConversation={selectedConversation}
                  setSelectedConversation={setSelectedConversation}
                  currentUserId={currentUserId}
                />
                <MainChatArea
                  selectedConversation={selectedConversation}
                  setSelectedConversation={setSelectedConversation}
                  currentUserId={currentUserId}
                  getAllCoversations={getAllCoversations}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageWrapper;
