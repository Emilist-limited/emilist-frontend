"use client";

import Image from "next/image";

import { useSendMessage } from "../hooks/useSendMessage";

const MainChatForm = ({
  isReceiverId,
  getAllCoversations,
}: {
  isReceiverId: string;
  getAllCoversations: () => void;
}) => {
  const { message, setMessage, handleSendMessage } = useSendMessage();

  const onSendMessage = (e: React.FormEvent) => {
    handleSendMessage(e, isReceiverId, () => {
      getAllCoversations();
    });
  };

  return (
    <form
      onSubmit={onSendMessage}
      className="max-w-full w-full flex items-center px-6 max-md:px-1 sm:gap-4 gap-2 bg-white py-1 h-[6vh]"
    >
      <div className="flex-1 flex bg-[#ECECEC] rounded-full items-center h-full sm:px-6 px-2 gap-2">
        {/* <div className="flex items-center">
          <label htmlFor="smiley">
            <Image
              src="/icons/emoji-happy.svg"
              width={15}
              height={15}
              alt="search"
              className="object-contain w-6 h-6 cursor-pointer"
            />
          </label>
          <input
            style={{ fontSize: "16px" }}
            type="file"
            id="smiley"
            className="invisible h-0 w-0"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="smiley">
            <Image
              src="/icons/attach-square.svg"
              width={15}
              height={15}
              alt="search"
              className="object-contain w-6 h-6 cursor-pointer"
            />
          </label>
          <input
            style={{ fontSize: "16px" }}
            type="file"
            id="smiley"
            className="invisible h-0 w-0"
          />
        </div> */}
        <input
          style={{ fontSize: "16px" }}
          type="text"
          placeholder="Type your message"
          className="flex-1 bg-transparent outline-none sm:text-sm text-xs"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit">
        <Image
          src="/icons/Paper airplane.svg"
          width={15}
          height={15}
          alt="search"
          className="object-cover sm:w-6 sm:h-6 h-5 w-5 cursor-pointer"
        />
      </button>
    </form>
  );
};

export default MainChatForm;
