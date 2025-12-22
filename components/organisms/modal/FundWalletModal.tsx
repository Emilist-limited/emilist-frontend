import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react";

import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import Label from "@/components/atoms/Label";
import FormSelect from "@/components/molecules/FormSelect";
import EmilistBankInfo from "@/features/wallet/components/EmilistBankInfo";
import PaymentProof from "@/features/wallet/components/PaymentProof";

import { FundInfoType, WalletType } from "@/features/wallet/types";
import { AuthContext } from "@/lib/context/AuthState";
import { FormInput } from "@/components/molecules/FormInput";

interface FundWalletModalProps {
  isOpen: boolean;
  onCancel: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFundWallet: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  setWalletInfo: Dispatch<SetStateAction<WalletType>>;
  paymentProof: File | null;
  fundInfo: FundInfoType;
  handleDelete: () => void;
  handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FundWalletModal = ({
  isOpen,
  onCancel,
  handleChange,
  handleChangeFile,
  handleDelete,
  handleFundWallet,
  loading,
  setWalletInfo,
  paymentProof,
  fundInfo,
}: FundWalletModalProps) => {
  const { currentUser } = useContext(AuthContext);

  const paymentMethod = [
    { label: "Card", value: "Card" },
    { label: "Bank transfer", value: "BankTransfer" },
  ];
  return (
    <CustomModal isOpen={isOpen} onClose={onCancel} width="sm">
      <form onSubmit={handleFundWallet} className="flex flex-col gap-6 w-full">
        <h2 className="sm:text-2xl text-lg font-bold">Fund Wallet</h2>
        <div className="w-full space-y-1">
          <Label htmlFor="walletId">Wallet to fund</Label>
          <div className="min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1">
            <select
              style={{ fontSize: "16px" }}
              className="bg-[#ececec] outline-none min-w-full w-full h-full max-w-full"
              name="walletId"
              id="walletId"
              onChange={(e) => {
                const selectedWalletId = e.target.value;
                const selectedWallet = currentUser?.wallets?.find(
                  (wallet: WalletType) => wallet?._id === selectedWalletId
                );
                setWalletInfo(selectedWallet);
              }}
            >
              <option defaultValue="">Select an wallet</option>

              {currentUser?.wallets?.map((wallet: any) => (
                <option key={wallet?._id} value={wallet?._id}>
                  {wallet?.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <FormSelect
          label="Payment method"
          id="paymentMethod"
          name="paymentMethod"
          value={fundInfo.paymentMethod}
          onChange={handleChange}
          options={paymentMethod}
          placeholder="Select payment method"
        />
        <FormInput
          name="amount"
          id="amount"
          label="Amount"
          value={fundInfo?.amount}
          onChange={handleChange}
        />
        {fundInfo?.paymentMethod === "BankTransfer" && (
          <>
            <EmilistBankInfo />
            <PaymentProof
              paymentProof={paymentProof}
              handleChangeFile={handleChangeFile}
              handleDelete={handleDelete}
            />
          </>
        )}
        <CustomButton type="submit" loading={loading}>
          Proceed
        </CustomButton>
      </form>
    </CustomModal>
  );
};

export default FundWalletModal;
