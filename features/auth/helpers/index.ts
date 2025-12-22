import { useMemo } from "react";

import { User } from "@/types";

export const useMemoizedUser = (user: User) => {
  return useMemo(() => user, [user?._id]);
};
