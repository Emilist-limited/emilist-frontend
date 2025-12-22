import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/api/axiosInstance";
import { AuthContext } from "@/lib/context/AuthState";
import { CartContext } from "@/lib/context/CartState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useToast } from "@/lib/hooks/useToast";
import { ROUTES } from "@/lib/constants/routes";

export const useDeleteCartItem = () => {
  const router = useRouter();

  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const { refreshCart } = useContext(CartContext);
  const [deleteCartLoading, setDeleteCartLoading] = useState(false);

  const deleteMaterialFromCart = async (productId: string) => {
    setDeleteCartLoading(true);
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
    }
    try {
      await axiosInstance.patch(`/cart/remove-from-cart/${productId}`);
      showToast({
        message: "Material removed from cart!",
        type: "success",
      });
      if (refreshCart) {
        refreshCart();
      }
    } catch (error: any) {
      console.log("error removing material from cart", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setDeleteCartLoading(false);
    }
  };

  return {
    deleteMaterialFromCart,
    deleteCartLoading,
  };
};
