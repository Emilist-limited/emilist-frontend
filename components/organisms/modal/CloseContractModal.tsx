import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import Label from "@/components/atoms/Label";
import StarIcon from "@/components/atoms/StarIcon";
import UnEditableInput from "@/components/atoms/UnEditableInput";
import FormSelect from "@/components/molecules/FormSelect";
import FormTextarea from "@/components/molecules/FormTextarea";

import { recommend } from "@/features/jobs/constants";
import { ContractType } from "@/features/jobs/hooks/useCloseContractState";

interface CloseContractModalProps {
  isOpen: boolean;
  onCancel: () => void;
  jobId: string;
  setRateServiceRendered: React.Dispatch<React.SetStateAction<number>>;
  setRateServiceProvider: React.Dispatch<React.SetStateAction<number>>;
  rateServiceProvider: number;
  rateServiceRendered: number;
  contractDetails: ContractType;
  handleContractChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLTextAreaElement
  >;
  closeContract: (e: React.FormEvent<HTMLFormElement>) => void;
  loadingContract: boolean;
}

const CloseContractModal = ({
  isOpen,
  onCancel,
  rateServiceRendered,
  rateServiceProvider,
  setRateServiceProvider,
  setRateServiceRendered,
  contractDetails,
  handleContractChange,
  closeContract,
  jobId,
  loadingContract,
}: CloseContractModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <form onSubmit={closeContract} className="sm:px-6 px-3 pb-6 space-y-6">
        <div className="w-full space-y-1">
          <Label htmlFor="jobId">Job ID</Label>
          <UnEditableInput title={jobId && jobId} />
        </div>
        <FormSelect
          name="recommendVendor"
          id="recommendVendor"
          label="Will you recommend this vendor"
          value={contractDetails.recommendVendor}
          onChange={handleContractChange}
          options={recommend}
        />
        <div className="space-y-1 w-full">
          <Label htmlFor="rateServiceProvider">
            Rate service provider communication
          </Label>
          <div className="w-full flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => setRateServiceProvider(index + 1)}
              >
                <StarIcon
                  filled={index < rateServiceProvider}
                  className="w-5 h-5"
                />
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="rateServiceRendered">Rate service rendered</Label>
          <div className="w-full flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => setRateServiceRendered(index + 1)}
              >
                <StarIcon
                  filled={index < rateServiceRendered}
                  className="w-5 h-5"
                />
              </span>
            ))}
          </div>
        </div>
        <FormTextarea
          id="review"
          name="review"
          rows={5}
          label="Leave a Review"
          value={contractDetails.review}
          onChange={handleContractChange}
        />
        <CustomButton loading={loadingContract} type="submit">
          Proceed
        </CustomButton>
      </form>
    </CustomModal>
  );
};

export default CloseContractModal;
