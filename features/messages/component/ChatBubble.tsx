interface ChatBubbleProps {
  message: any;
  isSentByCurrentUser: boolean;
}

export const ChatBubble = ({
  message,
  isSentByCurrentUser,
}: ChatBubbleProps) => {
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div
      className={`chat-bubble rounded-2xl ${
        isSentByCurrentUser
          ? "bg-[#054753] text-[#FCFEFD]"
          : "bg-[#ECECEC] text-[#1d231f]"
      } ${shakeClass}`}
    >
      {message.content}
    </div>
  );
};
