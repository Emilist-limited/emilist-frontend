import { ScrollArea } from "@/components/ui/scroll-area";

import { CoversationType, participantType } from "../types";

import MessageSkeleton from "@/components/molecules/skeletonLoaders/MessageSkeleton";
import SearchContact from "./SearchContact";
import ChatContactCard from "./ChatContactCard";

interface ChatContactsProps {
  currentUserId: string;
  isLoading: boolean;
  onlineUsers: string[];
  conversations: CoversationType[] | [];
  selectedConversation: CoversationType | null;
  setSelectedConversation: (conversation: CoversationType | null) => void;
}

const ChatContacts = ({
  isLoading,
  currentUserId,
  onlineUsers,
  conversations,
  selectedConversation,
  setSelectedConversation,
}: ChatContactsProps) => {
  return (
    <div
      className={`md:w-80 w-full ${
        selectedConversation ? "max-md:hidden" : "max-md:block"
      }`}
    >
      <ScrollArea className="pb-8 border-r-1  border-[#DEE5ED] h-full overflow-y-auto">
        <div className="flex items-center gap-4 px-6 max-md:px-3 pt-6">
          <h4 className="sm:text-lg font-semibold">Inbox</h4>
        </div>
        <SearchContact />
        <div className="flex flex-col my-3 mb-6 w-full overflow-hidden">
          {isLoading ? (
            <MessageSkeleton />
          ) : (
            <>
              {conversations?.map((conversation: any, index) => {
                const isReceiver = conversation?.participants?.find(
                  (participant: any) => participant?._id !== currentUserId
                );
                return (
                  <div
                    key={index}
                    className={`w-full px-6 max-md:px-3 py-3 hover:bg-slate-50 duration-300 transition-all cursor-pointer ${
                      conversations?.length - 1 !== index &&
                      "border-[#CBD5E1] border-b"
                    } ${
                      selectedConversation?.chatId === conversation?.chatId &&
                      "bg-slate-100"
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    {conversation?.participants
                      ?.filter(
                        (participant: participantType) =>
                          participant._id !== currentUserId
                      )
                      ?.map((participant: participantType) => (
                        <ChatContactCard
                          key={participant._id}
                          isOnline={onlineUsers.includes(isReceiver?._id)}
                          name={participant.fullName || participant.userName}
                          profileImage={participant.profileImage}
                          lastMessage={conversation?.lastMessage?.content}
                          lastMessageTime={conversation?.lastMessage?.createdAt}
                        />
                      ))}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatContacts;
