"use client";

import Image from "next/image";

import { useSendMessage } from "../hooks/useSendMessage";

const SideModalChatForm = ({ userId }: { userId: string }) => {
  const { message, setMessage, handleSendMessage } = useSendMessage();

  return (
    <div className="px-4 py-2 max-sm:px-2">
      <form
        onSubmit={(e) => handleSendMessage(e, userId)}
        className="bg-[#ECECEC] rounded-full h-[40px] p-1 px-2 flex items-center"
      >
        <button type="submit">
          <Image
            src="/icons/add-circle.svg"
            alt="menu"
            width={24}
            height={24}
            className="object-contain w-8 h-8 max-sm:w-6 max-sm:h-6 cursor-pointer"
          />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="outline-none flex-1 bg-transparent px-1 "
          style={{ fontSize: "16px" }}
        />
      </form>
    </div>
  );
};

export default SideModalChatForm;
