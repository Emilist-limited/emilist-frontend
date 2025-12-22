import { ShowToastFunction } from "@/types";
import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  isToday,
  isYesterday,
} from "date-fns";

export const formatStartDate = (date: Date): string => {
  return format(date, "dd/MM/yyyy");
};

export const formatDueDate = (date: any): string => {
  const dueDate = date;
  const now = new Date();

  const hoursDiff = differenceInHours(dueDate, now);
  const daysDiff = differenceInDays(dueDate, now);
  const monthsDiff = differenceInMonths(dueDate, now);
  const weeksDiff = differenceInWeeks(dueDate, now);

  if (hoursDiff < 24) {
    return `${hoursDiff} ${hoursDiff === 1 ? "hr" : "hrs"}`;
  } else if (daysDiff <= 7) {
    return `${daysDiff} ${daysDiff === 1 ? "day" : "days"}`;
  } else if (weeksDiff <= 4) {
    return `${weeksDiff} ${weeksDiff === 1 ? "week" : "weeks"}`;
  } else return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"}`;
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const validateDates = (
  start: string,
  end: string,
  showToast: ShowToastFunction
) => {
  if (start && end) {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (endDateObj < startDateObj) {
      showToast({
        message: "End date cannot be before start date!",
        type: "error",
        duration: 8000,
      });
      return;
    }
  }
};

export const formatOverDueDate = (date: any): string => {
  const dueDate = date;
  const now = new Date();

  const hoursDiff = differenceInHours(now, dueDate);
  const daysDiff = differenceInDays(now, dueDate);
  const monthsDiff = differenceInMonths(now, dueDate);
  const weeksDiff = differenceInWeeks(now, dueDate);

  if (hoursDiff < 24) {
    return `${hoursDiff} ${hoursDiff === 1 ? "hr" : "hrs"}`;
  } else if (daysDiff <= 7) {
    return `${daysDiff} ${daysDiff === 1 ? "day" : "days"}`;
  } else if (weeksDiff <= 4) {
    return `${weeksDiff} ${weeksDiff === 1 ? "week" : "weeks"}`;
  } else return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"}`;
};

export const formatDateForInput = (dateString: string | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
