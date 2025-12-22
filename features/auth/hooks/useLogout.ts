import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/lib/context/AuthState";
import { logout } from "../api/logout";
import { clearCookie } from "@/lib/helpers/cookieHelper";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";

export const useLogout = () => {
  const { showToast } = useToast();

  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const logoutUser = async () => {
    try {
      await logout();
      router.push(ROUTES?.HOME);
      clearCookie("sessionId");
      setCurrentUser(null);
      showToast({
        message: "Logout successful!",
        type: "success",
        duration: 6000,
        autoClose: true,
      });
    } catch (error) {
      console.log("an error occuried", error);
    }
  };

  return { logoutUser };
};
