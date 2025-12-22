import { numberWithCommas } from "@/lib/helpers";

export const formatReviewCount = (count: number) => {
  if (!count && count !== 0) return "0 Reviews";
  return `${numberWithCommas(count)} Review${count === 1 ? "" : "s"}`;
};
