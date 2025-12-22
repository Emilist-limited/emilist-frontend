import { ShowToastFunction } from "@/types";

export function handleInputFieldError(showToast: ShowToastFunction) {
  return showToast({
    type: "error",
    message: "Please fill in all required fields before proceeding.",
    duration: 8000,
  });
}
