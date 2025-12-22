import { useEffect, useRef } from "react";

import { ScrollArea } from "@radix-ui/react-scroll-area";

import { ChatMessage } from "./ChatMessage";
import { groupMessagesByDate } from "../hooks/groupMessagesByDate";
import PageLoader from "@/components/atoms/PageLoader";
import { useGetChat } from "../hooks/useGetChat";

interface ChatMessagesProps {
  user: any;
}

export const ChatMessages = ({ user }: ChatMessagesProps) => {
  const lastMessageRef: any = useRef<HTMLDivElement>(null);

  const { getMessages, messages, isLoading } = useGetChat();
  const groupedMessages = groupMessagesByDate(messages);

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
    getMessages(user?._id);
  }, [user]);

  return (
    <div className="w-full px-3 max-sm:px-2">
      <ScrollArea className="px-4 py-2 max-sm:px-2 flex flex-col flex-1 max-h-[60vh] h-[60vh] min-h-[60vh] overflow-y-auto hide-scrollbar">
        {isLoading ? (
          <PageLoader height="h-[40vh]" />
        ) : (
          <>
            {!messages || messages.length < 1 ? (
              <p className="text-primary-green">
                Send a message to start conversation.
              </p>
            ) : (
              <>
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
                            user={user}
                            isLastMessage={isLastMessage}
                            lastMessageRef={lastMessageRef}
                          />
                        );
                      }
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
};
