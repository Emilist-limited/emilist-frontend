import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import UnEditableInput from "@/components/atoms/UnEditableInput";
import FormTextarea from "@/components/molecules/FormTextarea";

import { durationOptions } from "@/lib/constants";
import { numberWithCommas } from "@/lib/helpers";
import { MilestonePer } from "../../types";
import { FormInput } from "@/components/molecules/FormInput";

interface MilestoneFormProps {
  index: number;
  milestone: MilestonePer;
  updateMilestonesData: (
    value: string | number,
    index: number,
    field: "duration" | "durationType" | "details" | "amount" | "percentage"
  ) => void;
}

const MilestoneForm = ({
  index,
  milestone,
  updateMilestonesData,
}: MilestoneFormProps) => {
  return (
    <div className="w-full space-y-4">
      <h2 className="sm:text-lg font-semibold py-3">Milestone {index + 1}</h2>
      <div className="space-y-1">
        <Label htmlFor="duration">Milestone duration</Label>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="col-span-2 w-full">
            <Input
              type="text"
              name="duration"
              id="duration"
              value={milestone.duration}
              onChange={(e) =>
                updateMilestonesData(e.target.value, index, "duration")
              }
            />
          </div>
          <div className="col-span-1 w-full">
            <Select
              id="durationType"
              name="durationType"
              value={milestone.durationType}
              onChange={(e) =>
                updateMilestonesData(e.target.value, index, "durationType")
              }
              options={durationOptions}
            />
          </div>
        </div>
        <p className="text-xs text-dark-green">
          Note: 7days equal 1week, 30days equal 1month and 4weeks equal 1month.
        </p>
      </div>

      <FormTextarea
        label="Details of what's to be achieved"
        id="details"
        name="details"
        placeholder="Describe the details of the milestone"
        rows={4}
        value={milestone.details}
        onChange={(e) => updateMilestonesData(e.target.value, index, "details")}
      />

      <div className="w-full space-y-1">
        <FormInput
          type="text"
          label="Percentage for Milestone"
          id="percentage"
          name="percentage"
          value={milestone.percentage}
          onChange={(e) =>
            updateMilestonesData(e.target.value, index, "percentage")
          }
        />
        <p className="text-xs text-dark-green">
          Enter the percentage of the total amount for this milestone. Total
          cannot exceed 100%.
        </p>
      </div>
      <div className="w-full">
        <Label htmlFor="amount">Amount</Label>
        <UnEditableInput
          title={`${milestone.amount ? numberWithCommas(milestone.amount) : 0}`}
        />
      </div>
    </div>
  );
};

export default MilestoneForm;
