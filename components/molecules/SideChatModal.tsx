"use client";

import { memo, useEffect, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ScrollArea } from "../ui/scroll-area";
import { useSocketContext } from "@/lib/context/SocketContext";
import { useListenMessage } from "@/lib/hooks/useListenMessage";
import { useGetChat } from "@/features/messages/hooks/useGetChat";
import { groupMessagesByDate } from "@/features/messages/hooks/groupMessagesByDate";
import { ChatMessage } from "@/features/messages/component/ChatMessage";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { User } from "@/types";

import SideModalChatForm from "@/features/messages/component/SideModalChatForm";
import PageLoader from "../atoms/PageLoader";
import ChatUserProfile from "@/features/messages/component/ChatUserProfile";

interface SideChatModalProps {
  toggle: () => void;
  isOpen: boolean;
  user: User;
}

const SideChatModal = memo(
  ({ isOpen, toggle, user }: SideChatModalProps) => {
    const modalRef = useOutsideClick(toggle);
    const lastMessageRef: any = useRef(null);

    useListenMessage();

    const { onlineUsers } = useSocketContext();
    const { getMessages, messages, isLoading } = useGetChat();
    const groupedMessages = groupMessagesByDate(messages);

    useEffect(() => {
      if (lastMessageRef.current) {
        setTimeout(() => {
          lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, [messages]);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    useEffect(() => {
      setTimeout;
      getMessages(user?._id);
    }, [user]);

    if (!isOpen) {
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed w-full h-screen min-h-screen top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] z-40 !m-0"
        >
          <div className="flex justify-end sm:items-center pt-10 w-full h-full">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className=" max-w-[280px] w-[280px] min-w-[260px] bg-white min-h-[60vh] sm:max-h-[60vh] max-h-[80vh] h-full mr-6 flex flex-col relative pt-2"
            >
              <ChatUserProfile
                user={user}
                onlineUsers={onlineUsers}
                className="max-w-[35px] max-h-[35px] w-[35px] h-[35px] max-sm:w-[24px] max-sm:h-[24px]"
                closeBtn
                toggle={toggle}
                nameStyle="sm:text-base text-sm"
              />

              {isLoading ? (
                <PageLoader height="h-[40vh]" />
              ) : (
                <>
                  {" "}
                  <ScrollArea className="px-4 py-2 max-sm:px-2 flex flex-col flex-1 h-full overflow-y-auto">
                    {!messages || messages?.length < 1 ? (
                      <p className="text-xs text-primary-green">
                        Send a message to start conversation.
                      </p>
                    ) : (
                      <>
                        {Object.keys(groupedMessages).map(
                          (dateKey, dateIndex) => (
                            <div key={dateKey} className="flex flex-col">
                              <div className=" text-center text-gray-500 text-sm my-2">
                                {dateKey}
                              </div>
                              {groupedMessages[dateKey].map(
                                (message: any, index: number) => {
                                  const isLastMessage =
                                    dateIndex ===
                                      Object.keys(groupedMessages).length - 1 &&
                                    index ===
                                      groupedMessages[dateKey].length - 1;
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
                          )
                        )}
                      </>
                    )}
                  </ScrollArea>
                  <SideModalChatForm userId={user?._id} />
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isOpen === nextProps.isOpen &&
      prevProps.user?._id === nextProps.user?._id
    );
  }
);

export default SideChatModal;
