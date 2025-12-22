import { Notification } from "@/types/notification";
import {
  parseISO,
  isToday,
  isYesterday,
  isThisWeek,
  differenceInWeeks,
  differenceInMonths,
  format,
} from "date-fns";

export const groupNotificationsByDate = (notifications: Notification[]) => {
  const grouped: { [key: string]: Notification[] } = {};

  notifications.forEach((notification) => {
    const notificationDate = parseISO(notification.createdAt);
    let key: string;

    if (isToday(notificationDate)) {
      key = "Today";
    } else if (isYesterday(notificationDate)) {
      key = "Yesterday";
    } else if (isThisWeek(notificationDate)) {
      key = "This Week";
    } else {
      const weeksAgo = differenceInWeeks(new Date(), notificationDate);
      if (weeksAgo <= 4) {
        key = `${weeksAgo} ${weeksAgo === 1 ? "Week Ago" : "Weeks Ago"}`;
      } else {
        const monthsAgo = differenceInMonths(new Date(), notificationDate);
        if (monthsAgo <= 12) {
          key = `${monthsAgo} ${monthsAgo === 1 ? "Month Ago" : "Months Ago"}`;
        } else {
          key = format(notificationDate, "MMMM yyyy");
        }
      }
    }

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(notification);
  });

  return grouped;
};
