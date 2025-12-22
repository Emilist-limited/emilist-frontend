import { format, parseISO } from "date-fns";

export const formatMessageDate = (createdAt: string): string => {
  try {
    const date = parseISO(createdAt);
    return format(date, "HH:mm");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
