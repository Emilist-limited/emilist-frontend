"use client";

import { useContext } from "react";
import dynamic from "next/dynamic";

import { useCheckoutCart } from "../hooks/useCheckoutCart";
import { CartContext } from "@/lib/context/CartState";
import { useGetVat } from "../hooks/useGetVat";
import { useIncreaseCartItem } from "../hooks/useIncreaseCartItem";
import { useDecreaseCartItem } from "../hooks/useDecreaseCartItem";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import MobileCartTable from "./MobileCartTable";
import DesktopCartTable from "./DesktopCartTable";
import CustomButton from "@/components/atoms/CustomButton";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

const OrderPaymentModal = dynamic(
  () => import("@/components/organisms/modal/OrderPaymentModal")
);

const CartWrapper = () => {
  const { cartItems, totalCartQuantity } = useContext(CartContext);

  const { vat, load } = useGetVat();
  const { incrementLoading, incrementCartQuantity } = useIncreaseCartItem();
  const { deleteMaterialFromCart, deleteCartLoading } = useDeleteCartItem();
  const { decreaseCartQuantity, decreaseLoading } = useDecreaseCartItem();
  const {
    isLoading,
    handleCheckout,
    open,
    onCancel,
    handleOrderPayment,
    currency,
    setCurrency,
    loading,
    paymentMethod,
    setPaymentMethod,
  } = useCheckoutCart();

  const isSubmitting =
    incrementLoading || decreaseLoading || deleteCartLoading || load;

  return (
    <div className="padding-ctn">
      {isSubmitting && <WhiteBgLoader />}
      <h1 className="text-2xl font-bold max-sm:text-lg py-6">Cart</h1>
      <div className="space-y-4">
        {totalCartQuantity < 1 || !totalCartQuantity ? (
          <NoMoreMessage message="No item in your cart." />
        ) : (
          <>
            <OrderPaymentModal
              isOpen={open}
              onCancel={onCancel}
              loading={loading}
              paymentMethod={paymentMethod}
              handleOrderPayment={handleOrderPayment}
              cartId={cartItems?._id}
              setPaymentMethod={setPaymentMethod}
              currency={currency}
              setCurrency={setCurrency}
            />
            <MobileCartTable
              cartItems={cartItems}
              vat={vat}
              decreaseCartQuantity={decreaseCartQuantity}
              deleteMaterialFromCart={deleteMaterialFromCart}
              incrementCartQuantity={incrementCartQuantity}
            />
            <DesktopCartTable
              cartItems={cartItems}
              vat={vat}
              decreaseCartQuantity={decreaseCartQuantity}
              deleteMaterialFromCart={deleteMaterialFromCart}
              incrementCartQuantity={incrementCartQuantity}
            />
            <div className="flex justify-end">
              <CustomButton loading={isLoading} onClick={handleCheckout}>
                Checkout
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartWrapper;
