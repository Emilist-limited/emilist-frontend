"use client";

import { useContext } from "react";

import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import FormSelect from "@/components/molecules/FormSelect";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";

import { paymentOptions } from "@/lib/constants/paymentOptions";
import { AuthContext } from "@/lib/context/AuthState";
import { currencyLabel } from "@/lib/constants";

interface OrderPaymentModalProps {
  isOpen: boolean;
  onCancel: () => void;
  loading: boolean;
  currency: string;
  setCurrency: (currency: string) => void;
  handleOrderPayment: (cardId: string) => Promise<void>;
  cartId: string;
  setPaymentMethod: (paymentMethod: string) => void;
  paymentMethod: string;
}

const OrderPaymentModal = ({
  onCancel,
  isOpen,
  loading,
  paymentMethod,
  setPaymentMethod,
  currency,
  setCurrency,
  handleOrderPayment,
  cartId,
}: OrderPaymentModalProps) => {
  const { currentUser } = useContext(AuthContext);

  const isAllFilled = () => {
    return (
      typeof currency === "string" &&
      currency.trim() !== "" &&
      typeof paymentMethod === "string" &&
      paymentMethod.trim() !== ""
    );
  };

  const isBoolean = isAllFilled();

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <form className="px-6 max-sm:px-3 pb-6 space-y-6">
        <h1 className="text-lg font-medium">Choose Payment & Currency</h1>
        <FormSelect
          name="paymentMethod"
          id="paymentMethod"
          label="Payment method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          options={paymentOptions}
        />
        <div className="w-full">
          <Label htmlFor="currency">Currency</Label>
          <div className="expert-reg-input-div">
            {paymentMethod === "Wallet" ? (
              <select
                className="min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1"
                style={{ fontSize: "16px" }}
                onChange={(e) => {
                  const selectedWalletId = e.target.value;
                  const selectedWallet = currentUser?.wallets?.find(
                    (wallet: any) => wallet?._id === selectedWalletId
                  );
                  setCurrency(selectedWallet?.currency);
                }}
              >
                <option defaultValue="">Select wallet</option>

                {currentUser?.wallets?.map((wallet: any) => (
                  <option key={wallet?._id} value={wallet?._id}>
                    {wallet?.currency}
                  </option>
                ))}
              </select>
            ) : (
              <Select
                id="currency"
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={currencyLabel}
              />
            )}
          </div>
        </div>
        <CustomButton
          onClick={() => handleOrderPayment(cartId)}
          isAllInputFilled={isBoolean}
          loading={loading}
        >
          Proceed
        </CustomButton>
      </form>
    </CustomModal>
  );
};

export default OrderPaymentModal;
