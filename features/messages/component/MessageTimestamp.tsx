import { formatMessageDate } from "../helpers/formatMessageDate";

interface MessageTimestampProps {
  createdAt: string;
}

export const MessageTimestamp = ({ createdAt }: MessageTimestampProps) => {
  return (
    <div className="chat-footer opacity-50">
      <time className="text-[#3F556E] text-xs">
        {createdAt && formatMessageDate(createdAt)}
      </time>
    </div>
  );
};
