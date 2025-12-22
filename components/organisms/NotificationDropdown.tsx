"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";

import { useGetNotification } from "@/lib/hooks/useGetNotification";
import { useClearNotification } from "@/lib/hooks/useClearNotification";

import NotificationGroup from "../molecules/NotificationGroup";

const NotificationDropdown = () => {
  const { clearNotification } = useClearNotification();
  const {
    isLoading,
    notifications,
    groupNotificationsByDate,
    getNotifications,
  } = useGetNotification();

  const groupedNotifications = groupNotificationsByDate();

  const handleClearNotification = (id: string) => {
    clearNotification(id, () => {
      getNotifications();
    });
  };

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute max-w-[400px] w-[400px] min-w-[300px] bg-white -right-full max-h-[85svh] top-full overflow-y-hidden shadow border-1"
    >
      <h2 className="text-xl font-bold max-sm:text-lg px-6 max-md:px-3 py-6">
        Notification
      </h2>
      <ScrollArea className="max-h-[74svh] overflow-y-auto pb-2">
        {isLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : notifications?.length < 1 ? (
          <p className="py-8 px-6 text-gray-400 text-sm">
            You don&apos;t have any new notification
          </p>
        ) : (
          Object.keys(groupedNotifications).map((dateKey) => (
            <NotificationGroup
              key={dateKey}
              dateKey={dateKey}
              notifications={groupedNotifications[dateKey]}
              onClear={handleClearNotification}
            />
          ))
        )}
      </ScrollArea>
    </motion.div>
  );
};

export default NotificationDropdown;
