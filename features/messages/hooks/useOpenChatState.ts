import { useCallback, useState } from "react";

export const useOpenChatState = () => {
  const [openChat, setOpenChat] = useState(false);

  const handleOpen = useCallback(() => {
    setOpenChat((prev) => !prev);
  }, [setOpenChat]);

  return {
    openChat,
    handleOpen,
  };
};
