import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { CartContext } from "@/lib/context/CartState";
import { ROUTES } from "@/lib/constants/routes";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { useToast } from "@/lib/hooks/useToast";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useAddMaterialToCart = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const { refreshCart } = useContext(CartContext);

  const [cartLoading, setCartLoading] = useState(false);

  const addMaterialToCart = async (productId: string) => {
    setCartLoading(true);
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
    }
    try {
      const cartPayload = {
        quantity: 1,
        productId,
      };
      await axiosInstance.post(`/cart/add-to-cart`, cartPayload);

      showToast({
        message: "Material added to cart",
        type: "success",
      });
      refreshCart();
    } catch (error: any) {
      console.log("error on add to cart", error);
      promiseErrorFunction(error, showToast);
    } finally {
      setCartLoading(false);
    }
  };

  return {
    addMaterialToCart,
    cartLoading,
  };
};
