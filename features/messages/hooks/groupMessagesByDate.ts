import { format, isToday, isYesterday, parseISO } from "date-fns";

export const groupMessagesByDate = (messages: any) => {
  const grouped: { [key: string]: any } = {};

  messages.forEach((message: any) => {
    const messageDate = parseISO(message?.createdAt);

    let key: string;
    if (isToday(messageDate)) {
      key = "Today";
    } else if (isYesterday(messageDate)) {
      key = "Yesterday";
    } else {
      key = format(messageDate, "dd/MM/yyyy");
    }

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(message);
  });

  return grouped;
};
