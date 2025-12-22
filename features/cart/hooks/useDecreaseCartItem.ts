import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { AuthContext } from "@/lib/context/AuthState";
import { CartContext } from "@/lib/context/CartState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";

export const useDecreaseCartItem = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const { refreshCart } = useContext(CartContext);

  const [decreaseLoading, setDecreaseLoading] = useState(false);

  const decreaseCartQuantity = async (productId: string) => {
    setDecreaseLoading(true);
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
    }
    try {
      await axiosInstance.patch(`/cart/reduce-quantity/${productId}`);
      showToast({
        message: "Quantity updated",
        type: "success",
      });
      if (refreshCart) {
        refreshCart();
      }
    } catch (error) {
      console.log("error on descreasing cart item", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setDecreaseLoading(false);
    }
  };

  return {
    decreaseCartQuantity,
    decreaseLoading,
  };
};
