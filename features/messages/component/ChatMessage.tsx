import { ChatBubble } from "./ChatBubble";
import { MessageTimestamp } from "./MessageTimestamp";

interface ChatMessageProps {
  message: any;
  user: any;
  isLastMessage?: boolean;
  lastMessageRef?: React.RefObject<HTMLDivElement>;
}

export const ChatMessage = ({
  message,
  user,
  isLastMessage,
  lastMessageRef,
}: ChatMessageProps) => {
  const isSentByCurrentUser = message.senderId !== user._id;

  return (
    <div
      className="w-full flex flex-col"
      ref={isLastMessage ? lastMessageRef : null}
    >
      <div
        className={`chat ${isSentByCurrentUser ? "chat-end" : "chat-start"}`}
      >
        <ChatBubble
          message={message}
          isSentByCurrentUser={isSentByCurrentUser}
        />
        <MessageTimestamp createdAt={message.createdAt} />
      </div>
    </div>
  );
};
