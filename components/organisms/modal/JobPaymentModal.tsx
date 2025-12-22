import { useContext } from "react";

import CustomModal from "@/components/atoms/CustomModal";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import UnEditableInput from "@/components/atoms/UnEditableInput";
import FormSelect from "@/components/molecules/FormSelect";
import FormTextarea from "@/components/molecules/FormTextarea";
import AdditionalAmountState from "@/components/molecules/AdditionalAmountState";
import CustomButton from "@/components/atoms/CustomButton";

import { JobPaymentModalProps } from "@/features/jobs/types";
import { currencyLabel } from "@/lib/constants";
import { paymentOptions } from "@/lib/constants/paymentOptions";
import { AuthContext } from "@/lib/context/AuthState";
import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

const JobPaymentModal = ({
  isOpen,
  onCancel,
  paymentDetails,
  handlePaymentChange,
  confirmPayment,
  loadingPayment,
  milestoneId,
  currency,
  setCurrency,
  jobId,
  amount,
  jobCurrency,
  additionalAmount,
  note,
  isAdditionalAmount,
  setIsAdditionalAmount,
}: JobPaymentModalProps) => {
  const { currentUser } = useContext(AuthContext);

  const isAllFilled = () => {
    return (
      typeof currency === "string" &&
      currency.trim() !== "" &&
      typeof paymentDetails.paymentMethod === "string" &&
      paymentDetails.paymentMethod.trim() !== ""
    );
  };

  const isBoolean = isAllFilled();

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <form
        className="space-y-6 px-6 max-sm:px-3 pb-6"
        onSubmit={(e) => confirmPayment(e, milestoneId, jobId)}
      >
        <h2 className="sm:text-lg font-medium">Milestone Payment</h2>
        <div className="w-full space-y-1">
          <Label htmlFor="amount_paid" className="text-[#5e625f]">
            Amount paid
          </Label>
          <UnEditableInput
            title={`${jobCurrency && getCurrencySign(jobCurrency)}${
              amount && numberWithCommas(amount)
            }`}
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="additional_amount" className="text-[#5e625f]">
            Additional amount
          </Label>
          <UnEditableInput
            title={`${jobCurrency && getCurrencySign(jobCurrency)}${
              additionalAmount && numberWithCommas(additionalAmount)
            }`}
          />
        </div>
        {note && (
          <div className="w-full space-y-1">
            <Label htmlFor="note" className="text-[#5e625f]">
              Artisan note
            </Label>
            <UnEditableInput title={note} className="min-h-10" />
          </div>
        )}
        <FormSelect
          name="paymentMethod"
          id="paymentMethod"
          label="Payment method"
          value={paymentDetails.paymentMethod}
          onChange={handlePaymentChange}
          options={paymentOptions}
        />
        <div className="w-full">
          <Label htmlFor="currency">Currency</Label>
          <div className="expert-reg-input-div">
            {paymentDetails?.paymentMethod === "Wallet" ? (
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
        <FormTextarea
          label="Note (optional)"
          id="note"
          name="note"
          rows={3}
          value={paymentDetails.note || ""}
          onChange={handlePaymentChange}
        />
        {additionalAmount && (
          <div>
            {isAdditionalAmount ? (
              <AdditionalAmountState
                onClick={() => setIsAdditionalAmount(false)}
                title="Reject additional payment"
                imgUrl="/icons/tick-square.svg"
                alt="uncheck icon"
              />
            ) : (
              <AdditionalAmountState
                onClick={() => setIsAdditionalAmount(true)}
                title="Accept additional payment"
                imgUrl="/icons/checkbox.svg"
                alt="check icon"
              />
            )}
          </div>
        )}
        <CustomButton
          type="submit"
          isAllInputFilled={isBoolean}
          loading={loadingPayment}
        >
          Proceed
        </CustomButton>
      </form>
    </CustomModal>
  );
};

export default JobPaymentModal;
