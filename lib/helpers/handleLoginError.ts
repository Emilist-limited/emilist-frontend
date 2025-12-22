import { ShowToastFunction } from "@/types";

export function handleLoginError(showToast: ShowToastFunction) {
  return showToast({
    message: "You need to be logged in to perform this action.",
    type: "error",
    duration: 8000,
  });
}
