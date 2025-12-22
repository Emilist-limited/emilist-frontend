import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import Tooltip from "./Tooltip";

import { AuthContext } from "@/lib/context/AuthState";
import { CartContext } from "@/lib/context/CartState";
import { ROUTES } from "@/lib/constants/routes";

const CartIcon = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { totalCartQuantity } = useContext(CartContext);

  const handleShowCartItem = () => {
    if (!currentUser) {
      router.push(ROUTES?.LOGIN);
      return;
    }
    router.push(ROUTES?.CART);
  };

  return (
    <div className="w-fit p-2 hover:bg-nuetral-light duration-300 rounded-full group">
      <Tooltip content="Cart items" position="bottom">
        <button type="button" onClick={handleShowCartItem} className="relative">
          <Image
            src="/icons/shopping-cart.svg"
            alt="menu"
            width={24}
            height={24}
            className="object-contain w-6 h-6"
          />
          {totalCartQuantity > 0 && (
            <span className="absolute -top-3 -right-2 px-2 py-1 bg-light-green rounded-full text-xs">
              {totalCartQuantity}
            </span>
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default CartIcon;
