import Image from "next/image";

import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";

interface ChatContactCardProps {
  name: string;
  profileImage?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
}

const ChatContactCard = ({
  name,
  profileImage,
  isOnline,
  lastMessage,
  lastMessageTime,
}: ChatContactCardProps) => {
  return (
    <div className="flex gap-2 w-full">
      <div className={`${isOnline && "avatar-online"} avatar`}>
        {profileImage ? (
          <Image
            src={profileImage}
            alt={name}
            width={40}
            height={40}
            className={`object-cover max-w-10 min-w-10 w-10 h-10 max-h-10 rounded-full `}
          />
        ) : (
          <p className="max-w-10 min-w-10 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">
            {name[0].toUpperCase()}
          </p>
        )}
      </div>
      <div className="flex-1 flex flex-col w-full">
        <div className="flex justify-between w-full items-center mb-2">
          <h6 className="font-bold max-sm:text-sm truncate">{name}</h6>
          <p className="text-[#737774] text-xs max-sm:text-[8px]">
            {formatCreatedAt(lastMessageTime)}{" "}
          </p>
        </div>
        <p className="text-[#737774] text-sm max-sm:text-xs truncate w-full">
          {lastMessage?.length > 30
            ? `${lastMessage.slice(0, 30)}...`
            : lastMessage}
        </p>
      </div>
    </div>
  );
};

export default ChatContactCard;
