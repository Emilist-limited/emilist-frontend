import { useEffect, useState } from "react";

import { fetchNotifications } from "../api/fetchNotifications";
import { groupNotificationsByDate } from "../helpers/groupNotificationsByDate";
import { Notification } from "@/types/notification";

export const useGetNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async () => {
    setIsLoading(true);
    const fetchedNotifications = await fetchNotifications();
    setNotifications(fetchedNotifications);
    setIsLoading(false);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return {
    isLoading,
    notifications,
    groupNotificationsByDate: () => groupNotificationsByDate(notifications),
    getNotifications,
  };
};
