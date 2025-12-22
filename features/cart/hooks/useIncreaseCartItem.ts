import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { AuthContext } from "@/lib/context/AuthState";
import { CartContext } from "@/lib/context/CartState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";

export const useIncreaseCartItem = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const { refreshCart } = useContext(CartContext);

  const [incrementLoading, setIncrementLoading] = useState(false);

  const incrementCartQuantity = async (productId: string) => {
    setIncrementLoading(true);
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
    }
    try {
      await axiosInstance.patch(`/cart/increase-quantity/${productId}`);
      showToast({
        message: "Quantity updated",
        type: "success",
      });
      if (refreshCart) {
        refreshCart();
      }
    } catch (error: any) {
      console.log("error on increasing cart item", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setIncrementLoading(false);
    }
  };

  return {
    incrementLoading,
    incrementCartQuantity,
  };
};
