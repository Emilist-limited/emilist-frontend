import React from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import Image from "next/image";

const MainSendMessageForm = ({ isReceiverId }: { isReceiverId: string }) => {
  const { loading, message, setMessage, handleSendMessage } = useSendMessage();

  return (
    <form
      onSubmit={(e) => handleSendMessage(e, isReceiverId)}
      className="w-full flex items-center px-6 max-md:px-3 gap-4 absolute bottom-0 left-0 right-0 bg-white py-2"
    >
      <div className="flex-1 flex bg-[#ECECEC] rounded-full items-center h-[40px] px-6 gap-2">
        <div className="flex items-center">
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
            className="invisible h-[1px] w-[1px]"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="smiley">
            <Image
              src="/assets/icons/attach-square.svg"
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
            className="invisible h-[1px] w-[1px]"
          />
        </div>
        <input
          style={{ fontSize: "16px" }}
          type="text"
          placeholder="Type your message"
          className="flex-1 bg-transparent outline-none text-[#303632] text-[14px] ml-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {loading ? (
        <button type="button">
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      ) : (
        <button type="submit">
          <Image
            src="/assets/icons/Paper airplane.svg"
            width={15}
            height={15}
            alt="search"
            className="object-contain w-[16px] h-[16px] cursor-pointer"
          />
        </button>
      )}
    </form>
  );
};

export default MainSendMessageForm;
