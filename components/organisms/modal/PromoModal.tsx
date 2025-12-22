import { ChangeEvent, Dispatch, SetStateAction } from "react";

import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import CircleSelect from "@/components/molecules/CircleSelect";
import FormDate from "@/components/molecules/FormDate";

import { FormInput } from "@/components/molecules/FormInput";
import { useToast } from "@/lib/hooks/useToast";
import { formatDate, validateDates } from "@/lib/helpers/dates";

interface PromoModalProps {
  onCancel: () => void;
  isOpen: boolean;
  expectedClicks: string;
  handleClickChange: (e: ChangeEvent<HTMLInputElement>) => void;
  target: string;
  setTarget: Dispatch<SetStateAction<string>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  isLoad: boolean;
  handlePromote: (type: string, id: string) => Promise<void>;
  id: string;
  type: string;
}

const PromoModal = ({
  onCancel,
  isOpen,
  expectedClicks,
  handleClickChange,
  target,
  setTarget,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isLoad,
  handlePromote,
  id,
  type,
}: PromoModalProps) => {
  const { showToast } = useToast();
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setHours(maxDate.getDay() + 168);

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <h2 className="sm:text-xl font-semibold w-full border-b-1 border-[#B8B9B8] text-lg pb-1">
        Promote your post
      </h2>
      <div className="py-6  border-b-1 border-[#B8B9B8]">
        <h2 className="sm:text-lg pb-1 font-bold">Target</h2>
        <div className="flex flex-col gap-4 mt-6 max-sm:mt-3">
          <CircleSelect
            onClick={() => setTarget("anybody")}
            title="Anybody"
            option={target}
            match="anybody"
          />
          <CircleSelect
            onClick={() => setTarget("selected")}
            title="Customers hiring for the service i’m posting for."
            option={target}
            match="selected"
          />
        </div>
      </div>
      <div className="py-6  border-b-[1px] border-[#B8B9B8]">
        <h2 className="sm:text-lg pb-1 font-bold">Promotion duration</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full col-span-1 max-md:col-span-2">
            <FormDate
              label="Start Date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => {
                const selectedDate = e.target.value;
                if (endDate) {
                  validateDates(selectedDate, endDate, showToast);
                }
                setStartDate(e.target.value);
              }}
              min={formatDate(today)}
            />
          </div>
          <div className="w-full col-span-1 max-md:col-span-2">
            <FormDate
              label="End Date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => {
                const selectedDate = e.target.value;
                if (startDate) {
                  validateDates(startDate, selectedDate, showToast);
                }
                setEndDate(e.target.value);
              }}
              min={formatDate(maxDate)}
            />
          </div>
        </div>
      </div>
      <div className="py-6 space-y-2">
        <h2 className="sm:text-lg pb-1 font-bold">Clicks</h2>
        <FormInput
          label="Input number of clicks"
          id="expectedClicks"
          name="expectedClicks"
          type="text"
          value={expectedClicks}
          onChange={handleClickChange}
        />

        <div className="w-full flex items-center justify-between ">
          <p className="text-[#5e625f] font-bold max-sm:text-sm">
            Approx 2000 clicks
          </p>
          <p className="text-[#5e625f] font-bold max-sm:text-sm">
            NB: 1 Click cost #1
          </p>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <CustomButton loading={isLoad} onClick={() => handlePromote(type, id)}>
          Make Payment
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default PromoModal;
