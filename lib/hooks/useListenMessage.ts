import { useContext, useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { ChatContext } from "../context/ChatState";

export const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useContext(ChatContext);

  const notificationSound = "/sound/notification.mp3";

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    // Return a proper cleanup function
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, setMessages]);
};
