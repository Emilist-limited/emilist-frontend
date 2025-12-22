import Image from "next/image";

import { CartTableProps } from "../types";
import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

import CartQuantityControl from "./CartQuantityControl";
import RemoveCartItem from "./RemoveCartItem";
import CartPricing from "./CartPricing";

const MobileCartTable = ({
  cartItems,
  vat,
  decreaseCartQuantity,
  deleteMaterialFromCart,
  incrementCartQuantity,
}: CartTableProps) => {
  return (
    <div className="md:hidden block">
      <div className="flex flex-col gap-4 border-t-1 border-gray-500">
        {cartItems?.products?.map((cart: any) => (
          <div className="border-b-1 border-gray-500 py-4" key={cart?._id}>
            <div className="flex gap-2">
              <Image
                src={
                  cart?.productId?.images[0] &&
                  cart?.productId?.images[0]?.imageUrl
                }
                width={200}
                height={200}
                alt="product-image"
                className="w-28 h-28 rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="font-semibold max-sm:text-sm">
                  {cart?.productId?.name && Capitalize(cart?.productId?.name)}
                </p>
                <p className="font-medium max-sm:text-sm">
                  {cart?.productId?.currency &&
                    getCurrencySign(cart?.productId?.currency)}{" "}
                  {cart?.price &&
                    numberWithCommas(cart?.price * cart?.quantity)}
                </p>
                <div className="flex-c gap-3 max-sm:text-sm">
                  <CartQuantityControl
                    type="negative"
                    onClick={() => decreaseCartQuantity(cart?.productId?._id)}
                  />
                  <span className="block">
                    {" "}
                    {cart?.quantity && numberWithCommas(cart?.quantity)}
                  </span>
                  <CartQuantityControl
                    type="positive"
                    onClick={() => incrementCartQuantity(cart?.productId?._id)}
                  />
                </div>
              </div>
            </div>
            <RemoveCartItem
              onClick={() => deleteMaterialFromCart(cart?.productId?._id)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <CartPricing title="Delivery" currency="₦" price={0.0} />
        <CartPricing
          title="Vat"
          currency={cartItems?.products[0].productId?.currency || "₦"}
          price={vat || 0.0}
        />
        <CartPricing
          title="Total"
          currency={cartItems?.products[0].productId?.currency || "₦"}
          price={cartItems?.totalAmount || 0.0}
        />
      </div>
    </div>
  );
};

export default MobileCartTable;
