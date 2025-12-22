import FormSelect from "@/components/molecules/FormSelect";
import MilestoneForm from "./MilestoneForm";

import { milestoneNumber } from "@/lib/constants";
import { MilestonePer, PostJobType } from "../../types";

interface MilestoneFormWrapperProps {
  createDirectContractJob: PostJobType;
  milestonesData: MilestonePer[];
  updateMilestonesData: (
    value: string | number,
    index: number,
    field: "duration" | "durationType" | "details" | "amount" | "percentage"
  ) => void;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MilestoneFormWrapper = ({
  createDirectContractJob,
  milestonesData,
  handleChange,
  updateMilestonesData,
}: MilestoneFormWrapperProps) => {
  return (
    <>
      <FormSelect
        label="Milestone"
        id="milestonesnumber"
        name="milestonesnumber"
        value={createDirectContractJob.milestonesnumber}
        onChange={handleChange}
        options={milestoneNumber}
      />
      <div className="flex flex-col max-h-[70rem] overflow-y-auto mt-8">
        {milestonesData?.map((milestone, index) => (
          <MilestoneForm
            key={index}
            index={index}
            milestone={milestone}
            updateMilestonesData={updateMilestonesData}
          />
        ))}
      </div>
    </>
  );
};

export default MilestoneFormWrapper;
