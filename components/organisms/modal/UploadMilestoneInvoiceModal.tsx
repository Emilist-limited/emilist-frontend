import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import UnEditableInput from "@/components/atoms/UnEditableInput";
import FormTextarea from "@/components/molecules/FormTextarea";

import { UploadMilestoneInvoiceModalProps } from "@/features/projects/types";
import { numberWithCommas } from "@/lib/helpers";
import { getCurrencySign } from "@/lib/helpers/getCurrencySign";

const UploadMilestoneInvoiceModal = ({
  isOpen,
  onCancel,
  currency,
  milestoneId,
  milestoneAmount,
  onUploadInvoice,
  invoiceInfo,
  handleChange,
  isSubmitting,
}: UploadMilestoneInvoiceModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onCancel} width="sm">
      <form
        className="w-full px-6 max-sm:px-1 py-3 max-sm:py-2 max-h-[80vh] overflow-y-auto"
        onSubmit={(e) => onUploadInvoice(e, milestoneId)}
      >
        <h2 className="text-lg font-bold pb-5">Milestone Invoice</h2>
        <div className="flex flex-col gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor="project_duration"> Amount</Label>
            <UnEditableInput
              title={`${currency && getCurrencySign(currency)}${
                milestoneAmount && numberWithCommas(milestoneAmount)
              }`}
            />
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="additionalAmount">
              Additional amount (optional)
            </Label>
            <p className="text-xs text-dark-green">
              Enter any incurred additional expenses.
            </p>
            <Input
              type="text"
              id="additionalAmount"
              name="additionalAmount"
              value={invoiceInfo?.additionalAmount}
              onChange={handleChange}
            />
          </div>
          <FormTextarea
            label="Note (optional)"
            id="note"
            name="note"
            rows={4}
            value={invoiceInfo?.note}
            onChange={handleChange}
          />
          <div className="flex gap-2 justify-center my-5">
            <CustomButton loading={isSubmitting} type="submit">
              Submit invoice
            </CustomButton>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default UploadMilestoneInvoiceModal;
