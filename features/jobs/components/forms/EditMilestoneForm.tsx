import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormTextarea from "@/components/molecules/FormTextarea";
import Label from "@/components/atoms/Label";
import FormSelect from "@/components/molecules/FormSelect";
import UnEditableInput from "@/components/atoms/UnEditableInput";

import { Jobs, Milestone, TimeFrameType } from "../../types";
import { durationOptions, milestoneNumber } from "@/lib/constants";
import { FormInput } from "@/components/molecules/FormInput";
import { numberWithCommas } from "@/lib/helpers";

interface EditMilestoneFormProps {
  jobInfo: Jobs;
  handleMilestoneNumberChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleMilestoneInputChange: (
    index: number,
    parentField: keyof Milestone,
    childField: keyof TimeFrameType,
    value: any
  ) => void;
  handleMilestoneChange: (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handlePercentageChange: (index: number, newPercentage: number) => void;
  percentage: number[];
  handleBlur: () => void;
}

const EditMilestoneForm = ({
  jobInfo,
  handleMilestoneChange,
  handleMilestoneInputChange,
  handleMilestoneNumberChange,
  handlePercentageChange,
  percentage,
  handleBlur,
}: EditMilestoneFormProps) => {
  return (
    <>
      <FormSelect
        label="Milestone"
        id="milestonesNumber"
        name="milestonesNumber"
        value={jobInfo.milestoneNumber}
        onChange={handleMilestoneNumberChange}
        options={milestoneNumber}
      />
      <div className="flex flex-col max-h-[70rem] overflow-y-auto mt-8 hide-scrollbar">
        {jobInfo?.milestones?.map((milestone, index) => (
          <div className="w-full space-y-4" key={index}>
            <h2 className="sm:text-lg font-semibold py-3">
              Milestone {index + 1}
            </h2>
            <div className="space-y-1">
              <Label htmlFor="duration">Milestone duration</Label>
              <div className="w-full grid grid-cols-3 gap-4">
                <div className="col-span-2 w-full">
                  <Input
                    type="text"
                    id="duration"
                    name="number"
                    value={milestone?.timeFrame?.number}
                    onChange={(e) =>
                      handleMilestoneInputChange(
                        index,
                        "timeFrame",
                        "number",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-span-1 w-full">
                  <Select
                    id="durationType"
                    name="period"
                    value={milestone?.timeFrame?.period}
                    onChange={(e) =>
                      handleMilestoneInputChange(
                        index,
                        "timeFrame",
                        "period",
                        e.target.value
                      )
                    }
                    options={durationOptions}
                  />
                </div>
              </div>
              <p className="text-xs text-dark-green">
                Note: 7days equal 1week, 30days equal 1month and 4weeks equal
                1month.
              </p>
            </div>

            <FormTextarea
              label="Details of what's to be achieved"
              id="details"
              placeholder="Describe the details of the milestone"
              rows={4}
              name="achievement"
              value={milestone.achievement}
              onChange={(e) => handleMilestoneChange(index, e)}
            />

            <div className="w-full space-y-1">
              <FormInput
                type="text"
                label="Percentage for Milestone"
                id="percentage"
                name="percentage"
                onBlur={handleBlur}
                value={percentage[index] || 0}
                onChange={(e) => {
                  handlePercentageChange(index, Number(e.target.value));
                }}
              />
              <p className="text-xs text-dark-green">
                Please enter how many percentage from the total amount you're
                paying for this milestone. Note: Total percentage can't exceed
                100.
              </p>
            </div>
            <div className="w-full">
              <Label htmlFor="amount">Amount</Label>
              <UnEditableInput
                title={`${
                  milestone.amount ? numberWithCommas(milestone.amount) : 0
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditMilestoneForm;
