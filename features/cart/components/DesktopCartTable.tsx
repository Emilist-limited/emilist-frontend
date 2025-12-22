import Image from "next/image";

import { CartTableProps } from "../types";
import { Capitalize, numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

import CartQuantityControl from "./CartQuantityControl";
import RemoveCartItem from "./RemoveCartItem";
import CartPricing from "./CartPricing";

const DesktopCartTable = ({
  vat,
  cartItems,
  decreaseCartQuantity,
  deleteMaterialFromCart,
  incrementCartQuantity,
}: CartTableProps) => {
  return (
    <div className="md:block hidden">
      <div className="flex-c-b border-b-1 border-gray-500">
        <p className="flex-1 font-medium text-gray-400 max-sm:text-sm max-md:hidden">
          Product Details
        </p>
        <div className="flex-1 flex-c-b gap-4 max-md:hidden">
          <p className=" flex-1 text-center font-medium text-gray-400 max-sm:text-sm ">
            Quantity
          </p>
          <p className=" flex-1 text-center font-medium text-gray-400 max-sm:text-sm">
            Price
          </p>
          <p className=" flex-1 text-center font-medium text-gray-400 max-sm:text-sm ">
            Total
          </p>
        </div>
      </div>
      <div
        className="flex flex-col gap-4
border-b-1 border-gray-500 py-6"
      >
        {cartItems?.products?.map((cart: any) => (
          <div className="flex items-start justify-between" key={cart?._id}>
            <div className="flex-1 flex gap-2">
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
              <div className="flex flex-col justify-between">
                <p className="font-semibold max-sm:text-sm">
                  {cart?.productId?.name && Capitalize(cart?.productId?.name)}
                </p>
                <RemoveCartItem
                  onClick={() => deleteMaterialFromCart(cart?.productId?._id)}
                />
              </div>
            </div>
            <div className="flex-1 flex-c-b gap-4 w-full ">
              <div className=" flex-1 flex-c justify-center sm:gap-6 gap-3 max-sm:text-sm">
                <CartQuantityControl
                  type="negative"
                  onClick={() => decreaseCartQuantity(cart?.productId?._id)}
                />
                <span className="block">
                  {cart?.quantity && numberWithCommas(cart?.quantity)}
                </span>
                <CartQuantityControl
                  type="positive"
                  onClick={() => incrementCartQuantity(cart?.productId?._id)}
                />
              </div>
              <p className="flex-1 text-center font-medium max-sm:text-sm">
                {cart?.productId?.currency &&
                  getCurrencySign(cart?.productId?.currency)}
                {cart?.price && numberWithCommas(cart?.price)}
              </p>
              <p className="flex-1 text-center font-medium max-sm:text-sm ">
                {cart?.productId?.currency &&
                  getCurrencySign(cart?.productId?.currency)}
                {cart?.price && numberWithCommas(cart?.price * cart?.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-end py-6 gap-4">
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

export default DesktopCartTable;
