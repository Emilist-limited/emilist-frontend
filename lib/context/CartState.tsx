"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { getCart } from "@/features/cart/api/getCart";
import { readAuthCookie } from "../helpers/cookieHelper";
import { useToast } from "../hooks/useToast";

export const CartContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const CartState = ({ children }: Props) => {
  const token = readAuthCookie("sessionId");
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const cart: any = await getCart();
      const totalQuantity = cart?.products.reduce(
        (sum: number, product: any) => sum + product.quantity,
        0
      );
      setTotalCartQuantity(totalQuantity);
      setCartItems(cart);
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : "Error fetching cart",
        type: "error",
        duration: 5000,
        autoClose: true,
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [fetchCart]);

  const refreshCart = useCallback(async () => {
    if (token) {
      await fetchCart();
    }
  }, [fetchCart]);

  const value = {
    cartItems,
    setCartItems,
    totalCartQuantity,
    refreshCart,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartState;
