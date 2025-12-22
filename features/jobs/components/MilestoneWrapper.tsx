import MilestoneInfo from "@/components/organisms/MilestoneInfo";

import { Milestone } from "../types";

interface MilestoneWrapperProps {
  milestones: Milestone[];
  currency: string;
}

const MilestoneWrapper = ({ milestones, currency }: MilestoneWrapperProps) => {
  return (
    <div className="col-span-9 max-lg:col-span-12 space-y-2 w-full bg-white rounded-lg py-6">
      <h4 className="px-10 max-sm:px-5 sm:text-lg font-semibold">Milestone</h4>
      {milestones?.map((milestone: Milestone, index: number) => (
        <MilestoneInfo
          key={milestone?._id}
          milestone={milestone}
          currency={currency}
          title={`Milestone ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default MilestoneWrapper;
