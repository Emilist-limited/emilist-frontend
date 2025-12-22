"use client";

import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import Label from "@/components/atoms/Label";
import FormSelect from "@/components/molecules/FormSelect";

import { currencyLabel } from "@/lib/constants";

interface AddWalletModalProps {
  isOpen: boolean;
  onCancel: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
  setIsDefault: (isDefault: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}

const AddWalletModal = ({
  isOpen,
  onCancel,
  currency,
  setCurrency,
  setIsDefault,
  handleSubmit,
  isLoading,
}: AddWalletModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onCancel} width="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <h2 className="sm:text-2xl text-lg font-bold">Add New Wallet</h2>
        <FormSelect
          label="Currency"
          id="currency"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          options={currencyLabel}
          placeholder="Select a currency"
        />
        <div className="w-full space-y-1">
          <Label htmlFor="isDefault">Set wallet to default?</Label>
          <div className="min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1">
            <select
              style={{ fontSize: "16px" }}
              className="bg-[#ececec] outline-none min-w-full w-full h-full max-w-full"
              name="isDefault"
              id="isDefault"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option onClick={() => setIsDefault(true)} className="capitalize">
                Yes
              </option>
              <option
                onClick={() => setIsDefault(false)}
                className="capitalize"
              >
                No
              </option>
            </select>
          </div>
        </div>
        <CustomButton type="submit" loading={isLoading}>
          Proceed
        </CustomButton>
      </form>
    </CustomModal>
  );
};

export default AddWalletModal;
