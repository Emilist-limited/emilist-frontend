"use client";

import { useContext } from "react";

import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import UnEditableInput from "@/components/atoms/UnEditableInput";
import FormSelect from "@/components/molecules/FormSelect";

import { currencyLabel } from "@/lib/constants";
import { paymentOptions } from "@/lib/constants/paymentOptions";
import { AuthContext } from "@/lib/context/AuthState";
import { numberWithCommas } from "@/lib/helpers";
import { SubscriptionPaymentModalProps } from "@/features/subscription/type";

const SubscriptionPaymentModal = ({
  isOpen,
  onCancel,
  amount,
  currency,
  setPaymentMethod,
  setCurrency,
  paymentMethod,
  handleSubNewPlan,
  planId,
  loading,
}: SubscriptionPaymentModalProps) => {
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
      <form onSubmit={handleSubNewPlan} className="pb-6 space-y-6">
        <h1 className="text-lg font-medium">Subscription Payment</h1>
        <div className="w-full space-y-1">
          <Label htmlFor="PlanAmount">Plan amount</Label>
          <UnEditableInput title={`₦${amount && numberWithCommas(amount)}`} />
        </div>
        <FormSelect
          name="paymentMethod"
          id="paymentMethod"
          label="Payment method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          placeholder="Select payment method"
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
          type="submit"
          isAllInputFilled={isBoolean}
          loading={loading}
        >
          Proceed
        </CustomButton>
      </form>
    </CustomModal>
  );
};

export default SubscriptionPaymentModal;
