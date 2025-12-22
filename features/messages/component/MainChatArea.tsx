import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { CoversationType, participantType } from "../types";
import { useGetChat } from "../hooks/useGetChat";
import { groupMessagesByDate } from "../hooks/groupMessagesByDate";
import { ChatMessage } from "./ChatMessage";

import PageLoader from "@/components/atoms/PageLoader";
import MessageEmptyState from "./MessageEmptyState";
import MainChatForm from "./MainChatForm";
import ProfileAvatar from "@/components/atoms/ProfileAvatar";
import MessageBackButton from "./MessageBackButton";

interface MessageWrapperProps {
  selectedConversation: CoversationType | null;
  setSelectedConversation: (conversation: CoversationType | null) => void;
  currentUserId: string;
  getAllCoversations: () => void;
}

const MainChatArea = ({
  selectedConversation,
  setSelectedConversation,
  currentUserId,
  getAllCoversations,
}: MessageWrapperProps) => {
  const lastMessageRef: any = useRef<HTMLDivElement>(null);

  const { getMessages, messages, isLoading } = useGetChat();
  const groupedMessages = groupMessagesByDate(messages);

  const isReceiver = selectedConversation?.participants?.find(
    (participant: participantType) => participant?._id !== currentUserId
  );

  const isReceiverId = isReceiver?._id || "";

  useEffect(() => {
    //clean up (unmount)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    setTimeout;
    getMessages(isReceiverId);
  }, [isReceiverId]);

  return (
    <div
      className={`flex-1 w-full  h-full ${
        selectedConversation ? "max-md:block" : "max-md:hidden"
      }`}
    >
      {!selectedConversation ? (
        <MessageEmptyState />
      ) : (
        <div className="relative h-full flex flex-col">
          <div className="w-full border-b-1 border-[#DEE5ED] flex-c gap-2 px-6 max-md:px-3 py-3 h-[8vh]">
            <MessageBackButton
              setSelectedConversation={setSelectedConversation}
            />
            <ProfileAvatar
              profileImage={isReceiver?.profileImage}
              name={isReceiver?.fullName || isReceiver?.userName || ""}
              className="h-10 w-10"
            />
            <h6 className="sm:text-lg font-bold ">
              {isReceiver?.fullName || isReceiver?.userName}
            </h6>
          </div>

          {isLoading ? (
            <PageLoader height="h-[40vh]" />
          ) : (
            <>
              <ScrollArea className="flex-1 h-full overflow-y-auto w-full  px-6 max-md:px-3">
                {Object.keys(groupedMessages).map((dateKey, dateIndex) => (
                  <div key={dateIndex} className="flex flex-col">
                    <div className="text-center text-gray-500 text-sm my-2">
                      {dateKey}
                    </div>
                    {groupedMessages[dateKey].map(
                      (message: any, index: number) => {
                        const isLastMessage =
                          dateIndex ===
                            Object.keys(groupedMessages).length - 1 &&
                          index === groupedMessages[dateKey].length - 1;
                        return (
                          <ChatMessage
                            key={`${dateKey}-${index}`}
                            message={message}
                            user={isReceiver}
                            isLastMessage={isLastMessage}
                            lastMessageRef={lastMessageRef}
                          />
                        );
                      }
                    )}
                  </div>
                ))}
              </ScrollArea>
              <MainChatForm
                isReceiverId={isReceiverId}
                getAllCoversations={getAllCoversations}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MainChatArea;
