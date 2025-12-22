import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";

const MessageEmptyState = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center text-gray-600 font-semibold flex flex-col items-center gap-2 sm:text-lg md:text-xl">
        <p>Welcome 👋 {currentUser?.fullName || currentUser?.userName}</p>
        <p>Select a chat to start messaging</p>
        <div className="text-6xl mb-6 opacity-20">💬</div>
      </div>
    </div>
  );
};

export default MessageEmptyState;
